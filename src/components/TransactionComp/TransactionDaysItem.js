import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwsome from 'react-native-vector-icons/FontAwesome';

const TransactionDaysItem = ({mainTitle, secondaryText, amount}) => {
  return (
    <TouchableOpacity style={styles.container}>
        <View style={styles.mainContent}>
            <AntDesign name="codepen-circle" size={30} color='#000' style={{marginRight: 15}} />

            {/*View for Text and Source of Operation*/}

            <View>
                <Text style={styles.operationTitle}>{mainTitle}</Text>
                <Text>{secondaryText}</Text>
            </View>

        </View>

        <Text style={{fontFamily: 'OpenSans-Regular' , color: "#154ee7", fontSize: 16}}>{amount} $</Text>
    </TouchableOpacity>
  )
}

export default TransactionDaysItem

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#edf1f2',
    },

    mainContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    operationTitle:{
        color: '#000',
        fontFamily: 'OpenSans-Bold',
        marginBottom: 2,
        fontWeight: 'bold',
    },
    operationSource:{},

})