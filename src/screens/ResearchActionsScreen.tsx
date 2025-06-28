import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Appbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Research } from "./HomeScreen";
import { FirestoreService } from "../services/FirestoreService";

interface ResearchActionsScreenProps {
  navigation: any;
  route: {
    params: Research;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#372775",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  actionText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  actionsContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButton: {
    width: "30%",
    padding: 8,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#2B1D62",
  },
});

const ResearchActionsScreen: React.FC<ResearchActionsScreenProps> = ({
  navigation,
  route,
}) => {
  const [research, setResearch] = useState<Research>(route.params);

  const handleModify = () => {
    navigation.navigate("ModifyResearch", { research, onSaved: setResearch });
  };

  const handleCollect = () => {
    navigation.navigate("SatisfactionCollection", {
      research,
      onReceivedVotes: async () => {
        const updatedResearch = await new FirestoreService().getResearch(
          research.id
        );
        setResearch(updatedResearch);
      },
    });
  };

  const handleReport = () => {
    navigation.navigate("ResearchReport", { research });
  };

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#2B1D62" }}>
        <Appbar.BackAction
          iconColor="#573FBA"
          isLeading={false}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content color="white" title={research.title} />
      </Appbar.Header>

      <View style={styles.content}>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleModify}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="file-document-edit"
                size={36}
                color="white"
              />
            </View>
            <Text style={styles.actionText}>Modificar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleCollect}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="checkbox-marked"
                size={36}
                color="white"
              />
            </View>
            <Text style={styles.actionText}>Coletar dados</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleReport}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="chart-donut"
                size={36}
                color="white"
              />
            </View>
            <Text style={styles.actionText}>Relatório</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ResearchActionsScreen;
