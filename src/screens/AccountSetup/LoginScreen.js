import React, { useEffect } from 'react';
import { Text, Button, ActivityIndicator, View } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  const discovery = {
    authorizationEndpoint: 'https://anilist.co/api/v2/oauth/authorize',
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri: AuthSession.makeRedirectUri({
        // For usage in bare and standalone
        native: 'anilistredirect://Home',
      }),
      clientId: process.env.REACT_NATIVE_CLIENT_ID,
      responseType: AuthSession.ResponseType.IdToken,
    },
    discovery,
  );

  useEffect(() => {
    if (response?.type == 'dismiss') console.log('Login annullato');
    else console.log('res : ', response);
  }, [response]);

  if (request == null)
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={() => promptAsync()} />
    </SafeAreaView>
  );
};

export default LoginScreen;
