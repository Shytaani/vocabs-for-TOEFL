import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CardsScreen from './screens/CardsScreen';
import CardListScreen from './screens/CardListScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Flashcards" screenOptions={{headerShown: false}}>
        <Drawer.Screen name="List" component={CardListScreen} />
        <Drawer.Screen name="Flashcards" component={CardsScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
