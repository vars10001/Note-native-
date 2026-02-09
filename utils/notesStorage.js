import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTES_KEY = "NOTES";

export const saveNotes = async (notes) => {
  try {
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (e) {
    console.error("Failed to save notes.", e);
  }
};

export const loadNotes = async () => {
  try {
    const json = await AsyncStorage.getItem(NOTES_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.error("Failed to load notes.", e);
    return [];
  }
};
