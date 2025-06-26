import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Divider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { useAuth } from "../contexts/AuthContext";

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
import ResearchReportScreen from "../screens/ResearchReportScreen";
import { RootStackParamList } from "./types";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<RootStackParamList>();

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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const CustomDrawerContent = (props: any) => {
  const { user, signOut } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userSection}>
        <Text style={styles.emailText}>{user?.email}</Text>
        <Divider
          style={{ height: 1, marginTop: 33, backgroundColor: "white" }}
        />
      </View>
      <DrawerItemList {...props} />
      <View style={styles.logoutSection}>
        <TouchableOpacity onPress={signOut}>
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
            <Text style={styles.emailText}>Sair</Text>
          </View>
        </TouchableOpacity>
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

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeDrawer} />
    <Stack.Screen name="NewResearch" component={NewResearchScreen} />
    <Stack.Screen
      name="ModifyResearch"
      component={ModifyResearchScreen as any}
    />
    <Stack.Screen
      name="ResearchActions"
      component={ResearchActionsScreen as any}
    />
    <Stack.Screen
      name="SatisfactionCollection"
      component={SatisfactionCollectionScreen as any}
    />
    <Stack.Screen
      name="ResearchReport"
      component={ResearchReportScreen as any}
    />
    <Stack.Screen name="ThankYou" component={ThankYouScreen as any} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
