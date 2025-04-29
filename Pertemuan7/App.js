// Install semua ini dulu sebelum jalanin:
// npm install react-native-paper react-native-vector-icons @react-navigation/native @react-navigation/native-stack lottie-react-native
// + install dependencies tambahan sesuai dokumentasi navigasi

import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');
const Stack = createNativeStackNavigator();

function WelcomeScreen({ navigation }) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        {/* <LottieView
          source={require('./assets/welcome.json')} // ganti dengan file Lottie kamu
          autoPlay
          loop
          style={{ width: width * 0.8, height: height * 0.4 }}
        /> */}
      </Animated.View>
      <Button mode="contained" onPress={() => navigation.navigate('Home')} style={styles.button}>
        Get Started
      </Button>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Icon name="home" size={100} color="#6200ee" />
      <Text style={styles.title}>Home Screen</Text>
      <View style={{ marginTop: 20, width: width * 0.8 }}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Profile')}
          style={styles.button}
        >
          Go to Profile
        </Button>
        <Button
          mode="outlined"
          onPress={() => console.log('Settings Pressed')}
          style={[styles.button, { marginTop: 10 }]}
        >
          Settings
        </Button>
        <Button
          mode="text"
          onPress={() => console.log('Help Pressed')}
          style={[styles.button, { marginTop: 10 }]}
        >
          Help
        </Button>
      </View>
      <View style={{ marginTop: 40, alignItems: 'center' }}>
        <Text style={{ fontSize: 16, color: '#666' }}>Quick Links</Text>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Button
            mode="contained"
            onPress={() => console.log('Link 1 Pressed')}
            style={[styles.button, { width: width * 0.3, marginHorizontal: 5 }]}
          >
            Link 1
          </Button>
          <Button
            mode="contained"
            onPress={() => console.log('Link 2 Pressed')}
            style={[styles.button, { width: width * 0.3, marginHorizontal: 5 }]}
          >
            Link 2
          </Button>
        </View>
      </View>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Icon name="account" size={100} color="#6200ee" />
      <Text style={styles.title}>Profile Screen</Text>
      <View style={{ marginTop: 20, width: width * 0.8 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Name: John Doe</Text>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Email: john.doe@example.com</Text>
        <Button mode="contained" onPress={() => console.log('Edit Profile')} style={styles.button}>
          Edit Profile
        </Button>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  title: {
    fontSize: width * 0.06, // Responsive font size
    marginVertical: height * 0.02,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    marginTop: height * 0.02,
    width: width * 0.7, // Adjusted width for responsiveness
    paddingVertical: height * 0.015, // Responsive padding
  },
});
