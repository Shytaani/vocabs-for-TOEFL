import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import FlashCard from '../components/Card';

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
      <FlashCard id={0} />
    </SafeAreaView>
  );
}
