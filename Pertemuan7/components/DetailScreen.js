import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Paragraph, Button } from 'react-native-paper';

const DetailScreen = ({ route, navigation }) => {
  const { subject } = route.params;

  return (
    <View style={styles.container}>
      <Title style={styles.title}>{subject.name}</Title>
      <Paragraph style={styles.content}>{subject.content}</Paragraph>
      <Button mode="contained" style={styles.button} onPress={() => alert('Mulai belajar!')}>
        Mulai Belajar
      </Button>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
});
