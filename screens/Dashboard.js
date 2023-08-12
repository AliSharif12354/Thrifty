import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import jwtDecode from 'jwt-decode';

const Dashboard = ({ route }) => {
  const idToken = route?.params?.idToken;

  // Decode the JWT to extract user information
  const decodedToken = jwtDecode(idToken);
  const userEmail = decodedToken.email;

  console.log(userEmail)

  return (
    <View style={styles.container}>
      {/* Left Sidebar */}
      <View style={styles.sidebar}>
        {/* You can add content to the sidebar here */}
      </View>

      {/* Right Content */}
      <View style={styles.content}>
        <Text style={styles.emailText}>Welcome, {userEmail}</Text>
        {/* Add more content for the right side of the screen here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    flex: 1,
    backgroundColor: '#fff', // White background for the sidebar
  },
  content: {
    flex: 7, // Adjust this value to control the width ratio of the content section
    backgroundColor: '#000', // Black background for the content section
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailText: {
    color: '#fff', // White text color for the email address
    fontSize: 20,
    marginTop: 20,
  },
});

export default Dashboard;