import React from "react";
import { View, StyleSheet, Dimensions, ScrollView, Text } from "react-native";
import { Appbar, Card } from "react-native-paper";
import { PieChart } from "react-native-chart-kit";
import { NavigationProp } from "@react-navigation/native";
import { RATING_OPTIONS } from "../components/SatisfactionRatingComponent";
import { Research } from "./HomeScreen";

interface ResearchReportScreenProps {
  navigation: NavigationProp<any>;
  route: {
    params: { research: Research };
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
  const researchData = route.params.research;

  const processChartData = () => {
    if (!researchData?.votes || researchData.votes.length === 0) {
      return [];
    }

    const voteCounts = researchData.votes.reduce((acc: any, vote: number) => {
      const option = RATING_OPTIONS.find((option) => option.value === vote);
      if (option) acc[option.label] = (acc[option.label] || 0) + 1;

      return acc;
    }, {});

    return RATING_OPTIONS.map((option) => ({
      name: option.label,
      population: voteCounts[option.label] || 0,
      color: option.color,
      legendFontColor: "#FFFFFF",
      legendFontSize: 16,
    })).filter((item) => item.population > 0);
  };

  const chartData = processChartData();

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#2B1D62" }}>
        <Appbar.BackAction
          iconColor="#573FBA"
          isLeading={false}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content color="white" title={researchData.title} />
      </Appbar.Header>

      <View style={styles.content}>
        {chartData.length > 0 ? (
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
        ) : (
          <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
            Ainda não há votos para esta pesquisa.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ResearchReportScreen;
