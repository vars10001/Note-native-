import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NoteItem({ note }) {
  return (
    <View style={styles.note}>
      <Text>{note.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  note: {
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10
  }
});
