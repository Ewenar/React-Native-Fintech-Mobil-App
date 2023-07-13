import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import io from 'socket.io-client';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useWebSocket from 'react-use-websocket';
import CurrencyText from './CurrencyText';
import {colors} from '../DarkMode/colors';
import { ThemeContext } from '../contexts/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../redux/actions/Actions';


const LiveStreamCurrency = () => {

  const dispatch = useDispatch();

  const items = useSelector(state => state);
  //console.log(items[0]);

  const {theme} = useContext(ThemeContext);
	let activeColors = colors[theme.mode];

  const [data, setData] = useState('');
  const [key, setKey] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [favorite, setFavorite] = useState();
  const [price, setPrice] = useState('');
  const [id, setId] = useState('');
  const [last, setLast] = useState('');

  const [ups, setUps] = useState('');
  const [eur, setEUR] = useState('');
  const [usd, setUSD] = useState('');
  const [cad, setCAD] = useState('');
  const [gbp, setGBP] = useState('');
  const [jpy, setJPY] = useState('');
  const [nok, setNOK] = useState('');
  const [tl, setTRY] = useState('');
  const [sek, setSEK] = useState('');
  const [chf, setCHF] = useState('');
  const [sar, setSAR] = useState('');
  const [dkk, setDKK] = useState('');

  const subscription = { event: "subscribe", stocks: ['AUD', 'EUR', 'USD', 'CAD', 'GBP', 'JPY', 'NOK', 'TRY', 'SEK', 'CHF', 'SAR', 'DKK'] };

  useEffect(() => {

    const ws = new WebSocket(
      "ws://192.168.1.11:8080"
    );

    ws.onopen = () => {
      console.log("Connection Established!");
      ws.send(JSON.stringify(subscription));
    };
    let adding = 0;
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      const money = response.stocks;
      const unique = response.id;

      setId(JSON.stringify(response.id));

      console.log(JSON.parse(id).AUD.priceData[adding].price);
      setUps(JSON.parse(id).AUD.priceData[adding].price);
      setEUR(JSON.parse(id).EUR.priceData[adding].price);
      setUSD(JSON.parse(id).USD.priceData[adding].price);
      setCAD(JSON.parse(id).CAD.priceData[adding].price);
      setGBP(JSON.parse(id).GBP.priceData[adding].price);
      setJPY(JSON.parse(id).JPY.priceData[adding].price);
      setNOK(JSON.parse(id).NOK.priceData[adding].price);
      setTRY(JSON.parse(id).TRY.priceData[adding].price);
      setSEK(JSON.parse(id).SEK.priceData[adding].price);
      setCHF(JSON.parse(id).CHF.priceData[adding].price);
      setSAR(JSON.parse(id).SAR.priceData[adding].price);
      setDKK(JSON.parse(id).DKK.priceData[adding].price);


      let abc = JSON.parse(id).AUD.priceData.map((item) => {return {id: item.id, price: item.price}});
      let flatData = JSON.parse(id).AUD.priceData[adding];
      setData(flatData);
      //setKey(flatData.id);
      //setPrice(flatData.price);
      //console.log(ups);

      setLast(abc);

      if (adding >= 9){
        adding = 0;
      } else {
        adding += 1;
      }

    };
    ws.onclose = () => {
      console.log("Connection Closed!");
      //initWebsocket();
    };

    ws.onerror = () => {
      console.log("WS Error");
    };

    return () => {
      ws.close();
    };
  },[]);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <CurrencyText title={'AUD'} rates={ups} onAddToWatchlist={x => {dispatch(addToWishlist(x))}}/>
        <CurrencyText title={'EUR'} rates={eur} onAddToWatchlist={x => {dispatch(addToWishlist(x))}}/>
        <CurrencyText title={'USD'} rates={usd} onAddToWatchlist={x => {dispatch(addToWishlist(x))}}/>
        <CurrencyText title={'CAD'} rates={cad} onAddToWatchlist={x => {dispatch(addToWishlist(x))}}/>
        <CurrencyText title={'GBP'} rates={gbp} onAddToWatchlist={x => {dispatch(addToWishlist(x))}}/>
        <CurrencyText title={'JPY'} rates={jpy} onAddToWatchlist={x => {dispatch(addToWishlist(x))}}/>
        <CurrencyText title={'NOK'} rates={nok} onAddToWatchlist={x => {dispatch(addToWishlist(x))}}/>
        <CurrencyText title={'TRY'} rates={tl} onAddToWatchlist={x => {dispatch(addToWishlist(x))}}/>
        <CurrencyText title={'SEK'} rates={sek} onAddToWatchlist={x => {dispatch(addToWishlist(x))}}/>
        <CurrencyText title={'CHF'} rates={chf} onAddToWatchlist={x => {dispatch(addToWishlist(x))}}/>
        <CurrencyText title={'SAR'} rates={sar} onAddToWatchlist={x => {dispatch(addToWishlist(x))}}/>
        <CurrencyText title={'DKK'} rates={dkk} onAddToWatchlist={x => {dispatch(addToWishlist(x))}}/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
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
  price: {
    fontSize: 32,
    color: 'black',
  },
});

export default LiveStreamCurrency;