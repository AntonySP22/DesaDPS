import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import contactsData from './components/contacts.json';
import ContactList from './components/ContactList';

const validateContact = (contact) => {
  return contact && 
         typeof contact.name === 'string' && 
         contact.name.trim().length > 0;
};

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    try {
      const validContacts = contactsData.contacts.filter(validateContact);
      setContacts(validContacts);
    } catch (error) {
      Alert.alert('Error', 'Failed to load contacts');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAddContact = (newContact) => {
    try {
      if (!validateContact(newContact)) {
        Alert.alert('Error', 'Invalid contact data');
        return;
      }

      const maxId = contacts.length > 0 
        ? Math.max(...contacts.map(contact => parseInt(contact.id) || 0))
        : 0;
        
      const contactWithId = {
        ...newContact,
        id: maxId + 1,
        favorite: newContact.favorite || false
      };

      setContacts(prevContacts => [...prevContacts, contactWithId]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add contact');
    }
  };

  if (isLoading) {
    return <View style={styles.container} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ContactList
        contacts={contacts}
        onAddContact={handleAddContact}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onAddContact: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
});