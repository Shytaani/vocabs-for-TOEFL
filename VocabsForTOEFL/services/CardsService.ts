import { Card } from '../types/Card';
import data from '../assets/card-contents.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function getWords(): Card[] {
  return data;
}

export function getWord(id: number): Card {
  return data[id];
}

export async function saveCurrentWordId(id: number): Promise<void> {
  await AsyncStorage.setItem('current', id.toString());
}

export async function getCurrentWordId(): Promise<number> {
  const id = await AsyncStorage.getItem('current');
  if (id === null) {
    return 0;
  }
  return Number.parseInt(id, 10);
}
