import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import CurrencyText from './CurrencyText';

const Watchlist = () => {

  return (
    <SafeAreaView>
        <View>
        <Text>Watchlist</Text>
        </View>

        <CurrencyText/>
    </SafeAreaView>
  )
}

export default Watchlist

const styles = StyleSheet.create({

});