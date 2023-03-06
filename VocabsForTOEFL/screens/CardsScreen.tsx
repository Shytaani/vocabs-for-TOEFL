import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Deck from '../components/Deck';
import ScreenHeader from '../components/ScreenHeader';
import { getCards } from '../services/CardsService';
import { Card } from '../types/Card';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function CardsScreen({ route }) {
  const { startFrom }: { startFrom: number } = route.params;

  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const fetchCardList = async () => {
      const cardList: Card[] = await getCards();
      setCards(cardList);
    };
    fetchCardList();
  }, []);

  return (
    <>
      <ScreenHeader />
      <SafeAreaView style={styles.container}>
        <Deck cards={cards} startFrom={startFrom} />
      </SafeAreaView>
    </>
  );
}
