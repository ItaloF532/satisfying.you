import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { Button, Text } from "react-native-paper";
import ResearchCardComponent from "../components/ResearchCardComponent";
import { AVAILABLE_ICONS } from "../const/AvailableIcons";
import { useAuth } from "../contexts/AuthContext";
import { FirestoreService } from "../services/FirestoreService";

interface HomeScreenProps {
  navigation: NavigationProp<any>;
  route: any;
}

export type Research = {
  id: string;
  date: string;
  title: string;
  votes: number[];
  userId: string;
  image: string;
  description: string;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#372775",
  },
  listContainer: {
    paddingVertical: 10,
  },
  buttonContainer: {
    padding: 16,
    alignItems: "center",
  },
  emptyText: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
  },
  newButton: {
    width: "100%",
    borderRadius: 0,
    marginBottom: 10,
    backgroundColor: "#37BD6D",
  },
  emptyContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#372775",
  },
});

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [researches, setResearches] = useState<Research[]>([]);

  const fetchResearches = async () => {
    try {
      console.log("fetchResearches");
      setLoading(true);
      const fetchedResearches = await new FirestoreService().search(
        user?.uid ?? ""
      );
      setResearches(fetchedResearches);
    } catch (error) {
      console.error("Failed to fetch researches:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResearchPress = (research: Research) => {
    navigation.navigate("ResearchActions", research);
  };

  const handleNewResearch = () => {
    navigation.navigate("NewResearch");
  };

  useEffect(() => {
    fetchResearches();

    const backAction = () => {
      const parentNavigation = navigation.getParent();

      if (parentNavigation) {
        const parentState = parentNavigation.getState();
        const currentRouteName = parentState.routes[parentState.index].name;

        if (currentRouteName === "Home") {
          signOut();
          return true;
        }
      }
      navigation.goBack();
      return true;
    };

    navigation.addListener("focus", () => {
      fetchResearches();
    });

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {researches.length > 0 ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={true}
          data={researches}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }: { item: Research }) => (
            <ResearchCardComponent
              research={item}
              onTouch={handleResearchPress}
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Você ainda não possui pesquisas cadastradas.
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.newButton}
          onPress={handleNewResearch}
        >
          NOVA PESQUISA
        </Button>
      </View>
    </View>
  );
};

export default HomeScreen;
