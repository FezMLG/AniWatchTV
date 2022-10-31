import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { SearchPageProps, RoutesNames } from '../../routes/main';

const SearchScreen = ({ navigation }: SearchPageProps) => {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={[styles.container]}>
      <TextInput
        label="Search"
        mode="outlined"
        value={search}
        onChangeText={text => setSearch(text)}
      />
      <Button
        mode={'contained'}
        onPress={() =>
          navigation.navigate(RoutesNames.SearchResults, {
            phrase: search,
          })
        }>
        Search
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SearchScreen;
