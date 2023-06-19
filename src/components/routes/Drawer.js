import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import SavedList from '../CreditCard/SavedCard/SavedList';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const EnterStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={WelcomeScreen}/>
      <Stack.Screen name="Home" component={LoginScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
};

const CreditCardStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CreditCard" component={SavedCreditCard} />
      <Stack.Screen name="CreateAccount" component={NewAccount} />
    </Stack.Navigator>
  );
};

const MainPageStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Board" component={Dashboard} />
      <Stack.Screen name="CardList" component={SavedList} />
      <Stack.Screen name="Historic" component={Transaction} />
      <Stack.Screen name="LiveStream" component={LiveStreamCurrency} />
      <Stack.Screen name="Exchanger" component={CurrencyExchanger} />
    </Stack.Navigator>
  );
};

const Navigation = () => {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Cards" screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Cards" component={CreditCardStack} />
        <Drawer.Screen name="MainPage" component={MainPageStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation