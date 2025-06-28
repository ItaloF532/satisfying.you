import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface SatisfactionRatingComponentProps {
  title?: string;
  onRatingSelected: (rating: number) => void;
}

type IconName =
  | "emoticon-cry-outline"
  | "emoticon-sad-outline"
  | "emoticon-neutral-outline"
  | "emoticon-happy-outline"
  | "emoticon-excited-outline";

export const RATING_OPTIONS = [
  {
    value: 1,
    label: "Péssimo",
    icon: "emoticon-cry-outline" as IconName,
    color: "#E63946",
  },
  {
    value: 2,
    label: "Ruim",
    icon: "emoticon-sad-outline" as IconName,
    color: "#F94144",
  },
  {
    value: 3,
    label: "Neutro",
    icon: "emoticon-neutral-outline" as IconName,
    color: "#FFB703",
  },
  {
    value: 4,
    label: "Bom",
    icon: "emoticon-happy-outline" as IconName,
    color: "#2A9D8F",
  },
  {
    value: 5,
    label: "Excelente",
    icon: "emoticon-excited-outline" as IconName,
    color: "#2A9D8F",
  },
];

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#372775",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  ratingOption: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedOption: {
    borderColor: "#3F92C5",
    backgroundColor: "rgba(63, 146, 197, 0.1)",
  },
  ratingLabel: {
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
  },
});

const SatisfactionRatingComponent: React.FC<
  SatisfactionRatingComponentProps
> = ({ title = "O que você achou?", onRatingSelected }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedRating(index);
    onRatingSelected(index + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        {RATING_OPTIONS.map((rating, index) => (
          <TouchableOpacity
            key={rating.value}
            style={[
              styles.ratingOption,
              selectedRating === index && styles.selectedOption,
            ]}
            onPress={() => handleSelect(index)}
          >
            <MaterialCommunityIcons
              name={rating.icon}
              size={40}
              color={rating.color}
            />
            <Text style={[styles.ratingLabel, { color: "white" }]}>
              {rating.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SatisfactionRatingComponent;
