import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { Button, Text } from "react-native-paper";
import ResearchCardComponent from "../components/ResearchCardComponent";
import { placeholderImages } from "../utils/placeholderImages";

interface HomeScreenProps {
  navigation: any;
}

const mockResearches = [
  {
    id: "1",
    title: "Pesquisa de Satisfação - Atendimento",
    description: "Avaliação do atendimento ao cliente",
    image: placeholderImages.research1,
  },
  {
    id: "2",
    title: "Pesquisa de Satisfação - Produto",
    description: "Avaliação da qualidade do produto",
    image: placeholderImages.research2,
  },
  {
    id: "3",
    title: "Pesquisa de Satisfação - Entrega",
    description: "Avaliação do serviço de entrega",
    image: placeholderImages.research3,
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

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleResearchPress = (id: string) => {
    navigation.navigate("ResearchActions", { researchId: id });
  };

  const handleNewResearch = () => {
    navigation.navigate("NewResearch");
  };

  useEffect(() => {
    const backAction = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
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
            <TouchableOpacity onPress={() => handleResearchPress(item.id)}>
              <ResearchCardComponent
                title={item.title}
                description={item.description}
                image={item.image}
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
