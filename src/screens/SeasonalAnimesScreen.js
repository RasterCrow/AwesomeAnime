import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Button,
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AnilistService from '../services/anilist';
import { Colors } from '../defaults';

function Item({ id, title, image }) {
  return (
    <>
      <TouchableOpacity style={styles.container}>
        <Image source={{ uri: image }} style={styles.itemImg} />
        <View
          style={{
            backgroundColor: 'black',
            marginTop: -30,
            height: 50,
            justifyContent: 'center',
          }}>
          <Text style={{ textAlign: 'center', color: Colors.white }}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const SeasonalAnimesScreen = () => {
  const navigation = useNavigation();
  const [animeList, setAnimeList] = useState([]);
  const [loadedImages, setLoadedImages] = useState(false);

  const hook = () => {
    AnilistService.getAnimeList().then((data) => {
      console.log('Loaded anime list');
      setAnimeList([].concat(data));
      setLoadedImages(true);
    });
  };
  useEffect(hook, []);

  //const navigation = useNavigation();
  return (
    <View style={styles.page}>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row-reverse',
        }}>
        <Button
          color={Colors.red}
          onPress={() => navigation.navigate('Home')}
          title="Home"
          style={{
            width: 50,
            height: 50,
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            flex: 1,
            textAlignVertical: 'center',
            fontSize: 30,
          }}>
          Anime List
        </Text>
      </View>
      <SafeAreaView style={{ flex: 6, marginBottom: 50, marginTop: 20 }}>
        <FlatList
          data={animeList}
          renderItem={({ item }) => (
            <Item title={item.title.english} image={item.coverImage.large} />
          )}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
      {!loadedImages ? (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            flex: 1,
            alignItems: 'center',
          }}>
          <Image
            source={require('../images/loading.gif')}
            style={{
              flex: 1,
              height: 100,
              width: 100,
              justifyContent: 'center',
            }}
            resizeMode="contain"
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'rgb(145, 67, 204)',
    width: '100%',
    height: '100%',
  },
  itemImg: {
    borderRadius: 10,
    flex: 2,
  },
  itemText: {
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  container: {
    height: 200,
    width: 120,
    margin: '5%',
    flex: 1,
  },
});

export default SeasonalAnimesScreen;
