import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React from 'react';

export default function ImageButton({onPress, source, color}) {
  return (
    <Pressable onPress={onPress}>
        <Image resizeMode="contain" source={source} style={[styles.imgIcon, {tintColor: color}]}/>
    </Pressable>
  );
}

const styles = StyleSheet.create({

    imgIcon:{
        width: 20,
        height: 20,
    },
});