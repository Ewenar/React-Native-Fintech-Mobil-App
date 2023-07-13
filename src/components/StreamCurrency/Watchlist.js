import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import io from 'socket.io-client';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useWebSocket from 'react-use-websocket';
import CurrencyText from './CurrencyText';
import {colors} from '../DarkMode/colors';
import { ThemeContext } from '../contexts/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../redux/actions/Actions';
import WatchlistText from './WatchlistText';
import { useTranslation } from 'react-i18next';


const LiveStreamCurrency = ({navigation}) => {

  const dispatch = useDispatch();

  const items = useSelector(state => state);

  const {theme} = useContext(ThemeContext);
	let activeColors = colors[theme.mode];

  const {t, i18n} = useTranslation();

  function goToLiveStream() {
    navigation.navigate('LiveStream');
  };



  return (
    <SafeAreaView style={[styles.container, {backgroundColor: activeColors.primary}]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.title, {color: activeColors.tint}]}>{t('Watchlist.Title')}</Text>
      </View>
      <TouchableOpacity onPress={goToLiveStream}>
        <FlatList data={items} renderItem={({item}) => <WatchlistText title={item}/>} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f6f6f6',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 32,
    color: 'black',
  },
  price: {
    fontSize: 32,
    color: 'black',
  },

  headerContainer: {
    flexDirection: 'row',
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },

  title:{
    fontWeight:'700',
    fontSize: 32,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default LiveStreamCurrency;