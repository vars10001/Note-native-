import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { saveNotes, loadNotes } from '../utils/notesStorage';

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [noteColor, setNoteColor] = useState('#a3e635'); // Default green
  const [backgroundColor, setBackgroundColor] = useState('#064e3b'); // Default dark green

  useEffect(() => {
    (async () => {
      const storedNotes = await loadNotes();
      setNotes(storedNotes);
    })();
  }, []);

  const addNote = (note) => {
    const newNotes = [...notes, { id: Date.now().toString(), text: note }];
    setNotes(newNotes);
    saveNotes(newNotes);
  };

  const updateNote = (id, newText) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, text: newText } : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const renderNoteBox = ({ item }) => (
    <TouchableOpacity
      style={[styles.noteBox, { backgroundColor: noteColor }]}
      onPress={() =>
        navigation.navigate('AddNote', {
          isEdit: true,
          existingNote: item,
          updateNote,
          backgroundColor, // Passing background color to AddNoteScreen
        })
      }
    >
      <Text numberOfLines={3} style={styles.noteText}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.colorSection}>
        <Text style={styles.label}>Note Box Color:</Text>
        <View style={styles.colorRow}>
          {['#a3e635', '#facc15', '#a16207', '#9ca3af'].map((color) => (
            <TouchableOpacity
              key={color}
              style={[styles.colorCircle, { backgroundColor: color, borderColor: noteColor === color ? 'black' : '#ccc' }]}
              onPress={() => setNoteColor(color)}
            />
          ))}
        </View>

        <Text style={styles.label}>Background Color:</Text>
        <View style={styles.colorRow}>
          {['#064e3b', '#3e2723', '#1f2937'].map((color) => (
            <TouchableOpacity
              key={color}
              style={[styles.colorCircle, { backgroundColor: color, borderColor: backgroundColor === color ? 'white' : '#ccc' }]}
              onPress={() => setBackgroundColor(color)}
            />
          ))}
        </View>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderNoteBox}
        numColumns={4} // This ensures 4 boxes per row
        columnWrapperStyle={styles.row}
        ListEmptyComponent={<Text style={styles.empty}>No notes yet.</Text>}
      />

      <Button
        title="Add Note"
        onPress={() =>
          navigation.navigate('AddNote', {
            isEdit: false,
            addNote,
            backgroundColor, // Passing background color
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  noteBox: {
    padding: 12,
    borderRadius: 12,
    width: '23%', // Make sure each box takes up 1/4th of the screen width
    minHeight: 100,
    elevation: 3,
  },
  noteText: {
    fontSize: 14,
    color: '#333',
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: '#ccc',
  },
  colorSection: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff',
  },
  colorRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 10,
  },
  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
  },
});
