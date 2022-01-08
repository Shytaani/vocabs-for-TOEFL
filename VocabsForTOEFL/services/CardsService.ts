import { Card } from '../types/Card';
import data from '../assets/card-contents.json';

export function getWords(): Card[] {
  return data;
}

export function getWord(id: number): Card {
  return data[id];
}
