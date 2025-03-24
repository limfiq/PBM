import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { useState } from 'react';
import ListStyles from './styles/ListStyles';

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
      {/* Using custom component with props and inline styles */}
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 16,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2
      }}>
        Project Pertemuan 4<br />
        JSX dan Styling
      </Text>

      <Greeting
        name="User"
        isLoggedIn={isLoggedIn}
      />

      {/* Event handling with Button using StyleSheet.create */}
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

      {/* Looping through array using external stylesheet */}
      <View style={ListStyles.userList}>
        <Text style={ListStyles.listTitle}>User List:</Text>
        {users.map((user, index) => (
          <Text
            key={user.id}
            style={[
              ListStyles.listItem,
              ListStyles[`listItemColor${(index % 4) + 1}`]
            ]}
          >
            {user.id}. {user.name}
          </Text>
        ))}
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

// Internal StyleSheet.create for component-specific styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#f1f3f5',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  greetingContainer: {
    marginBottom: 20,
    alignItems: 'center',
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
