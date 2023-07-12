import { View, Text, SafeAreaView, Button, TextInput, StyleSheet, ActivityIndicator, Keyboard } from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-element-dropdown';
import database from '@react-native-firebase/database';
import parseAmount from '../utils/parseHistoric';
import {colors} from '../DarkMode/colors';
import '../../../languages/i18n';
import { useTranslation } from 'react-i18next';

const endPoint = 'https://api.frankfurter.app';

// Fetch Currency Values

const fetchCurrencyLatest = () => {
    return fetch(`${endPoint}/latest`)
        .then(response => response.json())
        .then(data => Object.keys(data.rates));
};

// Converter API

const convertCurrencyAPI = (amount, sourceCurrency, targetCurrency) => {
    return fetch(`${endPoint}/latest?amount=${amount}&from=${sourceCurrency}&to=${targetCurrency}`)
        .then(response => response.json());
};

const CurrencyExchanger = ({navigation}) => {

    // Language

    const {t, i18n} = useTranslation();

    // Theme

    const {theme} = useContext(ThemeContext);
    let activeColors = colors[theme.mode];

    // Converter Use Case

    const [currencyList, setCurrencyList] = useState([]);
    const [sourceAmount, setSourceAmount] = useState('');
    const [sourceCurrency, setSourceCurrency] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('');
    const [amountData, setAmountData] = useState();

    // Loading Use Case

    const [loading, setLoading] = useState(false);
    const [loadingConvert, setLoadingConvert] = useState(false);

    // Picker Use Case

    const [sourceOpen, setSourceOpen] = useState(false);
    const [targetOpen, setTargetOpen] = useState(false);

    // Use Effect

    useEffect(() => {
        fetchCurrencyLatest()
            .then(list => setCurrencyList(list));

        convertCurrencyAPI(1, 'USD', 'INR')
            .then(data => console.log(data));
    },[]);

    // Check Currency Function

    const checkCurrency = (amount, sourceCurrency, targetCurrency) => {
        setLoading(true);
        convertCurrencyAPI(amount, sourceCurrency, targetCurrency)
            .then(data => {
                const {rates} = data;
                console.log(String(rates[targetCurrency]));
                setTargetAmount(String(rates[targetCurrency]));
                setLoading(false);
        });
    };

    //Firebase

    useEffect(() => {
        database()
		.ref('/deposit/amount')
		.on('value', snapshot => {
			const adress = snapshot.val();
			setAmountData(adress);
		});
    },[]);

    const pushOther = () => {
        const reference = database().ref('other/');
        reference.push({
            name: targetCurrency,
            money: targetAmount,
            date: new Date().toISOString(),
        });
    };

    // Deposit Changes

    const setDB = () => {
        const reference = database().ref('deposit/');
        reference.set({
            amount: amountData - sourceAmount,
        });
    };

    // Navigation

    function goToDashboard() {
        navigation.navigate("Board");
      }

      // onPress Funciton

    function updateAmountData(amount, sourceCurrency, targetCurrency) {
        setLoadingConvert(true);
        pushOther();
        setDB();
        goToDashboard();
        setLoadingConvert(false);
    };




  return (
    <SafeAreaView style={{flex:1, justifyContent: 'center', backgroundColor: activeColors.primary}}>
        <View style={[styles.mainContainer, {backgroundColor: activeColors.secondary}]}>

            {/*EXCHANGER TABLE SECTION*/}

            <View style={{zIndex:3}}>

                <Text style={[styles.text, {color: activeColors.tint}]}>{t('currencyExchanger.SourceAmountTitle')}</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={value => setSourceAmount(value)}
                    value={sourceAmount}
                />

                <Text style={[styles.text, {color: activeColors.tint}]}>{t('currencyExchanger.SelectSourceCurrencyTitle')}</Text>
                <DropDownPicker
                    style={styles.textInput}
                    searchable={true}
                    min={10}
                    placeholder={t('currencyExchanger.SourceCurrencyPlaceholder')}
                    onChangeText={value => setSourceCurrency(value)}
                    open={sourceOpen}
                    value={sourceCurrency}
                    items={currencyList.map(currency => ({
                    label: currency,
                    value: currency,
                    }))}
                    setOpen={setSourceOpen}
                    setValue={setSourceCurrency}
                />
            </View>

            <View style={{zIndex:2}}>
                <Text style={[styles.text, {color: activeColors.tint}]}>{t('currencyExchanger.TargetAmountTitle')}</Text>
                <TextInput
                    style={styles.textInput}
                    editable = {false}
                    value={targetAmount}
                />
                <Text style={[styles.text, {color: activeColors.tint}]}>{t('currencyExchanger.SelectTargetCurrencyTitle')}</Text>
                <DropDownPicker
                    style={styles.textInput}
                    placeholder={t('currencyExchanger.SourceCurrencyPlaceholder')}
                    onChangeText={value => setTargetCurrency(value)}
                    open={targetOpen}
                    value={targetCurrency}
                    items={currencyList.map(currency => ({
                    label: currency,
                    value: currency,
                    }))}
                    setOpen={setTargetOpen}
                    setValue={setTargetCurrency}
                />
            </View>

            {/*BUTTON SECTION*/}

            <View style={{marginTop:10}}>
                {
                    loading
                        ? <ActivityIndicator color="blue" size="large"/>
                        : <Button style={{zIndex: 1}} onPress={() => checkCurrency(sourceAmount, sourceCurrency, targetCurrency)} title={t('currencyExchanger.CheckCurrencyButton')}/>
                }
            </View>

            <View style={{marginTop:20}}>
                {
                    loadingConvert
                        ? <ActivityIndicator color="blue" size="large"/>
                        : <Button style={{zIndex: 1}} onPress={updateAmountData} title={t('currencyExchanger.ConvertButton')}/>
                }
            </View>
        </View>
    </SafeAreaView>
  );
};

export default CurrencyExchanger

const styles = StyleSheet.create({

    mainContainer: {
        padding: 20,
        borderRadius: 10,
    },

    text:{
    },

    textInput: {
        marginBottom: 10,
        backgroundColor: 'lightgrey',
        color: 'black',
    },
});