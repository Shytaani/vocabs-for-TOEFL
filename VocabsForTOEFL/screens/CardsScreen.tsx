import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Deck from '../components/Deck';
import ScreenHeader from '../components/ScreenHeader';
import { getCards } from '../services/CardsService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function CardsScreen({ route }) {
  const { startFrom }: { startFrom: number } = route.params;
  return (
    <>
      <ScreenHeader />
      <SafeAreaView style={styles.container}>
        <Deck cards={getCards()} startFrom={startFrom} />
      </SafeAreaView>
    </>
  );
}
