import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SignInChoice = ({ navigation }) => {
  const handleBusinessSignIn = () => {                                      
    navigation.navigate('BusinessSignIn');  
  };

  const handleBusinessSignUp = () => {
    navigation.navigate('BusinessSignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose an Account Type</Text>
      <TouchableOpacity style={styles.button} onPress={handleBusinessSignIn}>
        <Text style={styles.buttonText}>Sign In as Business</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleBusinessSignUp}>
        <Text style={styles.buttonText}>Sign Up as Business</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Helvetica',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },   
});

export default SignInChoice;   