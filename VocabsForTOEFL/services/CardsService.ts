import { Card } from '../types/Card';
import cards from '../assets/card-contents.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function getCards(): Card[] {
  return cards;
}

export function getCard(id: number): Card {
  return cards[id];
}

export async function saveCurrentCardId(id: number): Promise<void> {
  await AsyncStorage.setItem('current', id.toString());
}

export async function getCurrentCardId(): Promise<number> {
  const id = await AsyncStorage.getItem('current');
  if (id === null) {
    return 0;
  }
  return Number.parseInt(id, 10);
}
