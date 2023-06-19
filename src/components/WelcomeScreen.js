import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import {colors} from './DarkMode/colors';
import LoginButton from './Login/LoginButton';
import '../../languages/i18n';
import { useTranslation } from 'react-i18next';
import DropDownPicker from 'react-native-dropdown-picker';

const WelcomeScreen = ({navigation}) => {

    const {theme} = useContext(ThemeContext);
    let activeColors = colors[theme.mode];

    function goToLoginScreen() {
        navigation.navigate("Home");
    }


    const {t, i18n} = useTranslation();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('en');
    const [items, setItems] = useState([
        {label: 'English', value: 'en'},
        {label: 'Turkish', value: 'tr'},
    ]);

    useEffect(() => {
        i18n.changeLanguage(value);
    }, [i18n, value]);


  return (
    <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 65, backgroundColor: activeColors.primary}}>

        <View style={styles.imgContainer}>
            <Image style={styles.logo} source={require('./../../assets/welcomelogo.png')}/>
        </View>

        <LoginButton onPress={goToLoginScreen} containerName={t('LOG IN')}/>

        <Text>{t('dummyNamespace.medium')}</Text>

        <View>
            <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        />
    </View>
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