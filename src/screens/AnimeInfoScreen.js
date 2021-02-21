import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AnilistService from '../services/anilist';
import {Colors} from '../defaults';
import {useQuery} from '@apollo/client/';
import {Layout} from '@ui-kitten/components';

const AnimeInfoScreen = ({route}) => {
  const navigation = useNavigation();
  const {itemId, title} = route.params;
  console.log(itemId);
  const {loading, error, data} = useQuery(AnilistService.GET_ANIME_INFO, {
    variables: {id: itemId},
  });

  useEffect(() => {
    navigation.setOptions({title: title});
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error...</Text>;
  console.log(data);
  console.log(data.Media.coverImage.large);
  return (
    <Layout level="1" style={{flex: 1}}>
      <Image
        style={{width: '100%', height: '40%', resizeMode: 'contain'}}
        source={{uri: data.Media.coverImage.extraLarge}}
      />
      <SafeAreaView style={{marginBottom: 50, marginTop: 20}}>
        <Text style={styles.itemText}>{data.Media.title.english}</Text>
        <Text style={styles.itemText}>{data.Media.description}</Text>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  coverImage: {},
});

export default AnimeInfoScreen;
