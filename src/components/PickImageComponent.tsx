import React, { useState } from "react";
import { View, Button, Image, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { IconButton, useTheme } from "react-native-paper";

interface PickImageComponentProps {
  onImagePick: (base64: string | null) => void;
  initialImage?: string | null;
}

const PickImageComponent: React.FC<PickImageComponentProps> = ({
  onImagePick,
  initialImage,
}) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const theme = useTheme();

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Você precisa conceder permissão à câmera para tirar fotos."
      );
      return false;
    }
    return true;
  };

  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Você precisa conceder permissão à galeria para escolher fotos."
      );
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets[0].base64) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setImage(base64Image);
      onImagePick(base64Image);
    }
  };

  const pickImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets[0].base64) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setImage(base64Image);
      onImagePick(base64Image);
    }
  };

  const removeImage = () => {
    setImage(null);
    onImagePick(null);
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <View style={styles.buttonsContainer}>
          <Button title="Tirar Foto" onPress={takePhoto} />
          <Button title="Escolher da Galeria" onPress={pickImage} />
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <IconButton
            icon="close-circle"
            size={30}
            onPress={removeImage}
            style={[
              styles.removeButton,
              { backgroundColor: theme.colors.surface },
            ]}
            iconColor={theme.colors.error}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  removeButton: {
    position: "absolute",
    top: -15,
    right: -15,
  },
});

export default PickImageComponent;
