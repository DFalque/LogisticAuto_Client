import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextComponent,
} from 'react-native';

const CarWindow = props => {
  const {item, navigation} = props;
  const {model, brand, carId, number, oil, time, owner, status} = item;
  const img = require('../img/audi.jpg');
  console.log(navigation);

  const goToInfoCar = () => {
    navigation.navigate('InfoCar', {
      model: model,
      brand: brand,
      carId: carId,
      number: number,
      oil: oil,
      time: time,
      owner: owner,
      status: status,
    });
  };

  return (
    <TouchableOpacity onPress={() => goToInfoCar()} style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          imageStyle={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            overflow: 'hidden',
          }}
          source={img}
          style={styles.image}></ImageBackground>
      </View>
      <View style={styles.containerInfo}>
        <View style={styles.containerInfoModel}>
          <Text style={{alignSelf: 'center'}}>{model}</Text>
        </View>
        <View style={styles.containerStatusCar}>
          <View
            style={{
              backgroundColor: '#E2E2E2',
              paddingStart: 20,
              marginStart: 10,
              paddingEnd: 20,
              borderRadius: 20,
            }}>
            <Text>{status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CarWindow;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: 300,
    height: 200,
    marginStart: 10,
    borderRadius: 10,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  imageContainer: {
    height: '50%',
    borderRadius: 50,
  },
  containerInfo: {
    flex: 1,
    marginStart: 5,
    marginTop: 5,
  },
  containerStatus: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  containerInfoModel: {height: '70%'},
  containerStatusCar: {flexDirection: 'row'},
});
