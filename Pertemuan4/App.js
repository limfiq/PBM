import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { useState } from 'react';

// Custom component with props
const Greeting = ({ name, isLoggedIn }) => {
  return (
    <View style={styles.greetingContainer}>
      {/* JavaScript Expression */}
      <Text style={styles.text}>Hello, {name}!</Text>

      {/* Conditional Rendering with && */}
      {isLoggedIn && <Text style={styles.text}>Welcome back!</Text>}

      {/* Conditional Rendering with Ternary */}
      <Text style={styles.status}>
        Status: {isLoggedIn ? 'Online' : 'Offline'}
      </Text>
    </View>
  );
};

export default function App() {
  // State for demonstrating event handling
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Array for demonstrating loops
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' },
    { id: 4, name: 'Alice' }
  ];

  // Event handlers
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleToggleLogin = () => {
    setIsLoggedIn(prevState => !prevState);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Using custom component with props */}
      <Greeting
        name="User"
        isLoggedIn={isLoggedIn}
      />

      {/* Event handling with Button */}
      <View style={styles.buttonContainer}>
        <Button
          title={`Count: ${count}`}
          onPress={handleIncrement}
          color="#841584"
        />

        <Button
          title={isLoggedIn ? 'Logout' : 'Login'}
          onPress={handleToggleLogin}
          color="#008000"
        />
      </View>

      {/* Looping through array */}
      <View style={styles.userList}>
        <Text style={styles.title}>User List:</Text>
        {users.map(user => (
          <Text key={user.id} style={styles.text}>
            {user.id}. {user.name}
          </Text>
        ))}
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  greetingContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  userList: {
    width: '100%',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    fontFamily: 'Arial',
    color: 'red',
  },
  status: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
