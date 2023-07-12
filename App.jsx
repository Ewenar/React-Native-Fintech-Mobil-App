import { View, Text, StyleSheet,Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from './src/components/LoginScreen'
import SignInScreen from './src/components/SignInScreen'
import Dashboard from './src/components/Dashboard'
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './src/components/routes/Navigation'
import Transaction from './src/components/Transaction'
import SavedHeader from './src/components/CreditCard/SavedCard/SavedHeader'
import SavedList from './src/components/CreditCard/SavedCard/SavedList'
import SavedCreditCard from './src/components/SavedCreditCard'
import WelcomeScreen from './src/components/WelcomeScreen'
import Lop from './src/components/Lop'
import LiveStreamCurrency from './src/components/StreamCurrency/LiveStreamCurrency'
import NewAccount from './src/components/CreateAccount/NewAccount'
import CurrencyExchanger from './src/components/CurrencyConverter/CurrencyExchanger'
import Profile from './src/components/ProfileScreen/Profile'
import { ThemeContext } from './src/components/contexts/ThemeContext'
import { storeData, getData } from './src/components/config/asyncStorage'
import { useTranslation } from 'react-i18next'
import SplashScreen from 'react-native-splash-screen'
import Currencies from './src/components/StreamCurrency/Currencies';
import store from './src/components/redux/store/Store';
import { Provider } from 'react-redux';


const App = () => {

  const [theme, setTheme] = useState({mode: "light"}); 

  const updateTheme = (newTheme) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === "dark" ? "light" : "dark";
      newTheme = {mode};
    }
    setTheme(newTheme);
    storeData("screenTheme", newTheme);
  };

  const fetchStoredTheme = async () => {
    try {
      const themeData = await getData("screenTheme");
      if (themeData) {
        updateTheme(themeData);
      }
    } catch ({message}) {
      alert(message);
    } finally {
      await setTimeout(() => SplashScreen.hide(), 1000);
    };
  };

  console.log(theme);

  useEffect(() => {
    fetchStoredTheme();
  },[]);

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{theme, updateTheme}}>
        <Navigation/>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App

const styles = StyleSheet.create({

  root: { 
    flex: 1,
  }

})
