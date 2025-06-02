import React, { useState } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const users = []; // Dummy users array for demonstration

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  input: { marginBottom: 12 },
  button: { marginTop: 8 },
  success: { color: 'green', marginTop: 12, textAlign: 'center' },
});

function RegisterScreen({ goToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleRegister = () => {
    if (username && password) {
      users.push({ username, password });
      setRegistered(true);
    }
  };

  return (
      <View style={ styles.container }>
         <Image
            source={require('../../assets/images.jpeg')}
            style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 24 }}
        />
        <Text style={styles.title}>Register Mahasiswa</Text>
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
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>
      {registered ? (
        <Text style={styles.success}>Registrasi berhasil! Silakan login.</Text>
      ) : null}
      <Button onPress={goToLogin}>Sudah punya akun? Login</Button>
    </View>
  );
}

export default RegisterScreen;