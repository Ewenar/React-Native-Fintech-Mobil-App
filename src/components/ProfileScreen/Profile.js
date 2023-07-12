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
import DropDownPicker from 'react-native-dropdown-picker';
import LogoutPower from '../Login/LogoutPower';


const Profile = ({navigation}) => {

    // Language

    const {t, i18n} = useTranslation();

    //Theme

    const {theme, updateTheme} = useContext(ThemeContext);
    let activeColors = colors[theme.mode];

    //Use Cases

    const [isActive, setIsActive] = useState(theme.mode === 'dark');
    const [filePath, setFilePath] = useState();
    const [inputs, setInputs] = useState({name:'', id:'', date:'', email:'', firstPassword:'', secondPassword:''});

    // Dark Mode Switch Function

    const handleSwitch = () => {
        updateTheme();
        setIsActive((previousState) => !previousState);
    };

    // Avatar Options

    const handleAvatar =  () => {

        // Permissions
        requestCameraPermission();
        requestExternalWritePermission();

            let options = {
              mediaType: 'photo',
              maxWidth: 300,
              maxHeight: 550,
              quality: 1,
            };

            // Fetch Image

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

    // Language Switcher

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('en');
    const [items, setItems] = useState([
        {label: 'English', value: 'en'},
        {label: 'Turkish', value: 'tr'},
    ]);

    // Language Use Effect

    useEffect(() => {
        i18n.changeLanguage(value);
    }, [i18n, value]);

        //Firebase

        useEffect(() => {
            // Fetch Profile Photo Firebase
            database()
            .ref('/avatar/photo')
            .on('value', snapshot => {
                const adress = snapshot.val();
                setFilePath(adress);
            });

            retrieveData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]);

        //Set Profile Photo in Firebase 

        const setOther = (item) => {
            const reference = database().ref('avatar/');
            reference.set({
                photo: item,
            });
        };

        //Fetch Profile Photo AsyncStorage

        const retrieveData = async () => {

              const value = await AsyncStorage.getItem('users');
              if (value !== null) {
                setInputs(JSON.parse(value));
                console.log(inputs.name);
              }
        };

        // Navigation

        function goToWelcomeScreen() {
            navigation.navigate('Welcome');
        };


  return (
    <SafeAreaView style={[styles.root, {backgroundColor: activeColors.primary}]}>

        <View>

            {/*AVATAR SECTION*/}

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={[styles.profilePhoto, {backgroundColor: activeColors.secondary}]} onPress={handleAvatar}>
                    {filePath && <Image style={styles.avatar} source={{uri: String(filePath)}} />}
                </TouchableOpacity>

                {/*LOG OUT BUTTON*/}

                <LogoutPower name={'power'} onPress={goToWelcomeScreen} style={{marginTop:40, marginRight:40, color: activeColors.tint}}/>
            </View>

            {/*PROFILE INFORMATION SECTION*/}

            <View style={styles.profileTitleContainer}>
                <Text style={[styles.profileTitleText, {color: activeColors.accent}]}>{t('profileTitle.Information')}</Text>
            </View>

            <View>
                <UserList operation={inputs}/>
            </View>

            {/*THEME SECTION*/}

            <View style={styles.profileTitleContainer}>
                <Text style={[styles.profileTitleText, {color: activeColors.accent}]}>{t('profileTitle.Theme')}</Text>
            </View>

            <View style={[styles.darkModeContainer, {backgroundColor: activeColors.secondary}]}>
                <Text style={[styles.darkModeText, {color: activeColors.tint}]}>{t('profileDarkMode.DarkMode')}</Text>
                <Switch value={isActive} onValueChange={handleSwitch} thumbColor={isActive ? activeColors.accent : activeColors.tertiary} trackColor={{false: activeColors.primary, true: activeColors.tertiary}}/>
            </View>

            {/*LANGUAGE SECTION*/}

            <View style={styles.profileTitleContainer}>
                <Text style={[styles.profileTitleText, {color: activeColors.accent}]}>{t('profileDarkMode.Language')}</Text>
            </View>

            <View style={[styles.pickerContainer, {backgroundColor: activeColors.primary}]}>
                <DropDownPicker
                style={{backgroundColor: activeColors.secondary, borderColor: activeColors.primary}}
                dropDownContainerStyle={{backgroundColor: activeColors.secondary, borderColor: activeColors.primary}}
                arrowIconStyle={{tintColor: activeColors.accent}}
                textStyle={{color: activeColors.tint, paddingLeft:10}}
                dropDownDirection="BOTTOM"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />
            </View>
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

    pickerContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 50,
        padding: 10,
        marginTop: 5,
        marginHorizontal: 20,
        flexDirection: 'row',
    },

    avatar: {
        width: 88,
        height: 88,
        position: 'absolute',
        borderRadius: 88 / 2,
    },
});

