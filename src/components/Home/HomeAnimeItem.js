import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const HomeAnimeItem = ({id, title, image}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('SingleAnimeInfo', {
          itemId: id,
          title: title,
        });
      }}>
      <Image source={{uri: image}} style={styles.itemImg} />
      <View
        style={{
          width: 100,
          justifyContent: 'center',
          alignItems: 'center',
          height: 40,
          backgroundColor: 'white',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}>
        <Text
          maxFontSizeMultiplier={1}
          adjustsFontSizeToFit
          numberOfLines={3}
          style={styles.itemText}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemImg: {
    height: 150,
    width: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  itemText: {
    marginLeft: 3,
    marginRight: 3,
    textAlign: 'center',
  },
  container: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    textAlign: 'center',
  },
});

export default HomeAnimeItem;
