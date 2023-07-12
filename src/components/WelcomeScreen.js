import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import {colors} from './DarkMode/colors';
import LoginButton from './Login/LoginButton';
import '../../languages/i18n';
import { useTranslation } from 'react-i18next';
import DropDownPicker from 'react-native-dropdown-picker';

const WelcomeScreen = ({navigation}) => {

    //Theme Context

    const {theme} = useContext(ThemeContext);
    let activeColors = colors[theme.mode];

    //Navigation

    function goToLoginScreen() {
        navigation.navigate("Home");
    }

    //Language

    const {t, i18n} = useTranslation();



  return (
    <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 65, backgroundColor: activeColors.primary}}>

        {/*Image Section*/}

        <View style={styles.imgContainer}>
            <Image style={styles.logo} source={require('./../../assets/welcomelogo.png')}/>
        </View>

        {/*Log In Button Section*/}

        <LoginButton onPress={goToLoginScreen} containerName={t('LOG IN')}/>

    </View>
  );
};


export default WelcomeScreen

const styles = StyleSheet.create({

    imgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 65,
    },

    logo:{
        width: 130,
        height: 130,
    },

});