import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../defaults';
import {Layout, View, Button} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Layout level="1" style={{flex: 1}}>
        <View
          style={{
            marginLeft: 30,
            marginRight: 30,
            marginTop: 15,
          }}>
          <Button
            color={Colors.blue1}
            onPress={() => navigation.navigate('AnimeList')}
            title="Anime List">
            Popular Anime
          </Button>
          <Button
            color={Colors.blue1}
            onPress={() => navigation.navigate('AccountSetup')}
            title="Account Setup">
            Account Setup
          </Button>
        </View>
      </Layout>
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

export default HomeScreen;
