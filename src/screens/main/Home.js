import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

//FIREBASE
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Home = props => {
  const {navigation} = props;

  const [haveCar, setHaveCar] = useState();
  const [info, setInfo] = useState('');
  const [infoCar, setInfoCar] = useState('');
  const [idCar, setIdCar] = useState('');

  //  DATA

  useEffect(() => {
    let obj = [];
    const id = [];
    const user = auth().currentUser.uid;
    database() // cojo la información del usuario
      .ref('/users/' + user)
      .once('value')
      .then(snapshot => {
        let data = snapshot.val();
        setHaveCar(data.car);
        obj.push(data.info);
        const [item] = obj;
        setInfo(item); // se guarda la  información del usuario
        id.push(data.idCar);
        let [item2] = id;
        setIdCar(item2); // se guarda el identificador del coche
      });
    const identificationCar = idCar;
    const obj2 = [];
    database() // cojo la información del vehículo
      .ref('/cars/' + identificationCar)
      .once('value')
      .then(snapshot => {
        let data = snapshot.val();
        obj2.push(data);
        let [item] = obj2;
        setInfoCar(item);
        console.log('infoCar');
        console.log(infoCar);
      });
  }, []);

  ////////////////////////////////////////////////

  const goToAddCar = () => {
    navigation.navigate('AddCard', {
      changeState: changeHaveCar,
    });
  };

  function changeHaveCar() {
    console.log('Se ha  cambiado la variable haveCar');
    setHaveCar(true);
  }

  function carFalse() {
    return (
      <View style={styles.containerFalse}>
        <Text>Bienvenido </Text>
        <View style={styles.containerFalseButton}>
          <TouchableOpacity
            style={styles.addVehicule}
            onPress={() => goToAddCar()}>
            <Text>Boton </Text>
          </TouchableOpacity>
          <Text>Añadir Vehículo </Text>
        </View>
      </View>
    );
  }

  function carTrue() {
    if (infoCar) {
      return (
        <View style={styles.containerTrue}>
          <Text>ESTOS SON LOS DATOS DE MI COCHE</Text>
          <Text>------------------------------</Text>
          <Text>{infoCar.model}</Text>
          <Text>{infoCar.status}</Text>
          <Text>{infoCar.time}</Text>
          <Text>{infoCar.model}</Text>
          <Text>{infoCar.model}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.containerTrue}>
          <Text>Cargando ...</Text>
        </View>
      );
    }
  }

  return haveCar ? carTrue() : carFalse();
};

export default Home;

const styles = StyleSheet.create({
  containerFalse: {
    flex: 1,
  },
  containerTrue: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  containerFalseButton: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  addVehicule: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});
