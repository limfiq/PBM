import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider, TextInput, Button, Text, Appbar } from 'react-native-paper';
import { Image } from 'react-native';
import HomeScreen from './component/pages/homeDashboard'; // Import HomeScreen component
import RegisterScreen from './component/pages/registerMahasiswa'; // Import RegisterScreen component

const users = [
  { username: 'ufiq', password: 'password' }
];

function LoginScreen({ onLogin, goToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setError('');
      onLogin(user);
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/images.jpeg')}
        style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 24 }}
      />
      <Text style={styles.title}>Login Mahasiswa</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Button onPress={goToRegister}>Belum punya akun? Register</Button>
    </View>
  );
}


export default function App() {
  const [screen, setScreen] = useState('login');
  const [user, setUser] = useState(null);

  if (user) {
    return (
      <PaperProvider>
        <HomeScreen user={user} onLogout={() => { setUser(null); setScreen('login'); }} />
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      {screen === 'login' ? (
        <LoginScreen
          onLogin={setUser}
          goToRegister={() => setScreen('register')}
        />
      ) : (
        <RegisterScreen
          goToLogin={() => setScreen('login')}
        />
      )}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff'
  },
  input: {
    marginBottom: 16
  },
  button: {
    marginBottom: 8
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center'
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center'
  },
  success: {
    color: 'green',
    marginBottom: 8,
    textAlign: 'center'
  },
  homeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});