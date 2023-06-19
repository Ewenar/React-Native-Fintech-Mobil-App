import { View, Text, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CurrencyText = ({title, rates, onAddToWatchlist}) => {

    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [favorite, setFavorite] = useState();

    if (favorite) {
        onAddToWatchlist(rates);
    };

  return (
    <View style={styles.item}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.name}>{rates}</Text>
        <Ionicons iconName="star-outline" name={favorite ? "star-sharp" :  "star-outline"} onPress={() => setFavorite(!favorite)}  size={50} color='#666' style={{marginRight: 5}} />
    </View>
  )
}

export default CurrencyText;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f6f6f6',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
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