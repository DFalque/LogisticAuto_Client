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
import firestore from '@react-native-firebase/firestore';
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
    //const carId = uuid.v4();
    firestore()
      .collection('Cars')
      .add({
        owner: user,
        brand: infoCar.car,
        model: infoCar.model,
        time: infoCar.time,
        number: infoCar.number,
        oil: infoCar.oil,
      })
      .then(a => {
        let {
          _documentPath: {_parts},
        } = a;
        console.log(_parts[1]);
        const idCar = _parts[1];
        firestore()
          .collection('Users')
          .doc(user)
          .update({
            cars: firestore.FieldValue.arrayUnion(idCar),
          })
          .then(value => {
            navigation.navigate('Home');
          });
      });

    //route.params.changeState(true);
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
