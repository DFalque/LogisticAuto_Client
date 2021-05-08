import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Home = () => {
  const [haveCar, setHaveCar] = useState(false);

  function carFalse() {
    return (
      <View style={styles.containerFalse}>
        <View>
          <Text>Bienvenido </Text>
        </View>
      </View>
    );
  }

  function carTrue() {
    return (
      <View>
        <Text> Tiene coche</Text>
      </View>
    );
  }

  return haveCar ? carTrue() : carFalse();
};

export default Home;

const styles = StyleSheet.create({
  containerFalse: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
