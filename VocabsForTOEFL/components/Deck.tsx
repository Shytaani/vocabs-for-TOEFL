import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, GestureResponderEvent, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { HandlerStateChangeEvent, PanGestureHandler } from 'react-native-gesture-handler';
import { getCurrentCardId, saveCurrentCardId } from '../services/CardsService';
import { Card } from '../types/Card';
import FlashCard from './FlashCard';

const styles = StyleSheet.create({
  remainingCard: {
    position: 'absolute',
    top: 2,
    left: 2,
  },
  buttonContainer: {
    width: 200,
    marginBottom: 20,
  },
  button: {
    height: 50,
  },
});

export default function Deck({ cards }: { cards: Card[] }) {
  const first: number = 0;
  const last: number = 326;

  const [id, setId] = useState<number>(first);

  useEffect(() => {
    const fetchCardId = async () => {
      const current: number = await getCurrentCardId();
      setId(current);
    };
    fetchCardId();
  }, []);

  useEffect(() => {
    const saveCardId = async () => {
      await saveCurrentCardId(id);
    };
    saveCardId();
  }, [id]);

  const getNextCard: () => void = () => {
    if (id < last) {
      setId((prevState: number) => prevState + 1);
    } else {
      setId(first);
    }
  };

  const position: Animated.ValueXY = useRef(new Animated.ValueXY()).current;
  let positionXVal: number = 0;
  position.addListener(({ x, y }) => positionXVal = x);

  const handlePanGestureEvent: () => void = Animated.event(
    [
      {
        nativeEvent: {
          translationX: position.x,
          translationY: position.y,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const screenWidth: number = Dimensions.get('window').width;
  const swipeThreshold: number = screenWidth * 0.25;
  enum DIRECTION { LEFT = 'left', RIGHT = 'right' }

  const forceSwipeLeft: () => void = () => forceSwipe(DIRECTION.LEFT);
  const forceSwipeRight: () => void = () => forceSwipe(DIRECTION.RIGHT);
  const forceSwipe: (direction: DIRECTION) => void = (direction: DIRECTION) => {
    const x = direction === DIRECTION.RIGHT ? screenWidth : -screenWidth;
    Animated.timing(position, {
      toValue: {x, y: 0},
      duration: 300,
      useNativeDriver: true,
    }).start(() => onSwipeComplete());
  };
  const onSwipeComplete: () => void = () => {
    position.setValue({ x: 0, y: 0 });
    getNextCard();
  };
  const resetPosition: () => void = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  const onPanGestureRelease: (event: HandlerStateChangeEvent) => void = (event) => {
    if (positionXVal > swipeThreshold) {
      forceSwipeRight();
    } else if (positionXVal < -swipeThreshold) {
      forceSwipeLeft();
    } else {
      resetPosition();
    }
  };

  const resetDeck: (event: GestureResponderEvent) => void = (event) => {
    setId(first);
  };

  return (
    <>
      <View>
        {cards.map((card: Card, i: number) => {
          if (i < id || i > (id + 1)) {
            return null;
          }
          if (i === id) {
            return (
              <PanGestureHandler
                key={card.word}
                onGestureEvent={handlePanGestureEvent}
                onEnded={onPanGestureRelease}
              >
                <Animated.View style={{
                  transform: [
                    { translateX: position.x },
                    { translateY: position.y },
                  ],
                }}>
                  <FlashCard card={card} />
                </Animated.View>
              </PanGestureHandler>
            );
          }
          if (i === (id + 1)) {
            return (
              <View key={card.word} style={styles.remainingCard}>
                <FlashCard card={card} />
              </View>
            );
          }
        }).reverse()}
      </View>
      <Button
        title="Reset"
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        onPress={resetDeck}
      />
    </>
  );
}
