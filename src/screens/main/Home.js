import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
//import {useFocusEffect} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';

//FIREBASE
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Button} from 'react-native';

//COMPONENTS
import CarWindow from '../../components/CarWindow';

const Home = props => {
  const {navigation} = props;
  const [loading, setLoading] = useState(true);
  // I save the ID of the user's cars in this state
  const [listCar, setListCar] = useState([]);
  // The data of the user's cars in this state
  const [dataCar, setDataCar] = useState([]);
  const isVisible = useIsFocused();

  useEffect(() => {
    console.log();
    if (isVisible) {
      setLoading(true);
      let obj = [];
      const user = auth().currentUser.uid;
      firestore()
        .collection('Cars')
        .where('owner', '==', user)
        .get()
        .then(data => {
          let cars = [];
          data.forEach(doc => {
            cars.push({
              carId: doc.id,
              brand: doc.data().brand,
              model: doc.data().model,
              number: doc.data().number,
              oil: doc.data().oil,
              owner: doc.data().owner,
              time: doc.data().time,
              status: doc.data().status,
            });
          });
          console.log(cars);
          setDataCar(cars);
        });

      setLoading(false);
    }
  }, [isVisible]);

  ////////////////////////////////////////////////

  const goToAddCar = () => {
    navigation.navigate('AddCard');
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
      const {model, brand, carId, number, oil, time, owner} = car;
      return (
        <View style={{backgroundColor: '#fff', margin: 5, borderRadius: 10}}>
          <Text style={{margin: 5, fontSize: 16}}>CarId: {carId}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{margin: 5, fontSize: 16}}>Model: {model}</Text>
            <Text style={{margin: 5, fontSize: 16}}>Brand: {brand}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{margin: 5, fontSize: 16}}>Number: {number}</Text>
            <Text style={{margin: 5, fontSize: 16}}>Time: {time}</Text>
          </View>
        </View>
      );
    });
    return (
      <View style={styles.containerTrue}>
        <FlatList
          data={dataCar}
          horizontal={true}
          renderItem={({item}) => (
            <CarWindow item={item} navigation={navigation} />
          )}
        />
        <TouchableOpacity style={styles.button} onPress={() => goToAddCar()}>
          <Text style={{color: 'white'}}>Añadir Coche</Text>
        </TouchableOpacity>
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
        {dataCar.length === 0 ? carFalse() : carTrue()}
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
    backgroundColor: 'white',

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
});
