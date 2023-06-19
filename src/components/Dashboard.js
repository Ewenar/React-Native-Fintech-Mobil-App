import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
import parseHistoric from './utils/parseHistoric';
import LastTransaction from './Historic/LastTransaction';
import Drawer from './routes/Drawer';
import {colors} from './DarkMode/colors';
import '../../languages/i18n';
import { useTranslation } from 'react-i18next';


const windowHeight = Dimensions.get('window').height;

const Dashboard = ({navigation}) => {

    const {t, i18n} = useTranslation();

    const {theme} = useContext(ThemeContext);
    let activeColors = colors[theme.mode];

    const [deposit, setDeposit] = useState();
    const [historic, setHistoric] = useState();

    function updateDeposit() {
        setDeposit(deposit - 10);
        setDB();
    };

    //NAVIGATION AREA

    function goToCurrencyExchanger() {
        navigation.navigate('Exchanger');
    };

    function goToLiveStream() {
        navigation.navigate('LiveStream');
    };

    function goToProfileScreen() {
        navigation.navigate('ProfileScreen');
    };

    //Firebase

    useEffect(() => {
        database()
		.ref('/deposit/amount')
		.on('value', snapshot => {
			const adress = snapshot.val();
			setDeposit(adress);
		});

        database()
		.ref('/other')
		.on('value', snapshot => {
			const otherCurrency = snapshot.val();
            const parsedData = parseHistoric(otherCurrency);
            setHistoric(parsedData);
		});
    },[]);

    const setDB = () => {
        const reference = database().ref('deposit/');
        reference.set({
            amount: deposit - 10,
        });
    };

    //Historic Data

    const renderHistoric = ({item}) => <LastTransaction operation = {item}/>;

  return (
    <ScrollView style={[styles.root, {backgroundColor: activeColors.primary}]}>
        <View>

            {/* HEADER */}

            <View style={styles.header}>

                {/* HEADER ITEM */}

                <View style={styles.headerItems}>

                    <TouchableOpacity style={styles.headerItems_item}>
                        <AntDesign name="wallet" size={20} color='#fff' style={{marginRight: 5}} />
                        <Text style={styles.headerItems__text}>{t('dashboard.Wallet')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.headerItems_item_inactive} onPress={() => navigation.navigate('Historic')}>
                        <AntDesign name="wallet" size={20} color='#fff' style={{marginRight: 5}} />
                        <Text style={styles.headerItems__text_unactive}>{t('dashboard.Historic')}</Text>
                    </TouchableOpacity>

                </View>

                {/* Account Amount */}

                <View style={styles.accountView}>
                    <FontAwsome name="dollar" size={30} color='#fff' style={{marginRight: 5}} />
                    <Text style={styles.accountText}>{deposit}</Text>
                </View>

            </View>

            {/* Top Action */}

                <View style={styles.topViewContainer}>
                    <View style={[styles.topCard, {backgroundColor: activeColors.secondary}]}>
                        <View style={styles.topCardRow}>
                            <TouchableOpacity style={styles.topCardRow__item} onPress={updateDeposit}>
                                <FontAwsome name="send-o" size={20} color='#0e39c8'/>
                                <Text style={[styles.topCardRow__item_text, {color: activeColors.tint}]}>{t('dashboard.DepositButton')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.topCardRow__item} onPress={goToCurrencyExchanger}>
                                <FontAwsome name="exchange" size={20} color='#0e39c8'/>
                                <Text style={[styles.topCardRow__item_text, {color: activeColors.tint}]}>{t('dashboard.ExchangerButton')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            {/* ACCOUNT */}

                <View style={styles.accountTextContainer}>
                    <Text style={[styles.accountTextContainer_text, {color: activeColors.tint}]}>{t('dashboard.Options')}</Text>
                </View>

            {/* ACCOUNT LIST */}

                <View>
                    <TouchableOpacity style={[styles.accountList_item, {backgroundColor: activeColors.secondary}]} onPress={goToLiveStream}>
                        <View style={styles.accountList_item_image_text}>
                            <View>
                                <Text style={[styles.account_word, {color: activeColors.tint}]}>{t('dashboard.LiveStreamButton')}</Text>
                            </View>
                        </View>
                        <AntDesign name="arrowright" size={20} color='#153ee7'/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.accountList_item, {backgroundColor: activeColors.secondary}]} onPress={goToProfileScreen}>
                        <View style={styles.accountList_item_image_text}>
                            <View>
                                <Text style={[styles.account_word, {color: activeColors.tint}]}>{t('dashboard.ProfileButton')}</Text>
                            </View>
                        </View>
                        <AntDesign name="arrowright" size={20} color='#153ee7'/>
                    </TouchableOpacity>
                </View>

            {/*Last Transaction*/}

            <View>
                <FlatList data={historic} renderItem={renderHistoric} scrollEnabled={false} ListHeaderComponent={<View style={[styles.accountTextContainer]}><Text style={[styles.accountTextContainer_text, {color: activeColors.tint}]}>{t('dashboard.LastTransaction')}</Text></View>} ListFooterComponent={<Text></Text>}/>
            </View>
        </View>

    </ScrollView>
  );
}

export default Dashboard

const styles = StyleSheet.create({

    root:{
        flex: 1,
        backgroundColor: '#edf1f2',
    },

    header: {
        backgroundColor: '#154ee7',
        height: windowHeight * 0.3,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingHorizontal: 20,
    },

    headerItems: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerItems_item: {
        flexDirection: 'row',
        backgroundColor: '#1d50b1',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginRight: 5,
        borderRadius: 15,
    },

    headerItems_item_inactive: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginRight: 5,
        borderRadius: 15,
    },

    headerItems__text:{
        color: '#fff',
        fontFamily: 'OpenSans-Regular',
    },

    headerItems__text_unactive:{
        color: '#eee',
        fontFamily: 'OpenSans-Regular',
    },

    accountView:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        marginTop: 30,
    },

    accountText:{
        fontSize: 29,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'OpenSans-Regular',
    },

    topViewContainer:{
        left: 0,
        right: 0,
        height: 90,
        marginTop: -45,
    },

    topCard:{
        paddingVertical: 30,
        paddingHorizontal: 30,
        marginHorizontal: 20,
        borderRadius: 5,
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },

    topCardRow:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'center',
    },

    topCardRow__item: {
        justifyContent: 'center',
        alignItems:'center',
    },
    topCardRow__item_text: {
        fontWeight: 'bold',
        fontFamily: 'OpenSans-Regular',
    },

    accountTextContainer: {
        padding: 15,
        marginTop: 15,
    },

    accountTextContainer_text: {
        fontWeight: 'bold',
        fontFamily: 'OpenSans-Regular',
    },

    accountList_item: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    accountList_item_image_text: {
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: 'bold',
    },

    account_word: {
        fontWeight: 'bold',
        fontFamily: 'OpenSans-Regular',
    },

    createAccountContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#edf1f2',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },

    createAccountContainer_icon_text: {
        borderWidth: 1,
        borderColor: '#edf1f2',
        flexDirection: 'row',
        padding: 12,
        borderRadius: 30,
        fontWeight: 'bold',
    },

    lastTransactionItem: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#edf1f2',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    lastTransactionItem_text:{
        fontWeight: 'bold',
        fontFamily: 'OpenSans-Regular',
        color: '#000',
    },
});