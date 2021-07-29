import React, {useState} from 'react';
import uuid from 'react-native-uuid';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
//FIREBASE
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCar = ({route, navigation}) => {
  console.log(route.params);
  const [infoCar, setInfoCar] = useState(defaultInfo());
  const img = require('../../img/audi.jpg');

  function defaultInfo() {
    return {
      car: '',
      model: '',
      time: '',
      number: '',
      oil: '',
      status: '',
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
    firestore()
      .collection('Cars')
      .add({
        owner: user,
        brand: infoCar.car,
        model: infoCar.model,
        time: infoCar.time,
        number: infoCar.number,
        oil: infoCar.oil,
        status: 'ready',
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
      <View style={styles.containerImg}>
        <Text style={styles.messageText}>Añade los datos</Text>
        <Text style={styles.messageText}>de tu Vehículo 🚀</Text>
      </View>
      <View style={styles.containerInputBig}>
        <Text style={styles.level}>Seleccionar Marca</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={e => changeInfo(e, 'car')}
        />
      </View>

      <View style={styles.containerInputBig}>
        <Text style={styles.level}>Seleccionar Modelo</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={e => changeInfo(e, 'model')}
        />
      </View>

      <View style={styles.containerInputBig}>
        <Text style={styles.level}>Año</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={e => changeInfo(e, 'time')}
        />
      </View>
      <View style={styles.containerInputBig}>
        <Text style={styles.level}>Matricula</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={e => changeInfo(e, 'number')}
        />
      </View>
      <View style={styles.containerInputBig}>
        <Text style={styles.level}>Combustible</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={e => changeInfo(e, 'oil')}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => addCarData()}>
        <Text style={{color: 'white'}}> Guardar </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerImg: {
    height: '30%',
    justifyContent: 'center',
    marginStart: 10,
    // alignContent: 'center',
    // alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: 200,
    height: 50,
    borderRadius: 10,
  },
  messageText: {
    fontSize: 28,
    lineHeight: 40,
  },
  input: {
    backgroundColor: '#F2F2F2',
    width: '80%',
    borderRadius: 10,
  },
  containerInputBig: {
    marginBottom: 15,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  level: {
    alignSelf: 'flex-start',
    marginStart: 50,
  },
});
