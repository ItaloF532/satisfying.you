import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Divider, Icon } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

// Screens
import LoginScreen from "../screens/LoginScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import NewResearchScreen from "../screens/NewResearchScreen";
import ModifyResearchScreen from "../screens/ModifyResearchScreen";
import ResearchActionsScreen from "../screens/ResearchActionsScreen";
import SatisfactionCollectionScreen from "../screens/SatisfactionCollectionScreen";
import ThankYouScreen from "../screens/ThankYouScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userSection: {
    marginBottom: 33,
    backgroundColor: "#372775",
    paddingHorizontal: 16,
  },
  emailText: {
    color: "white",
    fontSize: 16,
    marginTop: 4,
  },
  logoutSection: {
    top: Dimensions.get("window").height * 0.75,
    bottom: 0,
    marginBottom: 33,
    paddingHorizontal: 16,
  },
});

const CustomDrawerContent = (props: any) => {
  const userEmail = "email@example.com";

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userSection}>
        <Text style={styles.emailText}>{userEmail}</Text>
        <Divider
          style={{ height: 1, marginTop: 33, backgroundColor: "white" }}
        />
      </View>
      <DrawerItemList {...props} />
      <View style={styles.logoutSection}>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <MaterialIcons
            name="logout"
            size={20}
            style={{ marginRight: 10 }}
            color="white"
          />

          <Text
            style={styles.emailText}
            onPress={() =>
              props.navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            }
          >
            Sair
          </Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeDrawer"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTintColor: "white",
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "#e0e0e0",
      }}
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={HomeScreen}
        options={{
          title: "Pesquisas",
          drawerLabel: "Pesquisas",
          headerStyle: {
            backgroundColor: "#2B1D62",
          },
          drawerStyle: {
            backgroundColor: "#372775",
          },
        }}
      />
    </Drawer.Navigator>
  );
};

// TODO: ajustar rotas
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeDrawer} />
          <Stack.Screen name="NewResearch" component={NewResearchScreen} />
          <Stack.Screen
            name="ModifyResearch"
            component={ModifyResearchScreen}
          />
          <Stack.Screen
            name="ResearchActions"
            component={ResearchActionsScreen}
          />
          <Stack.Screen
            name="SatisfactionCollection"
            component={SatisfactionCollectionScreen}
          />
          <Stack.Screen name="ThankYou" component={ThankYouScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
