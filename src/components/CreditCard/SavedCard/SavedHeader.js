import { StyleSheet, Text, View, TouchableOpacity,SafeAreaView } from 'react-native';
import React, {useState, useContext} from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import {colors} from '../../DarkMode/colors';
import LogoutPower from '../../Login/LogoutPower';
import '../../../../languages/i18n';
import { useTranslation } from 'react-i18next';

export default function SavedHeader({pressGear}) {

  const {t, i18n} = useTranslation();

  const {theme} = useContext(ThemeContext);
  let activeColors = colors[theme.mode];


  return (
    <SafeAreaView>
        <View style={styles.container}>
          <Text style={[styles.title, {color: activeColors.tertiary}]}>{t('savedList.SavedCardTitle')}</Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  headerContainer:{
    flexDirection: 'row',
  },

  title:{
    fontWeight:'700',
    fontSize: 32,
    justifyContent: 'center',
    alignContent: 'center',
  },

  container: {
    flexDirection: 'row',
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

});