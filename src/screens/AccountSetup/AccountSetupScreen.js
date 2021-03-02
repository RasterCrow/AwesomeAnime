import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../defaults';

const AccountSetupScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={styles.background}
        source={require('../../images/fmh.jpg')}>
        <View
          style={{
            marginLeft: 30,
            marginRight: 30,
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Button
            style={{ flex: 1 }}
            color={Colors.blue1}
            onPress={() => navigation.navigate('Login')}
            title="Login with Anilist"
          />
          <Button
            style={{ flex: 1 }}
            color={Colors.blue1}
            onPress={() => navigation.navigate('Signup')}
            title="Signup to Anilist"
          />
          <Button
            style={{ flex: 1 }}
            color={Colors.blue1}
            onPress={() => navigation.navigate('Home')}
            title="Skip"
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

export default AccountSetupScreen;
