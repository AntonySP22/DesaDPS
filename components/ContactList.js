import React, { useState } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text, StyleSheet, Modal, Alert } from 'react-native';
import Contact from './Contact';

const ContactList = ({ contacts, onAddContact }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', lastName: '', phone: '' });

  const handleAddContact = () => {
    // Validación de campos
    if (!newContact.name.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }
    if (!newContact.lastName.trim()) {
      Alert.alert('Error', 'El apellido es obligatorio');
      return;
    }
    if (!newContact.phone.trim()) {
      Alert.alert('Error', 'El teléfono es obligatorio');
      return;
    }

    // Si pasa las validaciones
    onAddContact({
      ...newContact,
      id: Date.now().toString(),
      favorite: false
    });
    setNewContact({ name: '', lastName: '', phone: '' });
    setModalVisible(false);
    Alert.alert('Éxito', 'Contacto agregado correctamente');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Contact contact={item} />}
      />
      
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar Nuevo Contacto</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={newContact.name}
              onChangeText={(text) => setNewContact({...newContact, name: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              value={newContact.lastName}
              onChangeText={(text) => setNewContact({...newContact, lastName: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              value={newContact.phone}
              onChangeText={(text) => setNewContact({...newContact, phone: text})}
              keyboardType="phone-pad"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.addButton]} 
                onPress={handleAddContact}
              >
                <Text style={styles.buttonText}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  addButton: {
    backgroundColor: '#007AFF',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ContactList;