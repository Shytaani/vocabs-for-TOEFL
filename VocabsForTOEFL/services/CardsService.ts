import { Card } from '../types/Card';
// import cards from '../assets/card-contents.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const apiDomain = 'https://api.vocabs-for-toefl.com';
// const apiDomain = 'http://localhost:80';

export async function getCards(): Promise<Card[]> {
  const cards: Card[] = await axios.get(apiDomain + '/v1/cards')
    .then(res => res.data)
    .catch(err => console.error(err));
  return cards;
}

export async function getCard(id: number): Promise<Card> {
  const result: Card = await axios.get(apiDomain + `/v1/card/${id}`)
    .then(res => res.data)
    .catch(err => console.error(err));
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
