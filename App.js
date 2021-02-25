import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AnimeListScreen from './src/screens/AnimeListScreen';
import SeasonalAnimesScreen from './src/screens/SeasonalAnimesScreen';
import AccountSetupScreen from './src/screens/AccountSetup/AccountSetupScreen';
import LoginScreen from './src/screens/AccountSetup/LoginScreen';
import SignupScreen from './src/screens/AccountSetup/SignupScreen';
import AnimeInfoScreen from './src/screens/AnimeInfoScreen';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache({
    typePolicies: {
      Page: {
        fields: {
          media: {
            merge: false,
          },
        },
      },
    },
  }),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator headerMode="none">
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{title: 'My home'}}
              />
              <Stack.Screen
                name="AccountSetup"
                component={AccountSetupScreen}
                options={{title: 'Account'}}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{title: 'Login'}}
              />
              <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{title: 'Signup'}}
              />
              <Stack.Screen
                name="AnimeList"
                component={AnimeListScreen}
                options={{title: 'Popular Anime'}}
              />
              <Stack.Screen
                name="SingleAnimeInfo"
                component={AnimeInfoScreen}
              />
              <Stack.Screen
                name="SeasonalAnimeList"
                component={SeasonalAnimesScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ApplicationProvider>
    </ApolloProvider>
  );
};

export default App;
