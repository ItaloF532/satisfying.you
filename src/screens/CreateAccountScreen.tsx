import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Text, Appbar } from "react-native-paper";
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from "../utils/validation";

interface CreateAccountScreenProps {
  navigation: any;
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  input: {
    marginBottom: 15,
    width: "100%",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    top: 100,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 0,
    backgroundColor: "#37BD6D",
  },
  container: {
    flex: 1,
    color: "white",
    width: "100%",
    height: "100%",
    display: "flex",
    padding: 20,
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#372775",
  },
});

const CreateAccountScreen: React.FC<CreateAccountScreenProps> = ({
  navigation,
}) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCreateAccount = () => {
    let hasError = false;

    if (!validateEmail(email)) {
      setEmailError("E-mail inválido");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!validatePasswordMatch(password, confirmPassword)) {
      setPasswordError("As senhas não coincidem");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "As senha deve conter ao menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
      );
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!hasError) navigation.navigate("Login");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Appbar.Header style={{ backgroundColor: "#2B1D62" }}>
        <Appbar.BackAction
          iconColor="#573FBA"
          isLeading={false}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content color="white" title="Nova conta" />
      </Appbar.Header>

      <View style={styles.container}>
        <View>
          <Text style={{ fontSize: 16, color: "white" }}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            textColor="#3F92C5"
            mode="outlined"
            error={!!emailError}
            style={styles.input}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>

        <View>
          <Text style={{ fontSize: 16, color: "white" }}>Senha</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textColor="#3F92C5"
            mode="outlined"
            style={styles.input}
          />
        </View>

        <View>
          <Text style={{ fontSize: 16, color: "white" }}>Confirmar Senha</Text>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            mode="outlined"
            textColor="#3F92C5"
            error={!!passwordError}
            style={styles.input}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        <Button
          mode="contained"
          style={styles.button}
          onPress={handleCreateAccount}
        >
          CADASTRAR
        </Button>
      </View>
    </ScrollView>
  );
};

export default CreateAccountScreen;
