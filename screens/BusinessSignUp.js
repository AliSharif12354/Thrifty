import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AWS from 'aws-sdk';

// Configure AWS with your region and user pool ID
AWS.config.update({
    region: 'us-east-2', // Replace 'YOUR_REGION' with 'us-east-2'
    credentials: {
        accessKeyId: 'AKIA5YB42DBX7CESQWYR',
        secretAccessKey: 'nvmr3fb7MqpZ18exzXILXh7sPIPC4luYNZhyr2pT',
    },
});

const userPoolId = 'us-east-2_NvByQgbMP'; // Replace 'YOUR_USER_POOL_ID' with the actual user pool ID
const appClientId = '7rgs1le23q30a11d5bv4a1qdsc'; // Replace 'YOUR_APP_CLIENT_ID' with the actual app client ID
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const BusinessSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navImport = useNavigation();

    const handleSignUp = () => {
        // Validate email format
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setMessage('Invalid email format');
            return;
        }

        // Validate password complexity
        if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                password
            )
        ) {
            setMessage(
                'Password must be 8 characters long, contain uppercase letters, lowercase letters, a number, and a symbol.'
            );
            return;
        }

        // Cognito user sign-up
        const params = {
            ClientId: appClientId,
            Username: email,
            Password: password,
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email,
                },
            ],
        };

        cognitoIdentityServiceProvider.signUp(params, (err, data) => {
            if (err) {
                console.log(err);
                if (
                    err.code === 'InvalidParameterException' &&
                    err.message === 'Username should be an email.'
                ) {
                    setMessage('Invalid email format');
                } else if (err.code === 'UsernameExistsException') {
                    setMessage('An account with the given email already exists.');
                } else if (err.code === 'InvalidPasswordException') {
                    setMessage(
                        'Password must be 8 characters long, contain uppercase letters, lowercase letters, a number, and a symbol.'
                    );
                } else {
                    setMessage('An error occurred during sign-up. Please try again later.');
                }
            } else {
                // Confirm the sign-up programmatically
                confirmSignUp(email);
                // Verification email will be sent by Cognito, no need to do anything here
                setMessage('Sign-up successful! Please check your email for verification.');
            }
        });
    };

    const confirmSignUp = (emailAddress) => {
        const adminParams = {
            UserPoolId: userPoolId,
            Username: email,
        };

        cognitoIdentityServiceProvider.adminConfirmSignUp(adminParams, (err, data) => {
            if (err) {
                console.log('Error confirming sign-up:', err.message);
            } else {
                console.log('Successfully confirmed sign-up:', data);
                // Optionally, you can navigate the user to the main application or any other screen
            }
        });
    };

    const handleGoBack = () => {
        navImport.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Business Sign Up</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
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
        backgroundColor: '#000',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontFamily: 'Helvetica',
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
        color: '#fff',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        paddingBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        marginTop: 10,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    message: {
        color: '#FF0000',
        fontSize: 16,
        marginTop: 10,
    },
});

export default BusinessSignUp;