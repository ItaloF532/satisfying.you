import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { Button, Text } from "react-native-paper";
import ResearchCardComponent from "../components/ResearchCardComponent";
import { placeholderImages } from "../utils/placeholderImages";

interface HomeScreenProps {
  navigation: NavigationProp<any>;
  route: any;
}

export type Research = {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string;
};

const mockResearches: Research[] = [
  {
    id: "1",
    title: "Pesquisa de Satisfação - Atendimento",
    date: "2024-01-01",
    description: "Avaliação do atendimento ao cliente",
    image: placeholderImages.research1.uri,
  },
  {
    id: "2",
    title: "Pesquisa de Satisfação - Produto",
    date: "2024-01-01",
    description: "Avaliação da qualidade do produto",
    image: placeholderImages.research2.uri,
  },
  {
    id: "3",
    title: "Pesquisa de Satisfação - Entrega",
    date: "2024-01-01",
    description: "Avaliação do serviço de entrega",
    image: placeholderImages.research3.uri,
  },
];

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
  const handleResearchPress = (research: Research) => {
    navigation.navigate("ResearchActions", research);
  };

  const handleNewResearch = () => {
    navigation.navigate("NewResearch");
  };

  useEffect(() => {
    navigation.addListener("state", (state) => {
      console.log("state", state);
    });

    const backAction = () => {
      const parentNavigation = navigation.getParent();

      if (parentNavigation) {
        const parentState = parentNavigation.getState();
        const currentRouteName = parentState.routes[parentState.index].name;

        if (currentRouteName === "Home") {
          parentNavigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
          return true;
        }
      }
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {mockResearches.length > 0 ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={true}
          data={mockResearches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleResearchPress(item)}>
              <ResearchCardComponent
                title={item.title}
                description={item.description}
                image={{ uri: item.image }}
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
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
