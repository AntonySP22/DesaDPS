import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Contact = ({ contact }) => {
  return (
    <View style={styles.contactContainer}>
      <View style={styles.contactInfo}>
        <Text style={styles.name}>{contact.name} {contact.lastName}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
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
});

export default Contact;