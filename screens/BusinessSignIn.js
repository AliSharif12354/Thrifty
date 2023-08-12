import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AWS from 'aws-sdk';

// Configure AWS with your region and user pool ID
AWS.config.update({
  region: 'us-east-2', // Replace 'YOUR_REGION' with the appropriate region
});

const userPoolId = 'us-east-2_NvByQgbMP'; // Replace 'YOUR_USER_POOL_ID' with the actual user pool ID
const appClientId = '7rgs1le23q30a11d5bv4a1qdsc'; // Replace 'YOUR_APP_CLIENT_ID' with the actual app client ID
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const BusinessSignIn = ( {navigation} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navImport = useNavigation();

  const handleSignIn = () => {
    // Cognito user sign-in
    const params = {
      ClientId: appClientId,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };

    cognitoIdentityServiceProvider.initiateAuth(params, (err, data) => {
      if (err) {
        console.log('Error signing in:', err);
        setMessage('Error signing in. Please check your email and password.');
      } else {
        console.log('Sign in successful:', data);
        setMessage('Sign in successful!');
        navigation.navigate('Dashboard', { idToken: data.AuthenticationResult?.IdToken });
        // Optionally, you can redirect the user to the home screen or handle successful sign-in here
      }
    });
  };

  const handleGoBack = () => {
    navImport.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Business Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Changed background color to white
    padding: 20, // Added padding to make it visually appealing
  },
  title: {
    fontSize: 24,
    color: '#fff', // Changed title color to black
    fontFamily: 'Helvetica', // Removed marginBottom as we don't need extra spacing here
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%', // Changed width to '100%' to occupy the entire container
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    color: '#fff', // Changed input text color to black
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Centered the button text
  },
  backButton: {
    marginTop: 10,
  },
  backButtonText: {
    color: '#007AFF', // Changed back button text color to blue
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  message: {
    color: 'red', // Changed message text color to red
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center', // Centered the message text
  },
});

export default BusinessSignIn;