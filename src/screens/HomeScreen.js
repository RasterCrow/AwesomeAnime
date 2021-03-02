import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  Button,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../defaults';
import { useQuery } from '@apollo/client/';
import AnilistService from '../services/anilist';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeAnimeItem from '../components/Home/HomeAnimeItem';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);
  const {
    loading: trendingLoading,
    error: trendingError,
    data: trendingAnimesData,
  } = useQuery(AnilistService.QUERY_TRENDING_ANIME_LIST, {
    variables: { page: 1, perPage: 10 },
  });
  const {
    loading: popularLoading,
    error: popularError,
    data: popularAnimesData,
  } = useQuery(AnilistService.QUERY_POPULAR_ANIME_LIST, {
    variables: { page: 1, perPage: 10 },
  });

  const {
    loading: topLoading,
    error: topError,
    data: topAnimesData,
  } = useQuery(AnilistService.QUERY_TOP_ANIME_LIST, {
    variables: { page: 1, perPage: 10 },
  });
  return (
    <SafeAreaView>
      <ScrollView style={{ marginHorizontal: 0 }}>
        <View style={{ flex: 1 }}>
          {
            //Main Banner
          }
          <View
            style={{
              height: 150,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 25,
            }}>
            <Text>Welcome to anilist</Text>
          </View>

          {
            //Trending Anime
          }
          <View
            style={{
              height: 230,
              marginBottom: 25,
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <Text style={{ marginLeft: 20, marginBottom: 10 }}>
              Trending Animes
            </Text>
            {trendingLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator />
              </View>
            ) : trendingError ? (
              <Text>Error...</Text>
            ) : (
              <FlatList
                horizontal
                data={trendingAnimesData.Page.media}
                renderItem={({ item }) => (
                  <HomeAnimeItem
                    id={item.id}
                    title={item.title.english}
                    image={item.coverImage.extraLarge}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                ListFooterComponent={
                  <Button
                    style={{ height: 100 }}
                    color={Colors.blue1}
                    onPress={() => navigation.navigate('AnimeList')}
                    title="Anime List">
                    More...
                  </Button>
                }
                ListFooterComponentStyle={{ justifyContent: 'center' }}
              />
            )}
          </View>

          {!loggedIn ? (
            <View
              style={{
                height: 80,
                justifyContent: 'center',
                alignContent: 'center',
                marginBottom: 25,
              }}>
              {
                //if not logged show special view to create account on anilist.
              }

              <Button
                color={Colors.blue1}
                style={{ width: 200, alignSelf: 'center' }}
                onPress={() => navigation.navigate('AccountSetup')}
                title="Account Setup">
                Account Setup
              </Button>
            </View>
          ) : null}

          {
            //Popular Anime
          }
          <View
            style={{
              height: 230,
              marginBottom: 25,
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <Text style={{ marginLeft: 20, marginBottom: 10 }}>
              Popular Animes
            </Text>
            {popularLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator />
              </View>
            ) : popularError ? (
              <Text>Error...</Text>
            ) : (
              <>
                <FlatList
                  horizontal
                  data={popularAnimesData.Page.media}
                  renderItem={({ item }) => (
                    <HomeAnimeItem
                      id={item.id}
                      title={item.title.english}
                      image={item.coverImage.extraLarge}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  ListFooterComponent={
                    <Button
                      style={{ height: 100 }}
                      color={Colors.blue1}
                      onPress={() => navigation.navigate('AnimeList')}
                      title="Anime List">
                      More...
                    </Button>
                  }
                  ListFooterComponentStyle={{ justifyContent: 'center' }}
                />
              </>
            )}
          </View>
          {
            //Top 100
          }
          <View
            style={{
              height: 230,
              marginBottom: 25,
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <Text style={{ marginLeft: 20, marginBottom: 10 }}>Top Animes</Text>

            {topLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator />
              </View>
            ) : topError ? (
              <Text>Error...</Text>
            ) : (
              <>
                <FlatList
                  horizontal
                  data={topAnimesData.Page.media}
                  renderItem={({ item }) => (
                    <HomeAnimeItem
                      id={item.id}
                      title={item.title.english}
                      image={item.coverImage.extraLarge}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  ListFooterComponent={
                    <Button
                      style={{ height: 100 }}
                      color={Colors.blue1}
                      onPress={() => navigation.navigate('AnimeList')}
                      title="Anime List">
                      More...
                    </Button>
                  }
                  ListFooterComponentStyle={{ justifyContent: 'center' }}
                />
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  normalView: {
    flex: 1,
    height: 150,
  },
  specialView: {
    height: 90,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
