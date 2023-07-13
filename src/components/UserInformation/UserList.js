import { View, Text, StyleSheet } from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import {colors} from '../DarkMode/colors';
import '../../../languages/i18n';
import { useTranslation } from 'react-i18next';


const UserList = ({operation}) => {

    // Language

    const {t, i18n} = useTranslation();

    // Theme

    const {theme} = useContext(ThemeContext);
    let activeColors = colors[theme.mode];

  return (
    <View style={[styles.profilContainer, {backgroundColor: activeColors.secondary}]}>

        {/*User Information List*/}

        <View style={styles.informationTitle}>
            <Text style={[styles.informationText, {color: activeColors.tint}]}>{t('userListTitle.IdentifyNumber')}</Text>
            <Text style={[styles.informationText, {color: activeColors.tint}]}>{operation.id}</Text>
        </View>
        <View style={styles.informationTitle}>
            <Text style={[styles.informationText, {color: activeColors.tint}]}>{t('userListTitle.Name')}</Text>
            <Text style={[styles.informationText, {color: activeColors.tint}]}>{operation.name}</Text>
        </View>
        <View style={styles.informationTitle}>
            <Text style={[styles.informationText, {color: activeColors.tint}]}>{t('userListTitle.Email')}</Text>
            <Text style={[styles.informationText, {color: activeColors.tint}]}>{operation.email}</Text>
        </View>
        <View style={styles.informationTitle}>
            <Text style={[styles.informationText, {color: activeColors.tint}]}>{t('userListTitle.Password')}</Text>
            <Text style={[styles.informationText, {color: activeColors.tint}]}>{operation.firstPassword}</Text>
        </View>
    </View>
  );
};

export default UserList

const styles = StyleSheet.create({
    profilContainer: {
        borderRadius: 25,
        flexDirection:'column',
        marginHorizontal: 20,
        marginVertical: 10,
        paddingVertical: 20,
    },

    informationTitle: {
        paddingHorizontal:20,
        paddingRight:20,
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },

    information: {

    },

    informationText: {
        fontSize: 14,
    },
});