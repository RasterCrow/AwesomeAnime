import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AnilistService from '../services/anilist';
import { Colors } from '../defaults';
import { useQuery } from '@apollo/client/';
import GenreTag from '../components/AnimeInfo/GenreTag';
//import {LinearGradient} from 'react-native-linear-gradient';

const AnimeInfoScreen = ({ route }) => {
  const navigation = useNavigation();
  const { itemId, title } = route.params;

  const { loading, error, data } = useQuery(AnilistService.GET_ANIME_INFO, {
    variables: { id: itemId },
  });

  useEffect(() => {
    navigation.setOptions({ title: title });
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) {
    console.log(error);
    return <Text>Error...</Text>;
  }
  console.log(data);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <ScrollView style={{ marginHorizontal: 0 }}>
          {/* Background Header image */}
          <Image
            blurRadius={1}
            style={{
              position: 'absolute',
              opacity: 0.4,
              width: '100%',
              height: 210,
              resizeMode: 'cover',
              justifyContent: 'flex-start',
            }}
            source={{ uri: data.Media.coverImage.extraLarge }}
          />

          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              height: 200,
              width: '100%',
              backgroundColor: 'transparent',
              paddingTop: 25,
            }}>
            <Image
              style={{
                width: '42%',
                maxHeight: '100%',
                minHeight: '80%',
                resizeMode: 'contain',
                borderRadius: 5,
              }}
              source={{ uri: data.Media.coverImage.extraLarge }}
            />
            <View
              style={{
                flexDirection: 'column',
                height: '100%',
                width: '58%',
                backgroundColor: 'transparent',
              }}>
              <Text
                style={{
                  padding: 10,
                  fontWeight: 'bold',
                  fontSize: 17,
                }}>
                {data.Media.title.english}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  height: 10,
                  alignItems: 'center',
                  width: '100%',
                  marginLeft: 10,
                  backgroundColor: 'transparent',
                }}>
                <Text style={{}}>
                  {data.Media.seasonYear} -{' '}
                  {String(data.Media.status).charAt(0) +
                    String(data.Media.status).substring(1).toLowerCase()}
                </Text>
              </View>
            </View>
          </View>

          {/* Body */}
          <View style={{ marginTop: 30, paddingLeft: 5, paddingRight: 5 }}>
            {/* Description */}
            <Text
              style={{
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                borderColor: 'rgba(0,0,0,0.2)',
              }}>
              {/* String(data.Media.description).split('<br>')[0] */}
              {data.Media.description}
            </Text>
            {/* Tags List */}
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
                minWidth: '100%',
                height: 36,
                alignItems: 'center',
              }}>
              <ScrollView horizontal={true}>
                {data.Media.genres.map((item) => {
                  return <GenreTag key={item} genre={item} />;
                })}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  coverImage: {},
});

export default AnimeInfoScreen;
