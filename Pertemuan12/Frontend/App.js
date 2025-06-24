// App.js
// import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { TextInput, Button, Text, Image, Provider as PaperProvider } from 'react-native-paper';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const API_BASE_URL = 'http://localhost:3000'; // Ganti sesuai IP lokal jika diakses dari perangkat lain

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) {
      setMessage('Username dan password tidak boleh kosong.');
      return;
    }

    setIsLoading(true);
    setMessage('');
    setToken(null);

    const endpoint = isRegistering ? '/register' : '/login';

    try {
      const response = await fetch(API_BASE_URL + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        if (isRegistering) {
          setMessage('Registrasi berhasil! Silakan login.');
          setIsRegistering(false);
        } else {
          setToken(data.token);
          setMessage('Login berhasil!');
        }
      } else {
        setMessage(data.message || 'Terjadi kesalahan.');
      }
    } catch (error) {
      console.error('Network Error:', error);
      setMessage('Gagal terhubung ke server. Pastikan backend sudah berjalan dan alamat IP/URL sudah benar.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoginRegister = () => (
    <View style={{ padding: 20, marginTop: Constants.statusBarHeight }}>
      <Text variant="headlineMedium" style={{ textAlign: 'center', marginBottom: 20 }}>
        {/* <Image source={require('./assets/icon.png')} style={{ width: 100, height: 100, alignSelf: 'center' }} /> */}
        {isRegistering ? 'Halaman Register' : 'Halaman Login'}
      </Text>

      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        disabled={isLoading}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        disabled={isLoading}
        style={{ marginBottom: 20 }}
      />

      <Button mode="contained" onPress={handleSubmit} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="white" /> : (isRegistering ? 'Register' : 'Login')}
      </Button>

      <Button
        mode="text"
        onPress={() => {
          setIsRegistering(!isRegistering);
          setMessage('');
        }}
        disabled={isLoading}
        style={{ marginTop: 10 }}
      >
        {isRegistering ? 'Sudah punya akun? Login' : 'Belum punya akun? Register'}
      </Button>

      {message !== '' && (
        <Text style={{ marginTop: 20, color: token ? 'green' : 'red', textAlign: 'center' }}>{message}</Text>
      )}
    </View>
  );

  // State and effect for books, must be at the top level of the component
  const [books, setBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(false);
  const [booksError, setBooksError] = useState('');

  useEffect(() => {
    if (!token) return;
    const fetchBooks = async () => {
      setBooksLoading(true);
      setBooksError('');
      try {
        const response = await fetch(API_BASE_URL + '/books', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) {
          throw new Error('Gagal memuat data buku');
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setBooksError('Gagal memuat data buku');
      } finally {
        setBooksLoading(false);
      }
    };
    fetchBooks();
  }, [token]);

  const renderHome = () => (
    <View style={{ padding: 20, marginTop: Constants.statusBarHeight }}>
      <Text variant="headlineMedium" style={{ textAlign: 'center', marginBottom: 20 }}>Selamat Datang, {username}</Text>
      {booksLoading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : booksError ? (
        <Text style={{ color: 'red', marginTop: 20, textAlign: 'center' }}>{booksError}</Text>
      ) : (
        <ScrollView style={{ marginBottom: 20 }}>
          {books.map((book, idx) => (
            <Card key={book._id || idx} style={{ marginBottom: 15 }}>
              <Card.Content>
                <Title>{book.title}</Title>
                <Paragraph>Penulis: {book.author}</Paragraph>
                <Paragraph>{book.description}</Paragraph>
              </Card.Content>
            </Card>
          ))}
          {books.length === 0 && (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>Belum ada buku.</Text>
          )}
        </ScrollView>
      )}
      {/* 
      <View style={{ marginTop: 20, padding: 10, backgroundColor: '#eee', borderRadius: 8 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Token Anda:</Text>
        <Text selectable>{token}</Text>
      </View> 
      */}
      <Button
        mode="contained"
        style={{ marginTop: 20 }}
        onPress={() => {
          setToken(null);
          setUsername('');
          setPassword('');
          setMessage('');
        }}
      >
        Logout
      </Button>
    </View>
  );

  return (
    <PaperProvider>
      {token ? renderHome() : renderLoginRegister()}
    </PaperProvider>
  );
}
