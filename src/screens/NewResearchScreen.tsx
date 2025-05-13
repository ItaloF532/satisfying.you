import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Appbar, Text, TextInput, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AVAILABLE_ICONS, IconName } from "../const/AvailableIcons";

interface NewResearchScreenProps {
  navigation: any;
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
  saveButton: {
    backgroundColor: "#37BD6D",
    borderRadius: 0,
    marginTop: 20,
    marginBottom: 12,
  },
});

const NewResearchScreen: React.FC<NewResearchScreenProps> = ({
  navigation,
}) => {
  const [researchName, setResearchName] = useState("");

  const [selectedIcon, setSelectedIcon] = useState<IconName>("emoticon");
  const [showIconPicker, setShowIconPicker] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [nameError, setNameError] = useState("");

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }

    if (selectedDate) setSelectedDate(selectedDate);
    if (Platform.OS === "android") setShowDatePicker(false);
  };

  const handleSave = () => {
    if (!researchName.trim()) {
      setNameError("O nome da pesquisa é obrigatório");
      return;
    }

    navigation.goBack();
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
        <Appbar.Content color="white" title="Nova Pesquisa" />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome da Pesquisa</Text>
          <TextInput
            value={researchName}
            mode="outlined"
            textColor="#3F92C5"
            onChangeText={(text) => {
              setResearchName(text);
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

          <Text style={styles.label}>Ícone da Pesquisa</Text>
          <TouchableOpacity
            style={styles.iconSelector}
            onPress={() => setShowIconPicker(!showIconPicker)}
          >
            <MaterialCommunityIcons
              name={selectedIcon}
              size={36}
              color="#3F92C5"
            />
            <Text style={styles.iconSelectorText}>Selecionar ícone</Text>
          </TouchableOpacity>

          {showIconPicker && (
            <View style={styles.iconGrid}>
              {AVAILABLE_ICONS.sort(() => 0.5 - Math.random())
                .slice(0, 8)
                .map((icon) => (
                  <TouchableOpacity
                    key={icon}
                    style={[
                      styles.iconItem,
                      selectedIcon === icon && styles.selectedIconItem,
                    ]}
                    onPress={() => {
                      setSelectedIcon(icon);
                      setShowIconPicker(false);
                    }}
                  >
                    <MaterialCommunityIcons
                      name={icon}
                      size={36}
                      color="#3F92C5"
                    />
                  </TouchableOpacity>
                ))}
            </View>
          )}

          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.saveButton}
          >
            Criar Pesquisa
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewResearchScreen;
