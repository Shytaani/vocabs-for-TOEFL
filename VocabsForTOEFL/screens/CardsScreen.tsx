import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import Deck from '../components/Deck';
import { getWords } from '../services/CardsService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default function CardsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header centerComponent={{ text: 'Vocabs for TOEFL', style: styles.header }} />
      <Deck cards={getWords()}/>
    </SafeAreaView>
  );
}
