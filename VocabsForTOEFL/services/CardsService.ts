import { Card } from '../types/Card';
import cards from '../assets/card-contents.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function getCards(): Card[] {
  return cards;
}

export function getCard(id: number): Card {
  const result = cards.find(card => card.id === id);
  if (result === undefined) {
    return cards[0];
  }
  return result;
}

export async function saveCurrentCardId(id: number): Promise<void> {
  await AsyncStorage.setItem('current', id.toString());
}

export async function getCurrentCardId(): Promise<number> {
  const id = await AsyncStorage.getItem('current');
  if (id === null) {
    return 1;
  }
  return Number.parseInt(id, 10);
}
