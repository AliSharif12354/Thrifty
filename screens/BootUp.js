import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BootUp = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignInChoice'); // Move to SignInChoice after delay
    }, 2000); // Adjust the delay time as needed
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MerchIt</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Helvetica',
  },
});

export default BootUp;