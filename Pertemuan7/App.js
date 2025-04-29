import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import DetailScreen from './components/DetailScreen'; // tambahkan ini

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Belajar Materi' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
