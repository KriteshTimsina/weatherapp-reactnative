import HomeScreen from './src/screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './src/types/types';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen';
import {useLayoutEffect, useState} from 'react';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
  useLayoutEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {showSplashScreen && (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false, presentation: 'fullScreenModal'}}
          />
        )}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
