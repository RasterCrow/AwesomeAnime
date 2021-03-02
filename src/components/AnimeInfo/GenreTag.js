import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

const GenreTag = ({ genre }) => {
  return (
    <TouchableOpacity style={{ marginLeft: 5, marginRight: 5 }}>
      <View>
        <Text
          style={{
            minWidth: 60,
            textAlign: 'center',
            borderWidth: 1,
            padding: 6,
            borderRadius: 10,
            borderColor: 'rgba(0,0,0,0.10)',
            backgroundColor: 'rgba(0,0,0,0.10)',
          }}>
          {String(genre).toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default GenreTag;
