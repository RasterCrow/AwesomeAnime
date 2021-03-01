import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { Text, Layout } from '@ui-kitten/components';
const GenreTag = ({ genre }) => {
  return (
    <TouchableOpacity style={{ marginLeft: 5, marginRight: 5 }}>
      <Layout>
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
      </Layout>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default GenreTag;
