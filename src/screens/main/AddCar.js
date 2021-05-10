import React, {useState} from 'react';
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

  const addCarData = () => {
    const user = auth().currentUser.uid;
    database()
      .ref('/users/' + user)
      .update({
        car: true,
        info: infoCar,
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
