import { registerRootComponent } from 'expo';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddNoteScreen from './screens/AddNoteScreen';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false); // State to toggle between light and dark mode

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Toggle the theme when the button is pressed
  };

  return (
    <NavigationContainer>
      {/* Wrap everything in a View for the background change */}
      <View
        style={[
          styles.container,
          {
            backgroundColor: isDarkMode ? '#1f2937' : '#f3f4f6', // Change background based on theme
          },
        ]}
      >
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitle: 'Home',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: isDarkMode ? '#333' : '#fff', // Dark or light header background
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 28,
                color: isDarkMode ? 'white' : 'black', // Text color changes based on theme
              },
              headerRight: () => (
                // Add the theme toggle button in the header
                <TouchableOpacity onPress={toggleTheme} style={styles.themeToggleButton}>
                  <Text style={{ color: isDarkMode ? 'white' : 'black' }}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen name="AddNote" component={AddNoteScreen} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themeToggleButton: {
    marginRight: 20, // Add some spacing for the button
  },
});

registerRootComponent(App);
