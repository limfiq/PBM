import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const subjects = [
  { name: 'Mathematics', description: 'Learn numbers and formulas', content: 'Mathematics teaches about numbers, shapes, logic, and problem-solving.' },
  { name: 'Science', description: 'Explore nature and physics', content: 'Science covers biology, chemistry, physics, and the study of the universe.' },
  { name: 'History', description: 'Dive into the past events', content: 'History involves learning about ancient civilizations, revolutions, and key historical figures.' },
];

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.header}>Subjects</Title>
      {subjects.map((subject, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate('Detail', { subject })}
        >
          <Card style={styles.card}>
            <Card.Content>
              <Title>{subject.name}</Title>
              <Paragraph>{subject.description}</Paragraph>
            </Card.Content>
          </Card>
        </TouchableOpacity>
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
