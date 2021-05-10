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

  //  DATA

  useEffect(() => {
    let obj = [];
    const user = auth().currentUser.uid;
    console.log(user);
    database()
      .ref('/users/' + user)
      .once('value')
      .then(snapshot => {
        let data = snapshot.val();
        setHaveCar(data.car);
        obj.push(data.info);
        const [item] = obj;
        console.log(item); //salida correcta
        setInfo(item);
        console.log(info); // undefined
      });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let obj = [];
      const user = auth().currentUser.uid;
      console.log(user);
      database()
        .ref('/users/' + user)
        .once('value')
        .then(snapshot => {
          let data = snapshot.val();
          setHaveCar(data.car);
          obj.push(data.info);
          const [item] = obj;
          console.log(item); //salida correcta
          setInfo(item);
          console.log(info); // undefined
        });
    }, []),
  );

  ////////////////////////////////////////////////

  const goToAddCar = () => {
    navigation.navigate('AddCard', {
      changeState: setHaveCar,
    });
  };

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
    if (info) {
      return (
        <View style={styles.containerTrue}>
          <Text>ESTOS SON LOS DATOS DE MI COCHE</Text>
          <Text>------------------------------</Text>
          <Text>{info.car}</Text>
          <Text>{info.model}</Text>
          <Text>{info.time}</Text>
          <Text>{info.number}</Text>
          <Text>{info.oil}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.containerTrue}>
          <Text>Cargando...</Text>
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
