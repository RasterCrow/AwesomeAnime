import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  FlatList,
  View,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AnilistService from '../services/anilist';
import AnimeItemList from './AnimeItemList';
import { Colors } from '../defaults';
import { useQuery } from '@apollo/client';
import { Spinner, Button, Text, Layout } from '@ui-kitten/components';

import { SafeAreaView } from 'react-native-safe-area-context';

const AnimeListScreen = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const [animeList, setAnimeList] = useState([]);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);
  const [loadingMoreData, SetLoadingMoreData] = useState(false);

  useEffect(() => {
    console.log('check data');
    if (data != undefined && animeList.length == 0) {
      console.log('update');
      setAnimeList(data.Page.media);
    }
  }, data);

  const { loading, error, data, fetchMore } = useQuery(
    AnilistService.QUERY_POPULAR_ANIME_LIST,
    {
      variables: { page: 1, perPage: 10 },
    },
  );
  if (loading)
    return (
      <View style={styles.loading}>
        <Spinner />
      </View>
    );
  if (error) return <Text>Error...</Text>;

  return (
    <SafeAreaView>
      <Layout level="1">
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          Go Home
        </Button>
        <Layout level="1" style={{ marginBottom: 100, marginTop: 20 }}>
          {animeList.length != 0 ? (
            <FlatList
              data={animeList}
              renderItem={({ item }) => (
                <AnimeItemList
                  id={item.id}
                  title={item.title.english}
                  image={item.coverImage.large}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              onMomentumScrollBegin={() => {
                setOnEndReachedCalledDuringMomentum(false);
              }}
              onEndReached={() => {
                if (!onEndReachedCalledDuringMomentum) {
                  SetLoadingMoreData(true);
                  console.log('more');
                  fetchMore({
                    variables: {
                      page: currentPage + 1,
                    },
                  })
                    .then((result) => {
                      SetLoadingMoreData(false);
                      setAnimeList(animeList.concat(result.data.Page.media));
                      setCurrentPage(currentPage + 1);
                      setOnEndReachedCalledDuringMomentum(true);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              }}
              onEndReachedThreshold={0.5}
            />
          ) : (
            <View style={styles.loading}>
              <Spinner />
            </View>
          )}
          {loadingMoreData && (
            <View style={styles.loading}>
              <Spinner />
            </View>
          )}
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  itemImg: {
    borderRadius: 20,
    flex: 1,
  },
  itemText: {
    fontSize: 20,
    textAlign: 'center',
  },
  loading: {
    flex: 1,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {},
});

export default AnimeListScreen;
