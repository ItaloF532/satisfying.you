import React from "react";
import { Card, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconName } from "../const/AvailableIcons";

interface ResearchCardComponentProps {
  title: string;
  image: string;
  description: string;
}

const styles = StyleSheet.create({
  title: {
    color: "#3F92C5",
    fontSize: 32,
  },
  description: {
    color: "#3F92C5",
    fontSize: 16,
  },
  content: {
    padding: 10,
    height: 190,
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  card: {
    height: 340,
    maxWidth: 340,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  image: {
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

const ResearchCardComponent: React.FC<ResearchCardComponentProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.image}>
        <MaterialCommunityIcons
          name={image as IconName}
          size={100}
          color="#3F92C5"
        />
      </View>
      <Card.Content style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </Card.Content>
    </Card>
  );
};

export default ResearchCardComponent;
