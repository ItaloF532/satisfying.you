import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  NewResearch: undefined;
  ModifyResearch: {
    id: string;
    title: string;
    image: string;
    description: string;
  };
  ResearchActions: {
    id: string;
    title: string;
    image: string;
    description: string;
  };
  SatisfactionCollection: {
    id: string;
    title: string;
    image: string;
    description: string;
  };
  ThankYou: { id: string; title: string; image: string };
  ResearchReport: {
    id: string;
    title: string;
    data: Array<{ value: number; count: number }>;
  };
};

export type NavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

export type RouteProps<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
