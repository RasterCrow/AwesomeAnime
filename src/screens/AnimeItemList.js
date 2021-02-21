import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function AnimeItemList({id, title, image}) {
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
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.itemText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  itemImg: {
    borderRadius: 20,
    flex: 1,
  },
  itemText: {
    fontSize: 20,
    textAlign: 'center',
  },
  container: {
    height: 100,
    flexDirection: 'row',
    margin: '5%',
    textAlign: 'center',
    backgroundColor: 'rgba(242, 242, 242, 0.5)',
  },
});

const areEqual = (prevProps, nextProps) => {
  const {isSelected} = nextProps;
  const {isSelected: prevIsSelected} = prevProps;

  /*if the props are equal, it won't update*/
  const isSelectedEqual = isSelected === prevIsSelected;

  return isSelectedEqual;
};
export default React.memo(AnimeItemList, areEqual);
