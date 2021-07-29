import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import * as Progress from 'react-native-progress';
//import Svg, {Path} from 'react-native-svg';

function InfoCar(props) {
  console.log('Esto son los props');
  console.log(props);
  const {route} = props;
  const {params} = route;
  const {model, status} = params;
  console.log(params);
  const img = require('../../img/audi.jpg');
  const imgInfo = require('../../img/infoButton.png');
  const imgHistorial = require('../../img/historialIcon.png');
  const imgRepair = require('../../img/repairIcon.png');
  const imgChat = require('../../img/chatIcon.png');
  const imgShop = require('../../img/workshopIcon.png');
  const imgBill = require('../../img/billIcon.png');

  const statusCar = {
    ready: 'Listo',
    repairing: 'El coche está en reparación',
    observation: 'Inspeccionando',
    pieces: 'Pidiendo piezas',
    preparing: 'Preparando la entrega',
  };

  const renderBarText = () => statusCar[status];

  const handleEventCar = () => console.log('Boton Pulsado');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text style={styles.tittle}>{model}</Text>
      <View style={styles.containerImg}>
        <ImageBackground source={img} style={styles.image}></ImageBackground>
      </View>
      {status === 'ready' ? (
        <Progress.Bar
          style={{alignSelf: 'center', margin: 10}}
          color="green"
          progress={1}
          width={200}
        />
      ) : status === 'repairing' ? (
        <Progress.Bar
          style={{alignSelf: 'center', margin: 10}}
          color="blue"
          progress={0.6}
          width={200}
        />
      ) : status === 'pieces' ? (
        <Progress.Bar
          style={{alignSelf: 'center', margin: 10}}
          color="orange"
          progress={0.4}
          width={200}
        />
      ) : status === 'observation' ? (
        <Progress.Bar
          style={{alignSelf: 'center', margin: 10}}
          color="red"
          progress={0.2}
          width={200}
        />
      ) : status === 'preparing' ? (
        <Progress.Bar
          style={{alignSelf: 'center', margin: 10}}
          color="blue"
          progress={0.9}
          width={200}
        />
      ) : (
        <Text>Vacio</Text>
      )}

      <Text style={{alignSelf: 'center'}}>{renderBarText()}</Text>
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => handleEventCar()}>
          <View style={styles.icon}>
            <ImageBackground
              source={imgInfo}
              style={styles.image}></ImageBackground>
          </View>
          <Text style={{color: 'black'}}>Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => handleEventCar()}>
          <View style={styles.icon}>
            <ImageBackground
              source={imgHistorial}
              style={styles.image}></ImageBackground>
          </View>
          <Text style={{color: 'black'}}>Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => handleEventCar()}>
          <View style={styles.icon}>
            <ImageBackground
              source={imgRepair}
              style={styles.image}></ImageBackground>
          </View>
          <Text style={{color: 'black'}}>Reparación</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => handleEventCar()}>
          <View style={styles.icon}>
            <ImageBackground
              source={imgChat}
              style={styles.image}></ImageBackground>
          </View>
          <Text style={{color: 'black'}}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => handleEventCar()}>
          <View style={styles.icon}>
            <ImageBackground
              source={imgShop}
              style={styles.image}></ImageBackground>
          </View>
          <Text style={{color: 'black'}}>Talleres</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => handleEventCar()}>
          <View style={styles.icon}>
            <ImageBackground
              source={imgBill}
              style={styles.image}></ImageBackground>
          </View>
          <Text style={{color: 'black'}}>Facturas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default InfoCar;

const styles = StyleSheet.create({
  containerImg: {height: '40%'},
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  tittle: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 28,
    lineHeight: 33,
  },
  containerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    //backgroundColor: 'red',
    width: '70%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonSecondary: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 80,
    marginRight: 20,
    marginLeft: 20,
    height: 70,
    marginTop: 10,
    marginBottom: 10,
  },
  icon: {
    width: 70,
    height: 60,
    borderRadius: 10,
  },
});
