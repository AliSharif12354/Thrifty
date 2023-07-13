import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BootUp = ({ onBootUpComplete }) => {
  React.useEffect(() => {
    setTimeout(() => {
      onBootUpComplete();
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>THRIFTY</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202020',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Helvetica',
  },
});

export default BootUp;