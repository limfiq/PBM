import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';

const API_URL = 'http://<IP_BACKEND>:3000/todos'; // Ganti <IP_BACKEND>

export default function App() {
  const [todos, setTodos] = useState([]);
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchTodos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTodos(data);
  };

  const saveTodo = async () => {
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API_URL}/${editId}` : API_URL;
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ judul, isi })
    });
    setJudul('');
    setIsi('');
    setEditId(null);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  const editTodo = (item) => {
    setJudul(item.judul);
    setIsi(item.isi);
    setEditId(item.id);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <TextInput label="Judul" value={judul} onChangeText={setJudul} />
      <TextInput label="Isi" value={isi} onChangeText={setIsi} multiline />
      <Button mode="contained" onPress={saveTodo}>
        {editId ? 'Update' : 'Simpan'}
      </Button>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 5 }}>
            <Card.Title title={item.judul} />
            <Card.Content>
              <Button onPress={() => editTodo(item)}>Edit</Button>
              <Button onPress={() => deleteTodo(item.id)}>Hapus</Button>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}