import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
//import {useFocusEffect} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';

//FIREBASE
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Home = props => {
  const {navigation} = props;
  const [loading, setLoading] = useState(true);
  // I save the ID of the user's cars in this state
  const [listCar, setListCar] = useState([]);
  // The data of the user's cars in this state
  const [dataCar, setDataCar] = useState([]);
  const isVisible = useIsFocused();

  useEffect(() => {
    if (isVisible) {
      setLoading(true);
      let obj = [];
      const user = auth().currentUser.uid;
      firestore()
        .collection('Users')
        .doc(user)
        .get()
        .then(snap => {
          let data = snap._data;
          let {cars} = data;
          setListCar(cars);
          console.log(listCar);
        });
      if (listCar.lenght != 0) {
        listCar.forEach(car => {
          firestore()
            .collection('Cars')
            .doc(car)
            .get()
            .then(snap => {
              let data = snap._data;
              obj.push(data);
              setDataCar(obj);
            });
        });
      }
      setLoading(false);
    }
  }, [isVisible]);

  ////////////////////////////////////////////////

  const goToAddCar = () => {
    navigation.navigate('AddCard', {
      changeState: changeHaveCar,
    });
  };

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
    const cosa = dataCar.map(car => {
      const {model, brand} = car;
      return (
        <View>
          <Text>{model}</Text>
          <Text>{brand}</Text>
        </View>
      );
    });
    return (
      <View style={styles.containerTrue}>
        <Text>The data should now appear</Text>
        {cosa}
      </View>
    );
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
