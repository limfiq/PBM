import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import './screens/StackScreen';
import './screens/TabScreen';
import './screens/DrawerScreen'; cc

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StackScreen', { name: 'Stack' })}>
        <Text style={styles.buttonText}>Stack</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details', { name: ' Tab' })}>
        <Text style={styles.buttonText}>Tab</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details', { name: 'Drawer' })}>
        <Text style={styles.buttonText}>Drawer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details', { name: 'Nested' })}>
        <Text style={styles.buttonText}>Nested</Text>
      </TouchableOpacity>
    </View>
  );
}

function DetailsScreen({ route }) {
  const { name } = route.params;
  return (
    <View style={styles.container}>
      <Text>Details Screen for {name}</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default App;
