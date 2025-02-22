import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Contact = ({ contact, onDelete, onToggleFavorite }) => {
  return (
    <View style={[styles.contactContainer, contact.favorite && styles.favoriteContact]}>
      <View style={styles.contactInfo}>
        <Text style={styles.name}>{contact.name} {contact.lastName}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View> 
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onToggleFavorite(contact.id)}>
          <MaterialIcons 
            name={contact.favorite ? "star" : "star-border"} 
            size={24} 
            color={contact.favorite ? "#FFD700" : "#000"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(contact.id)}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phone: {
    color: '#666',
  },
  favoriteContact: {
    backgroundColor: '#fff9e6',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default Contact;