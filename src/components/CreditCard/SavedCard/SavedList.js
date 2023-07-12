import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity, Button, Animated, Switch } from 'react-native';
import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import parseCreditCard from '../../utils/parseCreditCard';
import '../../../../languages/i18n';
import { useTranslation } from 'react-i18next';


const w = Dimensions.get("window").width;


export default function SavedList({onPress}) {

    // Language

    const {t, i18n} = useTranslation();

    // Use States

    const [page, setPage] = useState(0);
    const [creditCardInfo, setCreditCardInfo] = useState();

    useEffect(() => {
        //Fetch Account Information
        database()
		.ref('/creditCard')
		.on('value', snapshot => {
			const otherCurrency = snapshot.val();
            const parsedData = parseCreditCard(otherCurrency);
            setCreditCardInfo(parsedData);
		});
    },[]);

    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={onPress}>

                {/*CREDIT CARD SECTION*/}

                <View style=
                {{
                    paddingVertical: page == index ? 0 : 10,
                    overflow: 'hidden',
                }}>
                    <View style={[
                        styles.cardContainer,
                        {backgroundColor: 'purple', height: page == index ? 200 : 180},
                    ]}>

                        <Text style={styles.cardTitle}>{item.bankAdress}</Text>

                        <View style={styles.cardSerial}>
                            <Text style={styles.cardSerialTitle}>TR{item.iban}</Text>
                            <Image source={require('./../../../../assets/sim.png')} style={styles.iconSim}/>
                        </View>

                        <View style={styles.expContainer}>
                            <Text style={styles.expContainerTitle}>{t('savedList.ExpiryEnd')}</Text>
                            <Text style={[styles.expContainerTitle, styles.expContainerTitleEnd]}>15/28</Text>
                        </View>

                        <View style={styles.countryContainer}>
                            <Text style={styles.countryContainerTitle}>{item.currencyType}</Text>
                            <Image source={require('./../../../../assets/visa.png')} style={styles.iconVisa}/>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const onScroll = ({nativeEvent: {contentOffset: {x}}}) => {
        const index = Math.round(x / (w - 100));
        setPage(index);
      };

    const renderIndicators = (i) => {
        return (<TouchableOpacity style={[styles.dot, page == i && {height: 15, backgroundColor: '#705B79'}]} key={i.toString()}></TouchableOpacity>);
    };



  return (
        <View style={styles.container}>
            <FlatList
                data={creditCardInfo}
                horizontal
                snapToAlignment="center"
                decelerationRate={'fast'}
                contentContainerStyle={{paddingHorizontal: 12}}
                snapToInterval={w - 55}
                pagingEnabled
                onScroll={onScroll}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                renderItem={renderItem}
            />
            {/*<View style={styles.indicatorContainer}>
                {data.map((e,i) => renderIndicators(i))}
            </View>*/}
        </View>
  );
}

const styles = StyleSheet.create({

    container:{
        marginTop: 150,
    },

    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    dot: {
        width: 10,
        height: 10,
        backgroundColor: '#E4DFE6',
        borderRadius: 10,
        marginHorizontal: 4,
        marginTop: 20,
    },

    cardBackground:{
        position: 'absolute',
        bottom: 1,
        left: -100,
    },

    cardContainer:{
        overflow: 'hidden',
        backgroundColor: '#393839',
        padding: 20,
        width: w - 80,
        marginHorizontal: 10,
        borderRadius: 10,
        //height: 180,
        justifyContent: 'center',
        shadowColor: '#222',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,

    },

    iconSim:{
        height: 36,
        width: 36,
        marginRight: 10,
    },

    iconVisa:{
        height: 30,
        width: 60,
    },

    cardTitle:{
        color: '#fff',
        fontSize: 22,
        marginBottom: 30,
    },

    cardSerial:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    cardSerialTitle:{
        color: '#fff',
        fontWeight: '700',
        fontSize: 13,
    },

    expContainer:{
        flexDirection: 'row',
    },

    expContainerTitle: {
        color: '#fff',
    },

    expContainerTitleEnd: {
        fontWeight: '700',
        marginLeft: 30,
    },

    countryContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },

    countryContainerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
});