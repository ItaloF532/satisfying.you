import React, { useState } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { TextInput, Button, Text, Appbar, Snackbar } from "react-native-paper";
import { validateEmail } from "../utils/validation";
import { placeholderImages } from "../utils/placeholderImages";

interface ForgotPasswordScreenProps {
  navigation: any;
}

const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%",
    flexGrow: 1,
    justifyContent: "center",
  },
  input: {
    marginBottom: 15,
    width: "100%",
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
  successText: {
    color: "green",
    marginBottom: 15,
    textAlign: "center",
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
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#372775",
  },
});

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleRecoverPassword = () => {
    if (!validateEmail(email)) {
      setEmailError("E-mail inválido");
      return;
    }

    setEmailError("");
    setSubmitted(true);
    setSnackbarVisible(true);

    setTimeout(() => {
      navigation.navigate("Login");
    }, 2000);
  };

  const onDismissSnackbar = () => setSnackbarVisible(false);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Appbar.Header style={{ backgroundColor: "#2B1D62" }}>
        <Appbar.BackAction
          iconColor="#573FBA"
          isLeading={false}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content color="white" title="Recuperação de senha" />
      </Appbar.Header>

      <View style={styles.container}>
        <Text style={{ fontSize: 16, color: "white" }}>E-mail</Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          error={!!emailError}
          textColor="#3F92C5"
          style={styles.input}
          disabled={submitted}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {submitted ? (
          <Text style={styles.successText}>
            Email de recuperação enviado com sucesso!
          </Text>
        ) : null}

        <Button
          mode="contained"
          onPress={handleRecoverPassword}
          style={styles.button}
          loading={submitted}
          disabled={submitted}
        >
          RECUPERAR
        </Button>
      </View>

      <Snackbar
        visible={snackbarVisible}
        duration={2000}
        onDismiss={onDismissSnackbar}
        style={{ backgroundColor: "#37BD6D" }}
      >
        <Text
          style={{
            flex: 1,
            color: "white",
            textAlign: "center",
            alignSelf: "center",
          }}
        >
          Email de recuperação enviado com sucesso!
        </Text>
      </Snackbar>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
