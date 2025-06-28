import React from "react";
import { Card, Text } from "react-native-paper";
import { StyleSheet, View, Image } from "react-native";
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
    bottom: 0,
    height: 150,
    padding: 8,
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  card: {
    width: 300,
    height: 300,
    maxWidth: 300,
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
  const isBase64 = image?.startsWith("data:image");

  return (
    <Card style={styles.card}>
      <View style={styles.image}>
        {isBase64 ? (
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <></>
        )}
      </View>
      <Card.Content style={styles.content}>
        <Text style={styles.title}>{title}</Text>
      </Card.Content>
    </Card>
  );
};

export default ResearchCardComponent;
