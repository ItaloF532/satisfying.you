import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

interface LoginScreenProps {
  navigation: any;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "white",
    padding: 20,
    height: "100%",
    alignItems: "center",
    backgroundColor: "#372775",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    color: "white",
    fontSize: 32,
    marginBottom: 30,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },
  formContainer: {
    flex: 4,
    width: "100%",
    maxWidth: 400,
    justifyContent: "center",
  },
  input: {
    width: "100%",
    color: "#3F92C5",
    marginBottom: 12,
    borderRadius: 0,
  },
  linkContainer: {
    flex: 1,
    width: "100%",
    alignSelf: "flex-end",
    flexDirection: "column",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    marginBottom: 5,
  },
});

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      setError("E-mail e/ou senha inválidos.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // navigation is handled by AuthContext
    } catch (err: any) {
      console.error(err);
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-email" ||
        err.code === "auth/invalid-credential"
      ) {
        setError("E-mail e/ou senha inválidos.");
      } else {
        setError("Ocorreu um erro. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { marginRight: 48 }]}>
            Satisfying.you
          </Text>
          <FontAwesome5 name="smile" size={32} color="white" />
        </View>

        <View>
          <Text style={{ fontSize: 16, color: "white" }}>E-mail</Text>
          <TextInput
            value={email}
            mode="outlined"
            textColor="#3F92C5"
            onChangeText={setEmail}
            error={!!error}
            style={styles.input}
          />
        </View>

        <View>
          <Text style={{ fontSize: 16, color: "white" }}>Senha</Text>
          <TextInput
            value={password}
            mode="outlined"
            error={!!error}
            textColor="#3F92C5"
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Button
          mode="contained"
          onPress={handleLogin}
          style={{
            marginTop: 10,
            marginBottom: 20,
            borderRadius: 0,
            backgroundColor: "#37BD6D",
          }}
        >
          Entrar
        </Button>
      </View>

      <View style={styles.linkContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("CreateAccount")}
          style={{
            borderRadius: 0,
            backgroundColor: "#419ED7",
          }}
        >
          Criar conta
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("ForgotPassword")}
          style={{
            marginTop: 18,
            borderRadius: 0,
            backgroundColor: "#B0CCDE",
          }}
        >
          Esqueci minha senha
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;
