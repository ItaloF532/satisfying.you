import React from "react";
import { Card, Text } from "react-native-paper";
import { Image, StyleSheet, ImageSourcePropType } from "react-native";

interface ResearchCardComponentProps {
  title: string;
  description: string;
  image: ImageSourcePropType;
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
      <Image source={image} style={styles.image} />
      <Card.Content style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </Card.Content>
    </Card>
  );
};

export default ResearchCardComponent;
