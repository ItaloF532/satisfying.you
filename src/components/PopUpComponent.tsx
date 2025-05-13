import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Portal, Text, Button } from 'react-native-paper';

interface PopUpComponentProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  visible: boolean;
}

const PopUpComponent: React.FC<PopUpComponentProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  visible
}) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onCancel} contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.buttonContainer}>
            <Button mode="outlined" onPress={onCancel} style={styles.button}>
              Cancelar
            </Button>
            <Button mode="contained" onPress={onConfirm} style={styles.button}>
              Confirmar
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    marginHorizontal: 5,
  },
});

export default PopUpComponent; 