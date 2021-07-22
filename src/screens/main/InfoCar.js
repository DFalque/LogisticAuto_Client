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
    <View styles={{flex: 1, backgroundColor: 'white'}}>
      <Text style={styles.tittle}>{model}</Text>
      <View style={styles.containerImg}>
        <ImageBackground source={img} style={styles.image}></ImageBackground>
      </View>
      <Text>Esta es la información del coche</Text>
      <Text>{brand}</Text>
      <Text>{number}</Text>
      <Text>{oil}</Text>
      <Text>{oil}</Text>
      <Text>{time}</Text>
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => handleEventCar()}>
          <Text style={{color: 'black'}}>Información</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => handleEventCar()}>
          <Text style={{color: 'black'}}>Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => handleEventCar()}>
          <Text style={{color: 'black'}}>Añadir Evento</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => handleEventCar()}>
          <Text style={{color: 'black'}}>Buscar Taller</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default InfoCar;

const styles = StyleSheet.create({
  containerImg: {height: '40%'},
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
  containerButton: {
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonSecondary: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 150,
    marginRight: 20,
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    borderStyle: 'solid',
    borderBottomColor: 'black',
    borderWidth: 2,
  },
});
