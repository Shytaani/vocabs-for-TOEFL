import React, { useEffect, useRef, useState } from 'react';
import { Animated, GestureResponderEvent, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Button } from 'react-native-elements';
import { HandlerStateChangeEvent, PanGestureHandler } from 'react-native-gesture-handler';
import { getCurrentCardId, saveCurrentCardId } from '../services/CardsService';
import { Card } from '../types/Card';
import FlashCard from './FlashCard';

const styles = StyleSheet.create({
  cardsContainer: {
    marginVertical: 50,
  },
  cardsContainerSmall: {
    marginVertical: 20,
  },
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

const WINDOW_THRESHOLD_SMALL = 812;

export default function Deck({ cards, startFrom }: { cards: Card[], startFrom?: number }) {
  const first: number = 1;
  const last: number = 327;

  const [id, setId] = useState<number>(first);

  useEffect(() => {
    const fetchCardId = async () => {
      if (startFrom) {
        setId(startFrom);
      } else {
        const current: number = await getCurrentCardId();
        setId(current);
      }
    };
    fetchCardId();
  }, [startFrom]);

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

  const screenWidth: number = useWindowDimensions().width;
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
    <View style={{ alignItems: 'center'}}>
      <View style={ useWindowDimensions().height < WINDOW_THRESHOLD_SMALL ? styles.cardsContainerSmall : styles.cardsContainer}>
        {cards.map((card: Card) => {
          if (card.id < id || card.id > (id + 1)) {
            return null;
          }
          if (card.id === id) {
            return (
              <PanGestureHandler
                key={card.id}
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
          if (card.id === (id + 1)) {
            return (
              <View key={card.id} style={styles.remainingCard}>
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
    </View>
  );
}
