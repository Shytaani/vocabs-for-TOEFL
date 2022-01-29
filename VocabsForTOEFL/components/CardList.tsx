import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { getCards } from '../services/CardsService';
import { Card } from '../types/Card';

export default function CardList() {

  const [deck, setDeck] = useState<Card[]>([]);

  useEffect(() => {
    const fetchCardList = () => {
      setDeck(getCards());
    };
    fetchCardList();
  }, []);

  const listItem = ({ item }: { item: Card }) => {
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.word}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  return (
      <FlatList
        data={deck}
        renderItem={listItem}
        keyExtractor={ item => item.id.toString()}
      />
  );
}
