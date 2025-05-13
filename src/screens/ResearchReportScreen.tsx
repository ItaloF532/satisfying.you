import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Appbar, Text, Button, Card } from "react-native-paper";
import { PieChart } from "react-native-chart-kit";
import { NavigationProp } from "@react-navigation/native";

interface ResearchReportScreenProps {
  navigation: NavigationProp<any>;
  route: {
    params: {
      id: string;
      title: string;
      image: string;
    };
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#372775",
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

const ResearchReportScreen: React.FC<ResearchReportScreenProps> = ({
  navigation,
  route,
}) => {
  const { id, title } = route.params;

  const mockData = {
    ratings: [
      { value: 1, count: 5, color: "#FF5252" },
      { value: 2, count: 8, color: "#FF9800" },
      { value: 3, count: 12, color: "#FFC107" },
      { value: 4, count: 25, color: "#4CAF50" },
      { value: 5, count: 18, color: "#2196F3" },
    ],
  };

  const chartData = mockData.ratings.map((item) => {
    let name = "- ";

    switch (item.value) {
      case 1:
        name += "Péssimo";
        break;
      case 2:
        name += "Ruim";
        break;
      case 3:
        name += "Neutro";
        break;
      case 4:
        name += "Bom";
        break;
      case 5:
      default:
        name += "Excelente";
        break;
    }

    return {
      name,
      population: item.count,
      color: item.color,
      legendFontColor: "#FFFFFF",
      legendFontSize: 16,
    };
  });

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#2B1D62" }}>
        <Appbar.BackAction
          iconColor="#573FBA"
          isLeading={false}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content color="white" title="Relatório" />
      </Appbar.Header>

      <View style={styles.content}>
        <PieChart
          data={chartData}
          width={Dimensions.get("window").width - 40}
          height={220}
          absolute
          accessor="population"
          paddingLeft="0"
          backgroundColor="transparent"
          chartConfig={{
            backgroundColor: "#373775",
            backgroundGradientFrom: "#373775",
            backgroundGradientTo: "#373775",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default ResearchReportScreen;
