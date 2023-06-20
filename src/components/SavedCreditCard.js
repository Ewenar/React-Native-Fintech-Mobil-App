import { Switch, View, Text, StyleSheet,Image, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import React, {useState, useContext} from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import SavedHeader from './CreditCard/SavedCard/SavedHeader';
import SavedList from './CreditCard/SavedCard/SavedList';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from './DarkMode/colors';
import '../../languages/i18n';
import { useTranslation } from 'react-i18next';
import LogoutPower from './Login/LogoutPower';
import Dashboard from './Dashboard';

const SavedCreditCard = ({navigation}) => {

  const {t, i18n} = useTranslation();

  const {theme} = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const [isDarkMode, setIsDarkMode] = useState(false);

  const onValueChange = () => setIsDarkMode(!isDarkMode);

  const color = isDarkMode ? '#fff' : '#2E2D2D';


  function goToAddAccount() {
    navigation.navigate("CreateAccount");
  };

  function goToDashboard() {
    navigation.navigate("Board");
  };

  function goToWelcomeScreen() {
    navigation.navigate("Welcome");
  }

  function goToProfileScreen() {
    navigation.navigate("ProfileScreen");
  }

  return (
    <>
      <SafeAreaView style={[styles.container, {flex: 1, backgroundColor: activeColors.primary}]}>
      <LogoutPower name={'power'} onPress={goToWelcomeScreen} style={{width:30, marginTop:30, marginLeft:20, color: activeColors.tint}}/>
        <View style={styles.headerContainer}>
          <SavedHeader/>
        </View>
        <View style={{ marginTop:-50}}>
          <SavedList onPress={goToDashboard}/>
        </View>

        <View style={{justifyContent: 'center', paddingHorizontal: 80}}>
          <TouchableOpacity style={[styles.addAccount, {backgroundColor: activeColors.secondary}]} onPress={goToAddAccount}>
            <Entypo name="plus" style={{color: activeColors.tertiary}} />
            <Text style={([styles.addAccountText], {color: activeColors.tint})}>{t('savedCardAdd.AddAccount')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SavedCreditCard

const styles = StyleSheet.create({

  scrollView: {
    flex:1,
  },

  headerContainer:{
    marginHorizontal: 70,
    marginTop: 20,
  },

    darkMode: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#E9E9E9',
      marginHorizontal: 20,
      alignItems:'center',
      paddingVertical: 20,
    },

    darkModeText: {
        color: '#222',
        fontSize: 16,
    },

    container: {
          flex: 1,
          backgroundColor: '#fff',
    },

    addAccount: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      borderWidth: 1,
      padding: 15,
      marginTop: 50,
      flexDirection: 'row',
    },
    addAccountText: {
      paddingLeft: 5,
      color: 'black',
    },
});