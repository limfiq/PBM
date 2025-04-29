import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const subjects = [
  { name: 'Mathematics', description: 'Learn numbers and formulas' },
  { name: 'Science', description: 'Explore nature and physics' },
  { name: 'History', description: 'Dive into the past events' },
];

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.header}>Subjects</Title>
      {subjects.map((subject, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content>
            <Title>{subject.name}</Title>
            <Paragraph>{subject.description}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    elevation: 3,
  },
});
