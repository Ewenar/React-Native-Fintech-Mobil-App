/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, StyleSheet, ScrollView, Alert, ActivityIndicator, TextInput, Touchable, TouchableOpacity, Keyboard} from 'react-native';
import React, {useState, useContext} from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginContainer from './Login/LoginContainer';
import LogoutPower from './Login/LogoutPower';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {colors} from './DarkMode/colors';
import '../../languages/i18n';
import { useTranslation } from 'react-i18next';




const LoginScreen = ({navigation}) => {

  const {t, i18n} = useTranslation();

  const {theme} = useContext(ThemeContext);
  let activeColors = colors[theme.mode];


  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({id:'', password:''});
  const [errors, setErrors] = useState({});

  function authContent() {
    const contentObj = {
      id: inputs.id,
      firstPassword: inputs.firstPassword,
    };

    database().ref('users/').getItem(contentObj);
  }

  const validate = () => {

    Keyboard.dismiss();

    let valid = true;
    if (!inputs.id) {
      handleError('ID is empty', 'id');
      valid = false;
    }

    if (!inputs.password) {
      handleError('Password is empty', 'password');
      valid = false;
    }
    else if (inputs.password.length < 6) {
      handleError('Password cannot be less than 6 characters', 'password');
      valid = false;
    }

    if (valid){
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(async() => {
      setLoading(false);
      let userData = await AsyncStorage.getItem('users');
      var keys = await AsyncStorage.multiGet(['id', 'password']);
      console.log(keys);
      if (userData){
        userData = JSON.parse(userData);
        if (
          inputs.id === userData.id &&
          inputs.password === userData.firstPassword
          ){
            AsyncStorage.setItem('users', JSON.stringify({...userData, loggedIn: true}));
            goToCreditCard();
        } else {
          Alert.alert('ERROR', 'Invalid Details');
        }
      } else {
        Alert.alert('ERROR', 'User not found');
      }
    },3000);
  };


  const handleOnChange = (text, input) => {

    setInputs(prevState => ({...prevState, [input]:text}));

  };

  const handleError = (errorMessage, input) => {

    setErrors(prevState => ({...prevState, [input]:errorMessage}));

  };

  function goToWelcomeScreen() {
    navigation.navigate("Welcome");
  }

  function goToCreditCard() {
    navigation.navigate("CreditCard");
  }

  return (
    <SafeAreaView style={[styles.root, {backgroundColor: activeColors.primary}]}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <View style={{paddingHorizontal:65}}>
          {/*LOGOUT BUTTON*/}
          <LogoutPower name={'power'} onPress={goToWelcomeScreen} style={{marginTop:40, marginLeft:-30, color: activeColors.tint}}/>

          {/*HEADER*/}
          <View style={styles.headerContainer}>
            <Image
              source={require('./../../assets/log.png')}
              style={styles.logpicture}
            />
            <Text style={[styles.title, {color: activeColors.tint}]} >{t('logInTexts.BankLogin')}</Text>
          </View>

          {/*Entry Field*/}

          <View>

            <LoginContainer iconName="person-outline" error={errors.id} onFocus={() => {handleError(null, 'id')}} placeholderTextColor="grey" colo placeholder={t('logInPlaceholder.ID')} keyboardType="numeric" id maxLength={11} onChangeText={text => handleOnChange(text, 'id')} color={activeColors.tint}/>

          </View>

          <View>

            <LoginContainer iconName="md-lock-closed-outline" error={errors.password} onFocus={() => {handleError(null, 'password')}} placeholderTextColor="grey" placeholder={t('logInPlaceholder.Password')} password onChangeText={text => handleOnChange(text, 'password')} color={activeColors.tint}/>

            <TouchableOpacity>
              <Text style={{color: '#0065ff', marginRight: 10, marginBottom:10}}>{t('logInTexts.Forgot')}</Text>
            </TouchableOpacity>

          </View>

          {/*Button Action*/}

          <View>
            <Text style={[styles.textCenter, {color: activeColors.tint}]}>{t('logInTexts.LoginWith')}</Text>
          </View>

          <View style={styles.pngRow}>

            <TouchableOpacity style={styles.pngButton}>
              <MaterialCommunityIcons name="nfc" size={20} color={activeColors.tint} style={{marginRight: 5}} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.pngButton}>
            <MaterialCommunityIcons name="face-recognition" size={20} color={activeColors.tint} style={{marginRight: 5}} />
            </TouchableOpacity>

          </View>
          <View>
          {
            loading
            ? <ActivityIndicator size="large"/>

              :  <TouchableOpacity onPress={validate} style={styles.touchableButton}>
                  <Text style={styles.touchableText}>{t('logInButton.LogIn')}</Text>
                </TouchableOpacity>
          }
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection:'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>

            <Text style={{textAlign:'center', color:activeColors.tint, marginBottom:20}}> {t('logInTexts.New')} </Text>

            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={{color: '#0065ff', marginLeft: 3, marginBottom:20}}>{t('logInTexts.RegisterNavigate')}</Text>
            </TouchableOpacity>

          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({

  root: {
    flex: 1,
    justifyContent: 'center',
  },

  headerContainer: {
    alignItems: 'center',
    flexDirection:'column',
  },

  logpicture:{
    width: 150,
    height: 150,
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '500',
    marginBottom: 30,
    textAlign: 'center',
  },

  inputContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 10,
  },

  input:{
    flex: 1,
  },

  touchableButton: {
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 5,
    padding: 20,
    backgroundColor: '#0065ff',
  },

  touchableText:{
    textAlign: 'center',
    fontWeight: 700,
    fontSize: 16,
    color: '#fff',
  },

  textCenter:{
    textAlign: 'center',
    fontWeight: 700,
    fontSize: 16,
  },

  pngRow:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },

  pngButton:{
    borderColor:'#ddd',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  pngPicture:{
    width:24,
    height:24,
  },
});

export default LoginScreen;
