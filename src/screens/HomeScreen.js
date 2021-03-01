import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../defaults';
import { Layout, Button, Text, Spinner } from '@ui-kitten/components';
import { useQuery } from '@apollo/client';
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
        <Layout level="3" style={{ flex: 1 }}>
          {
            //Main Banner
          }
          <Layout
            level="2"
            style={{
              height: 150,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 25,
            }}>
            <Text>Welcome to anilist</Text>
          </Layout>

          {
            //Trending Anime
          }
          <Layout
            level="2"
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
              <Layout
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Spinner />
              </Layout>
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
          </Layout>

          {!loggedIn ? (
            <Layout
              level="2"
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
            </Layout>
          ) : null}

          {
            //Popular Anime
          }
          <Layout
            level="2"
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
              <Layout
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Spinner />
              </Layout>
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
          </Layout>
          {
            //Top 100
          }
          <Layout
            level="2"
            style={{
              height: 230,
              marginBottom: 25,
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <Text style={{ marginLeft: 20, marginBottom: 10 }}>Top Animes</Text>

            {topLoading ? (
              <Layout
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Spinner />
              </Layout>
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
          </Layout>
        </Layout>
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
