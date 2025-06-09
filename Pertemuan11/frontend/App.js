import React, { useEffect, useState } from 'react';
import { View, ScrollView, TextInput, Button } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'http://localhost:3000/books'; // Ganti sesuai backend

export default function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [desc, setDesc] = useState('');

  const fetchBooks = async () => {
    const res = await axios.get(API_URL);
    setBooks(res.data);
  };

  const addBook = async () => {
    if (title && author && desc) {
      await axios.post(API_URL, { title, author, description: desc });
      setTitle('');
      setAuthor('');
      setDesc('');
      fetchBooks();
    }
  };
  const editBook = async (id, newTitle, newAuthor, newDesc) => {
    if (newTitle && newAuthor && newDesc) {
      await axios.put(`${API_URL}/${id}`, {
        title: newTitle,
        author: newAuthor,
        description: newDesc,
      });
      fetchBooks();
    }
  };

  const deleteBook = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const [editingBook, setEditingBook] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const startEdit = (book) => {
    setEditingBook(book);
    setEditTitle(book.title);
    setEditAuthor(book.author);
    setEditDesc(book.description);
  };

  const cancelEdit = () => {
    setEditingBook(null);
    setEditTitle('');
    setEditAuthor('');
    setEditDesc('');
  };

  const saveEdit = async () => {
    if (editingBook && editTitle && editAuthor && editDesc) {
      await editBook(editingBook._id, editTitle, editAuthor, editDesc);
      cancelEdit();
    }
  };

  return (
    <ScrollView style={{ padding: 20, marginTop: 40 }}>
      {/* Add Book Form */}
      <Card style={{ padding: 15, marginBottom: 20 }}>
        <Card.Title title="Add New Book" />
        <Card.Content>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={{
              marginBottom: 10,
              backgroundColor: '#e3f2fd',
              borderRadius: 5,
              padding: 8,
            }}
          />
          <TextInput
            placeholder="Author"
            value={author}
            onChangeText={setAuthor}
            style={{
              marginBottom: 10,
              backgroundColor: '#fff9c4',
              borderRadius: 5,
              padding: 8,
            }}
          />
          <TextInput
            placeholder="Description"
            value={desc}
            onChangeText={setDesc}
            style={{
              marginBottom: 10,
              backgroundColor: '#c8e6c9',
              borderRadius: 5,
              padding: 8,
            }}
          />
          <Button title="Add Book" onPress={addBook} />
        </Card.Content>
      </Card>

      {/* Edit Book Form */}
      {editingBook && (
        <Card style={{ padding: 15, marginBottom: 20, backgroundColor: '#fce4ec' }}>
          <Card.Title title="Edit Book" />
          <Card.Content>
            <TextInput
              placeholder="Title"
              value={editTitle}
              onChangeText={setEditTitle}
              style={{
                marginBottom: 10,
                backgroundColor: '#e3f2fd',
                borderRadius: 5,
                padding: 8,
              }}
            />
            <TextInput
              placeholder="Author"
              value={editAuthor}
              onChangeText={setEditAuthor}
              style={{
                marginBottom: 10,
                backgroundColor: '#fff9c4',
                borderRadius: 5,
                padding: 8,
              }}
            />
            <TextInput
              placeholder="Description"
              value={editDesc}
              onChangeText={setEditDesc}
              style={{
                marginBottom: 10,
                backgroundColor: '#c8e6c9',
                borderRadius: 5,
                padding: 8,
              }}
            />
            <Button title="Save" onPress={saveEdit} />
            <View style={{ height: 10 }} />
            <Button title="Cancel" color="grey" onPress={cancelEdit} />
          </Card.Content>
        </Card>
      )}

      {/* List Books */}
      {books.map((book) => (
        <Card key={book._id} style={{ marginVertical: 10 }}>
          <Card.Content>
            <Title>{book.title}</Title>
            <Paragraph>{book.author}</Paragraph>
            <Paragraph>{book.description}</Paragraph>
            <Button
              title="Edit"
              onPress={() => startEdit(book)}
            />
            <Button title="Delete" onPress={() => deleteBook(book._id)} />
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}
