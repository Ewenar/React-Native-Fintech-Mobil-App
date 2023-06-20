import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../contexts/ThemeContext';
import {colors} from '../DarkMode/colors';



const LogoutPower = ({name, onPress, style}) => {

  const {theme} = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <TouchableOpacity onPress={onPress}>
        <Ionicons onPress={onPress} name={name} size={30} color={activeColors.tertiary} style={style} />
    </TouchableOpacity>
  )
}

export default LogoutPower

const styles = StyleSheet.create({
    
});