import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  NewResearch: undefined;
  ModifyResearch: { researchId: string };
  ResearchActions: { researchId: string };
  SatisfactionCollection: { researchId: string };
  ThankYou: undefined;
};

export type NavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

export type RouteProps<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
