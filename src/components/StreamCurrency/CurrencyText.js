import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useState, useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../DarkMode/colors';
import { ThemeContext } from '../contexts/ThemeContext';

const CurrencyText = ({title, rates, onAddToWatchlist}) => {

    const {theme} = useContext(ThemeContext);
    let activeColors = colors[theme.mode];

    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [favorite, setFavorite] = useState();
    const [reverse, setReverse] = useState(false);


    function favoriteCurrency(isFavoriteSelected) {
      setFavorite(!favorite);
      onAddToWatchlist(title);
    }; 



  return (
    <TouchableOpacity>
      <View style={[styles.item, {backgroundColor: activeColors.secondary}]}>
          <Text style={[styles.name, {color: activeColors.tint}]}>{title}</Text>
          <Text style={[styles.name, {color: activeColors.tint}]}>{rates}</Text>
          <Ionicons iconName="star-outline" name={favorite ? "star-sharp" :  "star-outline"} onPress={() => favoriteCurrency()}  size={50} color='#666' style={{marginRight: 5}} />
      </View>
    </TouchableOpacity>
  )
}

export default CurrencyText;

const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        borderWidth: 2,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      name: {
        fontSize: 32,
        color: 'black',
      },
});