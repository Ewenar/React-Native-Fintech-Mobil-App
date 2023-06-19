import { View, Text, StyleSheet, SafeAreaView, Switch, TouchableOpacity, Image, FlatList } from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import {colors} from '../DarkMode/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { requestCameraPermission, requestExternalWritePermission} from '../utils/UserPermission';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserList from '../UserInformation/UserList';
import '../../../languages/i18n';
import { useTranslation } from 'react-i18next';


const Profile = ({navigation}) => {

    const {t, i18n} = useTranslation();

    const {theme, updateTheme} = useContext(ThemeContext);
    let activeColors = colors[theme.mode];

    const [isActive, setIsActive] = useState(theme.mode === 'dark');
    const [filePath, setFilePath] = useState();
    const [inputs, setInputs] = useState({name:'', id:'', date:'', email:'', firstPassword:'', secondPassword:''});


    const handleSwitch = () => {
        updateTheme();
        setIsActive((previousState) => !previousState);
    };

    const handleAvatar =  () => {
        requestCameraPermission();
        requestExternalWritePermission();

            let options = {
              mediaType: 'photo',
              maxWidth: 300,
              maxHeight: 550,
              quality: 1,
            };


            launchImageLibrary(options, (response) => {
              console.log('Response = ', response);

              setOther(response.assets[0].uri);

              if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
              } else if (response.errorCode === 'camera_unavailable') {
                alert('Camera not available on device');
                return;
              } else if (response.errorCode === 'permission') {
                alert('Permission not satisfied');
                return;
              } else if (response.errorCode === 'others') {
                alert(response.errorMessage);
                return;
              }
              setFilePath(response.assets[0].uri);
              console.log(String(filePath));
            });
    };

        //Firebase

        useEffect(() => {
            database()
            .ref('/avatar/photo')
            .on('value', snapshot => {
                const adress = snapshot.val();
                setFilePath(adress);
            });

            retrieveData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]);

        const setOther = (item) => {
            const reference = database().ref('avatar/');
            reference.set({
                photo: item,
            });
        };

        //AsyncStorage

        const retrieveData = async () => {

              const value = await AsyncStorage.getItem('users');
              if (value !== null) {
                setInputs(JSON.parse(value));
                console.log(inputs.name);
                //console.log(JSON.parse(value).name);
              }
        };


  return (
    <SafeAreaView style={[styles.root, {backgroundColor: activeColors.primary}]}>

        <TouchableOpacity style={[styles.profilePhoto, {backgroundColor: activeColors.secondary}]} onPress={handleAvatar}>
            {filePath && <Image style={styles.avatar} source={{uri: String(filePath)}} />}
        </TouchableOpacity>

        <View style={styles.profileTitleContainer}>
            <Text style={[styles.profileTitleText, {color: activeColors.accent}]}>{t('profileTitle.Information')}</Text>
        </View>

        <View>
            <UserList operation={inputs}/>
        </View>

        <View style={styles.profileTitleContainer}>
            <Text style={[styles.profileTitleText, {color: activeColors.accent}]}>{t('profileTitle.Theme')}</Text>
        </View>

        <View style={[styles.darkModeContainer, {backgroundColor: activeColors.secondary}]}>
            <Text style={[styles.darkModeText, {color: activeColors.tint}]}>{t('profileDarkMode.DarkMode')}</Text>
            <Switch value={isActive} onValueChange={handleSwitch} thumbColor={isActive ? activeColors.accent : activeColors.tertiary} trackColor={{false: activeColors.primary, true: activeColors.tertiary}}/>
        </View>

    </SafeAreaView>
  );
};

export default Profile

const styles = StyleSheet.create({

    root: {
        flex: 1,
    },

    profilePhoto: {
        width: 88,
        height: 88,
        borderRadius: 88 / 2,
        marginHorizontal: 20,
        marginTop: 20,
    },

    profileTitleContainer: {
        padding: 15,
        marginTop: 15,
        marginHorizontal: 7,
    },

    profileTitleText: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    darkModeContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 50,
        padding: 20,
        marginTop: 10,
        marginHorizontal: 20,
        flexDirection: 'row',
    },

    darkModeText: {
        paddingLeft: 10,
    },

    avatar: {
        width: 88,
        height: 88,
        position: 'absolute',
        borderRadius: 88 / 2,
    },
});

