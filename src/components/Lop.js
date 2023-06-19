import { View, Text, Button } from 'react-native';
import React from 'react';
import database from '@react-native-firebase/database';



const Lop = () => {

const checkDB = () => {
    const reference = database().ref();
    reference.once('value').then(snapshot => {
        const response = snapshot.val();
        console.log(response);
    });
};

const setDB = () => {
    const reference = database().ref('user/');

    reference.set({
        name: 'tanri',
        prophet: 'isa',
    });
};

const updateDB = () => {
    const reference = database().ref('user/');

    reference.update({
        name: 'god',
    });
};

const readDB = () => {
    const reference = database().ref('users/');

    reference.once('value').then(snapshot => {
        const response = snapshot.val();
        console.log(response);
    });
};


const pushDB = () => {
    const reference = database().ref('user/');

    reference.push({
        name: 'allah',
        prophet: 'muhammed',
    });
};

  return (
    <View>
      <Button title="DB" onPress={readDB}/>
    </View>
  );
};

export default Lop