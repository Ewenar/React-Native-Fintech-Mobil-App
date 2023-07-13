import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import React, {useState, useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../DarkMode/colors';
import { ThemeContext } from '../contexts/ThemeContext';

const CurrencyText = ({title}) => {

    const {theme} = useContext(ThemeContext);
    let activeColors = colors[theme.mode];

  return (
    <View style={[styles.item, {backgroundColor: activeColors.secondary}]}>
        <Text style={[styles.name, {color: activeColors.tint}]}>{title}</Text>
    </View>

  )
}

export default CurrencyText;

const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        borderWidth: 2,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

      },
      name: {
        fontSize: 32,
        color: 'black',
      },
});