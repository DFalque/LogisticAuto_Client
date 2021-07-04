import React, {useState} from 'react';
import uuid from 'react-native-uuid';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
//FIREBASE
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCar = ({route, navigation}) => {
  console.log(route.params);
  const [infoCar, setInfoCar] = useState(defaultInfo());

  function defaultInfo() {
    return {
      car: '',
      model: '',
      time: '',
      number: '',
      oil: '',
    };
  }

  const changeInfo = (e, type) => {
    setInfoCar({...infoCar, [type]: e});
    console.log(infoCar);
  };

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@someCar', value);
    } catch (e) {
      // saving error
    }
  };

  const addCarData = () => {
    const user = auth().currentUser.uid;
    const carId = uuid.v4();
    database()
      .ref('/users/' + user)
      .update({
        car: true,
        info: infoCar,
        idCar: carId,
        status: {
          state: 'ok',
          notes: 'Ninguna nota',
          changes: [],
        },
      })
      .then(() => {
        storeData('false');
        console.log('Data updated.');
      });
    database()
      .ref('/cars/' + carId)
      .update({
        car: infoCar.car,
        model: infoCar.model,
        time: infoCar.time,
        number: infoCar.time,
        oil: infoCar.oil,
        owner: user,
        status: 'ok',
        history: ['Vacío'],
        notes: ['Vació'],
      })
      .then(() => {
        console.log('Data updated.');
      });
    route.params.changeState(true);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text>Vamos a crear un cochesito</Text>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder="Tipo de coche"
        placeholderTextColor="grey"
        autoCapitalize="none"
        onChangeText={e => changeInfo(e, 'car')}
      />
      <TextInput
        underlineColorAndroid="transparent"
        placeholder="Modelo"
        placeholderTextColor="grey"
        autoCapitalize="none"
        onChangeText={e => changeInfo(e, 'model')}
      />
      <TextInput
        underlineColorAndroid="transparent"
        placeholder="Años"
        placeholderTextColor="grey"
        autoCapitalize="none"
        onChangeText={e => changeInfo(e, 'time')}
      />
      <TextInput
        underlineColorAndroid="transparent"
        placeholder="Matrícula"
        placeholderTextColor="grey"
        autoCapitalize="none"
        onChangeText={e => changeInfo(e, 'number')}
      />
      <TextInput
        underlineColorAndroid="transparent"
        placeholder="Combustible"
        placeholderTextColor="grey"
        autoCapitalize="none"
        onChangeText={e => changeInfo(e, 'oil')}
      />
      <TouchableOpacity onPress={() => addCarData()}>
        <Text> Guardar </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
