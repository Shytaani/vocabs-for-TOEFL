import React, { useRef } from 'react';
import { Animated, FlatList, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { getWord } from '../services/CardsService';
import { Card } from '../types/Word';

const styles = StyleSheet.create({
  card: {
    height: 500,
    width: 350,
    flexDirection: 'column',
    borderRadius: 8,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    backgroundColor: 'antiquewhite',
  },
  cardFront: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBack: {
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
  },
  word: {
    textAlign: 'center',
  },
  header: {
    paddingVertical: 10,
  },
  sentence: {
    fontSize: 16,
  },
});

export default function FlashCard({ id }: { id: number }) {
  const flipAnim = useRef(new Animated.Value(0)).current;
  let flipRotation: number = 0;
  flipAnim.addListener(({ value }: { value: number }) => flipRotation = value);

  const frontFlip = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backFlip = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  const frontFlipStyle = {
    transform: [
      { rotateY: frontFlip },
    ],
  };
  const backFlipStyle = {
    transform: [
      { rotateY: backFlip },
    ],
  };
  const flipToFront = () => {
    Animated.timing(flipAnim, {
      toValue: 180,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };
  const flipToBack = () => {
    Animated.timing(flipAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const word: Card = getWord(id);

  return (
    <Pressable onPress={() => flipRotation ? flipToBack() : flipToFront()}>
      <Animated.View style={[styles.card, styles.cardFront, frontFlipStyle]}>
        <Text h1={true} style={styles.word}>{word.word}</Text>
      </Animated.View>
      <Animated.View style={[styles.card, styles.cardBack, backFlipStyle]}>
        <Text h1={true} style={styles.word}>{word.word}</Text>
        <FlatList
          data={word.definitions}
          renderItem={({ item: definition }) => <Text h4={true}>{definition}</Text>}
          keyExtractor={(_, i) => i.toString()}
          ListHeaderComponent={() => <Text h2={true}>Definition</Text>}
          ListHeaderComponentStyle={styles.header}
        />
        <FlatList
          data={word.sentences}
          renderItem={({ item: sentence }) => <Text style={styles.sentence}>{sentence}</Text>}
          keyExtractor={(_, i) => i.toString()}
          ListHeaderComponent={() => <Text h2={true}>Sentence</Text>}
          ListHeaderComponentStyle={styles.header}
        />
      </Animated.View>
    </Pressable>
  );
}
