import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

// Function to calculate luminance and decide if the color is dark or light
const getTextColor = (backgroundColor) => {
  // Convert hex to RGB
  let hex = backgroundColor.replace("#", "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance (perceived brightness)
  let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Return text color based on luminance
  return luminance < 128 ? "#ffffff" : "#000000"; // White text for dark, black text for light
};

export default function AddNoteScreen({ route, navigation }) {
  const { isEdit, existingNote, updateNote, addNote, backgroundColor } =
    route.params;
  const [noteText, setNoteText] = useState(isEdit ? existingNote.text : "");

  // Get the text color based on background color
  const textColor = getTextColor(backgroundColor);

  const handleSave = () => {
    if (isEdit) {
      updateNote(existingNote.id, noteText);
    } else {
      addNote(noteText);
    }
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>
        {isEdit ? "Edit Note" : "Add Note"}
      </Text>
      <TextInput
        style={[styles.textInput, { color: textColor }]}
        value={noteText}
        onChangeText={setNoteText}
        multiline
        placeholder="Write your note here..."
        placeholderTextColor={textColor === "#ffffff" ? "#ccc" : "#666"}
      />
      <Button
        title="Save"
        onPress={handleSave}
        color={textColor === "#ffffff" ? "#000" : "#fff"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 24, marginBottom: 10, fontWeight: "bold" },
  textInput: {
    height: 200,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
    textAlignVertical: "top",
  },
});
