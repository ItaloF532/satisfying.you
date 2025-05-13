import { Text } from "react-native-paper";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";

interface ThankYouScreenProps {
  navigation: any;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#372775",
  },
  text: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
});

const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Obrigado por participar da pesquisa!</Text>
      <Text style={styles.text}>Aguardamos você no próximo ano!</Text>
    </View>
  );
};

export default ThankYouScreen;
