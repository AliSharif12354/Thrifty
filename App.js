import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BootUp from './screens/BootUp';
import BusinessSignUp from './screens/BusinessSignUp';
import BusinessSignIn from './screens/BusinessSignIn';
import SignInChoice from './screens/SignInChoice';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BootUp" headerMode="none">
        <Stack.Screen name="BootUp" component={BootUp} />
        <Stack.Screen name="SignInChoice" component={SignInChoice} />
        <Stack.Screen name="BusinessSignUp" component={BusinessSignUp} />
        <Stack.Screen name="BusinessSignIn" component={BusinessSignIn} />
        {/* Add more screens here as your app evolves */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;