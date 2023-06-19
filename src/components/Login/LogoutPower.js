import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LogoutPower = ({name, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress}>
        <Ionicons name={name} size={30} color= "#666" style={style} />
    </TouchableOpacity>
  )
}

export default LogoutPower

const styles = StyleSheet.create({
    
});