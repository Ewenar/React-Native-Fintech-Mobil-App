import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const LoginButton = ({onPress, containerName, style}) => {

  return (
    <View>
        <TouchableOpacity onPress={onPress} style={styles.touchableButton}>
            <Text style={styles.touchableText}>{containerName}</Text>
        </TouchableOpacity>
    </View>
  );
};

export default LoginButton

const styles = StyleSheet.create({

    touchableButton: {
        marginTop: 50,
        marginBottom: 5,
        borderRadius: 50,
        padding: 15,
        backgroundColor: '#0065ff',
    },

    touchableText: {
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 24,
        color: '#fff',
    },

});