import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Appbar, Text, TextInput, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FirestoreService } from "../services/FirestoreService";
import PickImageComponent from "../components/PickImageComponent";
import { Research } from "./HomeScreen";

interface ModifyResearchScreenProps {
  navigation: any;
  route: {
    params: { research: Research; onSaved: (research: Research) => void };
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#372775",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formContainer: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    marginBottom: 16,
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
    marginTop: -10,
    marginBottom: 10,
  },
  dateButton: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateButtonText: {
    fontSize: 16,
    color: "#3F92C5",
  },
  iosDatePickerContainer: {
    backgroundColor: "white",
    borderRadius: 4,
    marginBottom: 16,
    padding: 8,
  },
  iosDatePickerButton: {
    marginTop: 8,
  },
  iconSelector: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
    alignItems: "center",
  },
  iconSelectorText: {
    fontSize: 16,
    color: "#3F92C5",
    marginLeft: 12,
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#2B1D62",
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  iconItem: {
    width: "25%",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedIconItem: {
    backgroundColor: "#573FBA",
    borderRadius: 4,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#37BD6D",
    borderRadius: 0,
    marginBottom: 12,
  },
});

const ModifyResearchScreen: React.FC<ModifyResearchScreenProps> = ({
  navigation,
  route,
}) => {
  const [research, setResearch] = useState(route.params.research);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }

    if (selectedDate) {
      setSelectedDate(selectedDate);
    }

    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
  };

  const handleSave = async () => {
    if (!research.title.trim()) {
      setNameError("O nome da pesquisa é obrigatório");
      return;
    }

    setLoading(true);
    try {
      await new FirestoreService().update(research.id, {
        title: research.title,
        date: selectedDate.toISOString(),
        image: research.image,
      });
      route.params.onSaved(research);
      navigation.goBack();
    } catch (error) {
      console.error("Failed to update research:", error);
      // Here you could show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Excluir Pesquisa",
      "Tem certeza que deseja excluir esta pesquisa? Esta ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            setDeleting(true);
            try {
              await new FirestoreService().delete(research.id);
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              });
            } catch (error) {
              console.error("Failed to delete research:", error);
              // You might want to show an alert to the user here
            } finally {
              setDeleting(false);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderDatePicker = () => {
    if (!showDatePicker) return null;

    return (
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display={Platform.OS === "ios" ? "spinner" : "default"}
        onChange={onChangeDate}
        style={{ width: Platform.OS === "ios" ? "100%" : undefined }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#2B1D62" }}>
        <Appbar.BackAction
          iconColor="#573FBA"
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content color="white" title="Modificar Pesquisa" />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome da Pesquisa</Text>
          <TextInput
            value={research.title}
            mode="outlined"
            textColor="#3F92C5"
            onChangeText={(text) => {
              setResearch({ ...research, title: text });
              if (text.trim()) setNameError("");
            }}
            error={!!nameError}
            style={styles.input}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

          <Text style={styles.label}>Data da Pesquisa</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {selectedDate.toLocaleDateString("pt-BR")}
            </Text>
            <MaterialCommunityIcons name="calendar" size={24} color="#3F92C5" />
          </TouchableOpacity>

          {Platform.OS === "ios" ? (
            <View
              style={
                showDatePicker
                  ? styles.iosDatePickerContainer
                  : { display: "none" }
              }
            >
              {renderDatePicker()}
              {showDatePicker && (
                <Button
                  onPress={() => setShowDatePicker(false)}
                  style={styles.iosDatePickerButton}
                >
                  Confirmar
                </Button>
              )}
            </View>
          ) : (
            renderDatePicker()
          )}

          <Text style={styles.label}>Imagem</Text>
          <PickImageComponent
            initialImage={research.image}
            onImagePick={(image) =>
              setResearch({ ...research, image: image ?? "" })
            }
          />

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSave}
              style={[styles.saveButton, { flex: 1 }]}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                "Salvar Alterações"
              )}
            </Button>

            <TouchableOpacity
              onPress={handleDelete}
              style={{
                bottom: 4,
                marginLeft: 8,
                alignItems: "center",
                flexDirection: "column",
              }}
              disabled={deleting}
            >
              {deleting ? (
                <ActivityIndicator />
              ) : (
                <>
                  <MaterialCommunityIcons
                    name="trash-can"
                    size={28}
                    color="white"
                  />
                  <Text style={{ color: "white", fontSize: 12 }}>Apagar</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ModifyResearchScreen;
