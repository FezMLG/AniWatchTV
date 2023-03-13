import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Button,
  Dialog,
  Menu,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';

import { useTranslate } from '../../i18n/useTranslate';
import { AnimeSeasons, IAnimeSeasons } from '../../utils';

export const SeasonYearSelectButtons = ({
  season,
  setSeason,
  year,
  setYear,
}: {
  season: IAnimeSeasons;
  setSeason: (season: IAnimeSeasons) => void;
  year: number;
  setYear: (year: number) => void;
}): JSX.Element => {
  const { translate } = useTranslate();
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [newYear, setNewYear] = React.useState(year.toString());
  const [visibleM, setVisibleM] = React.useState(false);
  const openMenu = () => setVisibleM(true);
  const closeMenu = () => setVisibleM(false);
  const handleSeasonChange = (s: IAnimeSeasons) => {
    setSeason(s);
    closeMenu();
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={showDialog} style={styles.buttonContainer}>
        <Icon
          name={'calendar-month'}
          size={24}
          color="#ffffff"
          style={{ marginRight: 20 }}
        />
        <Text style={{ fontSize: 16 }}>{year}</Text>
      </Pressable>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Type year</Dialog.Title>
          <TextInput
            label="Year"
            value={newYear}
            keyboardType={'number-pad'}
            onChangeText={text => setNewYear(text)}
          />
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button
              onPress={() => {
                setYear(Number(newYear));
                hideDialog();
              }}>
              Select
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Menu
        visible={visibleM}
        onDismiss={closeMenu}
        anchorPosition={'bottom'}
        anchor={
          <Pressable onPress={openMenu} style={styles.buttonContainer}>
            <Icon
              name={season.icon}
              size={24}
              color="#ffffff"
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontSize: 16 }}>{translate(season.titleKey)}</Text>
            <Icon
              name={visibleM ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#ffffff"
              style={{ marginLeft: 20 }}
            />
          </Pressable>
        }>
        {Object.entries(AnimeSeasons).map(([_, value], index) => {
          return (
            <Menu.Item
              onPress={() => handleSeasonChange(value)}
              title={translate(value.titleKey)}
              leadingIcon={value.icon}
              key={index}
            />
          );
        })}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: '#ffffff',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
