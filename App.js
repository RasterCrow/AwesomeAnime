import 'react-native-gesture-handler';
import * as React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AnimeListScreen from './src/screens/AnimeListScreen';
import SeasonalAnimesScreen from './src/screens/SeasonalAnimesScreen';
import AccountSetupScreen from './src/screens/AccountSetup/AccountSetupScreen';
import LoginScreen from './src/screens/AccountSetup/LoginScreen';
import SignupScreen from './src/screens/AccountSetup/SignupScreen';
import AnimeInfoScreen from './src/screens/AnimeInfoScreen';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MyTheme2 } from './src/themes';
import { useColorScheme } from 'react-native';
import { AuthProvider } from './src/services/Auth';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache({
    typePolicies: {
      Page: {
        // If one of the keyFields is an object with fields of its own, you can
        // include those nested keyFields by using a nested array of strings:
        keyFields: ['pageInfo', ['currentPage']],
      },
    },
  }),
});

function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'My home' }}
      />
      <Stack.Screen
        name="AnimeList"
        component={AnimeListScreen}
        options={{ title: 'Popular Anime' }}
      />
      <Stack.Screen name="SingleAnimeInfo" component={AnimeInfoScreen} />
      <Stack.Screen name="SeasonalAnimeList" component={SeasonalAnimesScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="AccountSetup"
        component={AccountSetupScreen}
        options={{ title: 'Account' }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: 'Signup' }}
      />
    </Stack.Navigator>
  );
}
const App = () => {
  const scheme = useColorScheme();

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'Settings') {
                    iconName = focused ? 'settings' : 'settings-outline';
                  } else if (route.name === 'Profile') {
                    iconName = focused ? 'person' : 'person-outline';
                  }
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                showLabel: false,
                style: {
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  height: 50,
                  width: '100%',
                },
              }}>
              <Tab.Screen name="Home" component={HomeStack} />
              <Tab.Screen name="Profile" component={ProfileStack} />
              {/*<Tab.Screen name="Settings" component={SettingsPage} /> */}
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
