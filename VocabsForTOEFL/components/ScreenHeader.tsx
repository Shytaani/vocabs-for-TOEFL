import React from 'react';
import { StyleSheet } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Header } from 'react-native-elements';

const styles = StyleSheet.create({
  center: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default function ScreenHeader() {

  const { dispatch } = useNavigation();

  return (
    <Header
      leftComponent={{ icon: 'menu', color: 'white', iconStyle: { color: 'white' }, onPress: () => dispatch(DrawerActions.toggleDrawer()) }}
      centerComponent={{ text: 'Vocabs for TOEFL', style: styles.center }}
    />
  );
}
