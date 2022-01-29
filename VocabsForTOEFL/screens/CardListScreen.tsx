import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CardList from '../components/CardList';
import ScreenHeader from '../components/ScreenHeader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function CardListScreen() {
  return (
    <>
      <ScreenHeader />
      <SafeAreaView style={styles.container}>
        <CardList />
      </SafeAreaView>
    </>
  );
}
