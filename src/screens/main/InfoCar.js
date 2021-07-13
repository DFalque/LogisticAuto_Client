import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

function InfoCar(props) {
  console.log('Esto son los props');
  console.log(props);
  const {route} = props;
  const {params} = route;
  const {model, brand, carId, number, oil, time, owner} = params;
  console.log(params);
  const img = require('../../img/audi.jpg');

  return (
    <View styles={{flex: 1}}>
      <Text style={styles.tittle}>{model}</Text>
      <View style={styles.containerImg}>
        <ImageBackground source={img} style={styles.image}></ImageBackground>
      </View>
      <Text>Esta es la información del coche</Text>
      <Text>{brand}</Text>
      <Text>{number}</Text>
      <Text>{oil}</Text>
      <Text>{time}</Text>
    </View>
  );
}

export default InfoCar;

const styles = StyleSheet.create({
  containerImg: {height: '50%'},
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  tittle: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 28,
    lineHeight: 33,
  },
});
