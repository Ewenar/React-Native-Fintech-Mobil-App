import { View, Text, ScrollView, StyleSheet,TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import TransactionDays from './TransactionComp/TransactionDays';

const windowHeight = Dimensions.get('window').height;
const Transaction = ({navigation}) => {
  return (
    <ScrollView style={StyleSheet.root}>

        {/*HEADER*/}
        <View style={styles.header}>
            <View style={styles.headerItems}>
                <TouchableOpacity style={styles.headerItems_item_inactive} onPress={() => navigation.navigate('Board')}>
                    <AntDesign name="wallet" size={20} color='#fff' style={{marginRight: 5}} />
                    <Text style={styles.headerItems__text_unactive}>Wallet</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.headerItems_item}>
                    <AntDesign name="wallet" size={20} color='#fff' style={{marginRight: 5}} />
                    <Text style={styles.headerItems__text}>Transactions</Text>
                </TouchableOpacity>
            </View>

            {/*Account Amount*/}

            <View style={styles.accountView}>
                <Text style={styles.accountValue}>Transaction</Text>
                <View style={styles.accountValue_Icon}>
                    <FontAwsome name="dollar" size={18} color='#fff' style={{marginRight: 5}} />
                    <Text style={styles.accountValue}>2.000.000</Text>
                </View>
            </View>

            {/*End of Account Amount*/}

        </View>
        {/*END OF HEADER*/}

        {/*Daily Transaction*/}
        <TransactionDays title= "Today" />
        <TransactionDays title= "Yesterday" />
        <TransactionDays title= "8 April 2023" />

    </ScrollView>
  )
}

export default Transaction

const styles = StyleSheet.create({

    root: {
        backgroundColor: '#edf1f2',
    },

    header: {
        backgroundColor: '#154ee7',
        height: windowHeight * 0.18,
    },

    headerItems: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerItems_item:{
        flexDirection: 'row',
        backgroundColor:'#1d50b1',
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

    headerItems__text: {
        color: '#fff',
        fontFamily: 'OpenSans-Bold',
    },

    headerItems__text_unactive: {
        color: '#eee',
        fontFamily: 'OpenSans-Bold',
    },

    accountView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 18,
        paddingHorizontal: 15,
    },

    accountValue: {
        color: '#fff',
        fontFamily: 'OpenSans-Regular',
        fontSize: 18,
        marginTop: -3,
    },

    accountValue_Icon:{
        flexDirection: 'row',
        alignItems: 'center',
    },

});