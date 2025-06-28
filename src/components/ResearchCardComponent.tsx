import React from "react";
import { Card, Text } from "react-native-paper";
import { Research } from "../screens/HomeScreen";
import { StyleSheet, View, Image } from "react-native";

interface ResearchCardComponentProps {
  onTouch?: (research: Research) => void;
  research: Research;
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
  research,
  onTouch,
}) => {
  const isBase64 = research.image?.startsWith("data:image");

  return (
    <Card
      style={styles.card}
      onPress={onTouch ? () => onTouch(research) : undefined}
    >
      <View style={styles.image}>
        {isBase64 ? (
          <Image
            source={{ uri: research.image }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <></>
        )}
      </View>
      <Card.Content style={styles.content}>
        <Text style={styles.title}>{research.title}</Text>
      </Card.Content>
    </Card>
  );
};

export default ResearchCardComponent;
