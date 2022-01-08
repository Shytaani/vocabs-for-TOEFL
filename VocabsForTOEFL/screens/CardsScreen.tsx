import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Deck from '../components/Deck';
import { getWords } from '../services/CardsService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function CardsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Deck cards={getWords()}/>
    </SafeAreaView>
  );
}
