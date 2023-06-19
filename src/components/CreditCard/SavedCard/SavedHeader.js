import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useContext} from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import ImageButton from './../ImageButton';
import {colors} from '../../DarkMode/colors';

export default function SavedHeader({color}) {

  const {theme} = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <View style={styles.container}>
      <ImageButton color={activeColors.tertiary} source={require('./../../../../assets/back.png')}/>
      <Text style={[styles.title, {color: activeColors.tertiary}]}>Saved Cards</Text>
      <ImageButton color = {activeColors.tertiary} source={require('./../../../../assets/setting.png')}/>
    </View>
  )
}

const styles = StyleSheet.create({

  title:{
    fontWeight:'700',
    fontSize: 32,
    //color:'#2E2D2D',
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 7,
    alignItems: 'center',
  },

});