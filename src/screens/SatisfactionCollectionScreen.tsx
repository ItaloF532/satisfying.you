import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Appbar, Text, Button } from "react-native-paper";
import SatisfactionRatingComponent, {
  RATING_OPTIONS,
} from "../components/SatisfactionRatingComponent";
import { FirestoreService } from "../services/FirestoreService";

interface SatisfactionCollectionScreenProps {
  navigation: any;
  route: {
    params: {
      id: string;
      title: string;
      image: string;
    };
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#372775",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  ratingContainer: {
    width: "100%",
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  button: {
    width: "80%",
    marginTop: 20,
  },
});

const SatisfactionCollectionScreen: React.FC<
  SatisfactionCollectionScreenProps
> = ({ navigation, route }) => {
  const { id, title, image } = route.params;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (ratingIndex: number) => {
    setLoading(true);
    try {
      const vote = RATING_OPTIONS[ratingIndex].label;
      await new FirestoreService().addVote(id, vote);
      navigation.navigate("ThankYou");
    } catch (error) {
      console.error("Failed to submit vote:", error);
      // Optionally, show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#2B1D62" }}>
        <Appbar.BackAction
          iconColor="#573FBA"
          isLeading={false}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content color="white" title="Coleta de Satisfação" />
      </Appbar.Header>

      <View style={styles.content}>
        <Text style={styles.title}>O que você achou do {title}?</Text>

        <View style={styles.ratingContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <SatisfactionRatingComponent
              onRatingSelected={(rating) => handleSubmit(rating)}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default SatisfactionCollectionScreen;
