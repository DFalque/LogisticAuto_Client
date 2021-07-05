import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

//FIREBASE
import auth from '@react-native-firebase/auth';
//import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

//const usersCollection = firestore();

const Home = props => {
  const {navigation} = props;
  const [loading, setLoading] = useState(true);
  const [listCar, setListCar] = useState([]);

  //  DATA

  useEffect(() => {
    let obj = [];
    const id = [];
    const user = auth().currentUser.uid;
    firestore()
      .collection('Users')
      .doc(user)
      .get()
      .then(snap => {
        console.log(snap);
        let data = snap._data;
        let {cars} = data;
        console.log(cars);
        setListCar(cars);
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
        <TouchableOpacity
          style={styles.addVehicule}
          onPress={() => goToAddCar()}>
          <Text style={styles.textPlus}>+</Text>
          <Text>Añadir Vehículo </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function carTrue() {
    console.log(listCar);
    if (infoCar) {
      return <View style={styles.containerTrue}></View>;
    } else {
      return (
        <View style={styles.containerTrue}>
          <Text>Cargando ...</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>Hola Ali,</Text>
        <Text style={styles.messageText}>Selecciona tu coche 👋</Text>
      </View>
      <View style={styles.carsContainer}>
        {listCar.length === 0 ? carFalse() : carTrue()}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  containerFalse: {},
  containerTrue: {
    // justifyContent: 'center',
    // alignContent: 'center',
    //  alignItems: 'center',
  },
  container: {
    flex: 1,
    // justifyContent: 'center'
  },
  messageContainer: {
    height: '25%',
    justifyContent: 'center',
  },
  messageText: {
    fontSize: 28,
    lineHeight: 33,
  },
  carsContainer: {height: '50%', justifyContent: 'center'},
  containerFalseButton: {},
  addVehicule: {
    backgroundColor: 'rgba(151,210,253,0.4)',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 200,
    marginStart: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  textPlus: {
    color: '#0066AE',
    fontSize: 42,
    lineHeight: 33,
  },
});
