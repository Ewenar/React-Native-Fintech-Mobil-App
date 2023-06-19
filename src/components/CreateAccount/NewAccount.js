import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';
import database from '@react-native-firebase/database';
import parseAccountTypeData from '../utils/parseAccountTypeData';
import parseCurrencyTypeData from '../utils/parseCurrencyTypeData';
import {colors} from '../DarkMode/colors';


  const NewAccount = ({navigation}) => {

	const {theme} = useContext(ThemeContext);
	let activeColors = colors[theme.mode];

    const [pushAccountType, setPushAccountType] = useState('');
	const [pushCurrencyType, setPushCurrencyType] = useState('');
	const [pushBankAdress, setPushBankAdress] = useState('');
    const [isFocus, setIsFocus] = useState(false);
	const [accountTypeData, setAccountData] = useState([]);
	const [currencyTypeData, setCurrencyData] = useState([]);
	const [adressTypeData, setAdressData] = useState([]);
	const [number, setNumber] = useState(1);


	useEffect(() => {
		database()
		.ref('/accountType')
		.on('value', snapshot => {
			const accountType = snapshot.val();
			const parsedAccountType = parseAccountTypeData(accountType);
			setAccountData(parsedAccountType);
		});

		database()
		.ref('/currencyType')
		.on('value', snapshot => {
			const currencyType = snapshot.val();
			const parsedCurrencyType = parseCurrencyTypeData(currencyType);
			setCurrencyData(parsedCurrencyType);
		});

		database()
		.ref('/bankAdress')
		.on('value', snapshot => {
			const adress = snapshot.val();
			const parsedAdress = parseCurrencyTypeData(adress);
			setAdressData(parsedAdress);
		});


		const randomNumber = ((Math.floor(Math.random() * (100 - 10) + 10)).toString() + ' ' + (Math.floor(Math.random() * (10000 - 1000) + 1000)).toString()
		+ ' ' + (Math.floor(Math.random() * (10000 - 1000) + 1000)).toString() + ' ' + (Math.floor(Math.random() * (10000 - 1000) + 1000)).toString()
		+ ' ' + (Math.floor(Math.random() * (10000 - 1000) + 1000)).toString() + ' ' + (Math.floor(Math.random() * (100 - 10) + 10)).toString());
		setNumber(randomNumber);
		console.log(randomNumber);

	},[]);


	const pushCardInfo = () => {
        const reference = database().ref('creditCard/');
        reference.push({
            accountType: pushAccountType,
            currencyType: pushCurrencyType,
            bankAdress: pushBankAdress,
			iban: number,
        });
    };

	function goToLoginScreen() {
		navigation.navigate("CreditCard");
	};

	function createCreditCard () {
		pushCardInfo();
		goToLoginScreen();
	}


    return (
      <View style={[styles.container, {backgroundColor: activeColors.primary}]}>
		<View style={{padding: 20, borderRadius:15, borderWidth:2, borderColor:'black', backgroundColor: activeColors.secondary}}>
			<Dropdown
			style={[styles.dropdown, isFocus && { borderColor: 'blue'}]}
			placeholderStyle={[styles.placeholderStyle, {color: activeColors.tint}]}
			selectedTextStyle={[styles.selectedTextStyle, {color: activeColors.tint}]}
			inputSearchStyle={styles.inputSearchStyle}
			itemTextStyle={styles.itemTextStyle}
			iconStyle={styles.iconStyle}
			data={accountTypeData}
			search
			maxHeight={300}
			labelField="type"
			valueField="id"
			placeholder={!isFocus ? 'Choose Account Type' : '...'}
			searchPlaceholder="Search..."
			value={pushAccountType}
			onFocus={() => setIsFocus(true)}
			onBlur={() => setIsFocus(false)}
			onChange={item => {
				setPushAccountType(item.type);
				console.log(pushAccountType);
				setIsFocus(false);
			}}
			renderLeftIcon={() => (
				<Entypo
				style={[styles.icon, {color: activeColors.tint}]}
				color={isFocus ? 'blue' : 'black'}
				name="shield"
				size={20}
				/>
			)}
			/>

			<Dropdown
			style={[styles.dropdown, isFocus && { borderColor: 'blue'}]}
			placeholderStyle={[styles.placeholderStyle, {color: activeColors.tint}]}
			selectedTextStyle={[styles.selectedTextStyle, {color: activeColors.tint}]}
			inputSearchStyle={styles.inputSearchStyle}
			itemTextStyle={styles.itemTextStyle}
			iconStyle={styles.iconStyle}
			data={currencyTypeData}
			search
			maxHeight={300}
			labelField="name"
			valueField="id"
			placeholder={!isFocus ? 'Choose Currency Type' : '...'}
			searchPlaceholder="Search..."
			value={pushCurrencyType}
			onFocus={() => setIsFocus(true)}
			onBlur={() => setIsFocus(false)}
			onChange={item => {
				setPushCurrencyType(item.symbol);
				console.log(pushCurrencyType);
				setIsFocus(false);
			}}
			renderLeftIcon={() => (
				<Entypo
				style={[styles.icon, {color: activeColors.tint}]}
				color={isFocus ? 'blue' : 'black'}
				name="shield"
				size={20}
				/>
			)}
			/>

			<Dropdown
			style={[styles.dropdown, isFocus && { borderColor: 'blue'}]}
			placeholderStyle={[styles.placeholderStyle, {color: activeColors.tint}]}
			selectedTextStyle={[styles.selectedTextStyle, {color: activeColors.tint}]}
			inputSearchStyle={styles.inputSearchStyle}
			itemTextStyle={styles.itemTextStyle}
			iconStyle={[styles.iconStyle, {color: activeColors.tint}]}
			data={adressTypeData}
			search
			maxHeight={300}
			labelField="bankName"
			valueField="id"
			placeholder={!isFocus ? 'Choose Bank Adress' : '...'}
			searchPlaceholder="Search..."
			value={pushBankAdress}
			onFocus={() => setIsFocus(true)}
			onBlur={() => setIsFocus(false)}
			onChange={item => {
				setPushBankAdress(item.bankName);
				console.log(pushBankAdress);
				setIsFocus(false);
			}}
			renderLeftIcon={() => (
				<Entypo
				style={[styles.icon, {color: activeColors.tint}]}
				color={isFocus ? 'blue' : 'black'}
				name="shield"
				size={20}
				/>
			)}
			/>

			<TouchableOpacity style={{backgroundColor:'#0f3460', padding:20, borderRadius:15, alignItems:'center'}} onPress={createCreditCard}>
				<Text style={{color: '#fff', textTransform: 'uppercase', fontWeight: '600'}}>Create Account</Text>
			</TouchableOpacity>
		</View>
      </View>
    );
  };

  export default NewAccount;

  const styles = StyleSheet.create({
    container: {
		flex: 1,
		padding: 16,
		justifyContent: 'center',
		alignContent: 'center',
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
	  marginBottom: 10,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
		fontSize: 16,
    },
    selectedTextStyle: {
		color: 'black',
      fontSize: 16,
    },
	itemTextStyle: {
		color: 'black',
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
		color: 'black',
      height: 40,
      fontSize: 16,
    },
  });