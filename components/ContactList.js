import React, { useState } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Contact from './Contact';

const ContactList = ({ contacts, onAddContact }) => {
  const [newContact, setNewContact] = useState({ name: '', lastName: '', phone: '' });

  const handleAddContact = () => {
    if (newContact.name && newContact.lastName && newContact.phone) {
      onAddContact({
        ...newContact,
        id: Date.now().toString(),
        favorite: false
      });
      setNewContact({ name: '', lastName: '', phone: '' });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newContact.name}
          onChangeText={(text) => setNewContact({...newContact, name: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={newContact.lastName}
          onChangeText={(text) => setNewContact({...newContact, lastName: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={newContact.phone}
          onChangeText={(text) => setNewContact({...newContact, phone: text})}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
          <Text style={styles.addButtonText}>Add Contact</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Contact contact={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ContactList; 