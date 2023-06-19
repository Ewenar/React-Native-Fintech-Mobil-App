import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import TransactionDaysItem from './TransactionDaysItem';

const TransactionDays = ({title}) => {
  return (
    <View style={styles.dayContainer}>

      {/*Transaction Date*/}
        <View style={styles.mainTextContainer}>
            <Text style={styles.mainTitle}>{title}</Text>

        </View>
      {/*End of Date*/}

      <TransactionDaysItem mainTitle= 'Purchase' secondaryText='code-pen' amount={800}/>

    </View>
  )
}

export default TransactionDays

const styles = StyleSheet.create({

    dayContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#edf1f2',
        marginBottom: 5,
    },

    mainTextContainer: {
        marginTop: 5,
    },

    mainTitle: {
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15,
        fontFamily: 'OpenSans-Regular',
        fontSize: 16,
    },


})