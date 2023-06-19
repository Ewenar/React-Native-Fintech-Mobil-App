import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useContext} from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {formatDistance, parseISO} from 'date-fns';
import {tr} from 'date-fns/locale';
import {colors} from '../DarkMode/colors';

const LastTransaction = ({operation}) => {

    const {theme} = useContext(ThemeContext);
    let activeColors = colors[theme.mode];

    const formattedDate = formatDistance(parseISO(operation.date), new Date(), { addSuffix: true, locale:tr});

  return (
    <View>
            <TouchableOpacity style={[styles.lastTransactionItem, {backgroundColor: activeColors.secondary}]}>
                <View>
                    <Text style={[styles.lastTransactionItem_text, {color: activeColors.tint}]}>{operation.name}</Text>
                    <Text style={{fontWeight: 'bold', color: activeColors.tint}}>{operation.money}</Text>
                    <Text style={{fontWeight: 'bold', color: activeColors.tint}}>{formattedDate}</Text>
                </View>

                <AntDesign name="arrowright" color="#154ee7" size={20}/>
            </TouchableOpacity>
    </View>
  );
};

export default LastTransaction

const styles = StyleSheet.create({

    lastTransactionItem: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    lastTransactionItem_text:{
        fontWeight: 'bold',
        fontFamily: 'OpenSans-Regular',
    },
});