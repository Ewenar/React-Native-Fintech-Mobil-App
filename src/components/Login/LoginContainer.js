import {View, Text, Image, StyleSheet, TextInput, Touchable, TouchableOpacity, Keyboard} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginContainer = ({iconName, id, error, password, onFocus = () => {}, onPress = () => {}, ...props}) => {

    const [hide, setHide] = useState();
    const [isFocused, setIsFocused] = useState(false);

  return (
    <View >
        <View style={[styles.inputContainer, {borderColor: error ? 'red' : isFocused ? '#7978B5' : 'F3F4FB'}]}>
            <Ionicons name={iconName} size={20} color='#666' style={{marginRight: 5}} />
            <TextInput
            style={{flex: 1, color: 'black'}}
            {...props}
            secureTextEntry={hide}
            autoCorrect={false}
            onFocus={() => {
                onFocus();
                setIsFocused(true);
            }}
            onBlur={() => {
                setIsFocused(false);
            }}
            />

            {id && (
                <Ionicons iconName="eye-outline" name={hide ? "eye-outline" : "eye-off-outline"} onPress={() => setHide(!hide)}  size={20} color='#666' style={{marginRight: 5}} />
            )}

            {password && (
                <Ionicons iconName="eye-outline" name={hide ? "eye-outline" : "eye-off-outline"} onPress={() => setHide(!hide)}  size={20} color='#666' style={{marginRight: 5}} />
            )}


        </View>

        {error && (
            <Text style={{color: 'red', fontSize: 12}}>
                {error}
            </Text>
        )}

    </View>

  );
};

export default LoginContainer

const styles = StyleSheet.create({

    inputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 10,
      },

});