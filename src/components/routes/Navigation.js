import { View, Text, useColorScheme } from 'react-native';
import React from 'react';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '../DarkMode/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../LoginScreen';
import SignInScreen from '../SignInScreen';
import Dashboard from '../Dashboard';
import Transaction from '../Transaction';
import WelcomeScreen from '../WelcomeScreen';
import SavedCreditCard from '../SavedCreditCard';
import NewAccount from '../CreateAccount/NewAccount';
import LiveStreamCurrency from '../StreamCurrency/LiveStreamCurrency';
import CurrencyExchanger from '../CurrencyConverter/CurrencyExchanger';
import Profile from '../ProfileScreen/Profile';
import Watchlist from '../StreamCurrency/Watchlist';


const Stack = createNativeStackNavigator();

const Navigation = () => {

  const theme = useColorScheme();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
        <Stack.Screen name="Home" component={LoginScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="CreditCard" component={SavedCreditCard} />
        <Stack.Screen name="CreateAccount" component={NewAccount} />
        <Stack.Screen name="Board" component={Dashboard} />
        <Stack.Screen name="Historic" component={Transaction} />
        <Stack.Screen name="LiveStream" component={LiveStreamCurrency} />
        <Stack.Screen name="Exchanger" component={CurrencyExchanger} />
        <Stack.Screen name="ProfileScreen" component={Profile} />
        <Stack.Screen name="Watchlist" component={Watchlist} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation