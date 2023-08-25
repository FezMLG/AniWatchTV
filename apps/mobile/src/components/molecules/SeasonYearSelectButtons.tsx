import React, { useState } from 'react';

import { Pressable, StyleSheet, View } from 'react-native';
import {
  Button,
  Dialog,
  Menu,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTranslate } from '../../i18n/useTranslate';
import { colors } from '../../styles';
import { AnimeSeasons, IAnimeSeasons } from '../../utils';

export function SeasonYearSelectButtons({
  season,
  setSeason,
  year,
  setYear,
}: {
  season: IAnimeSeasons;
  setSeason: (season: IAnimeSeasons) => void;
  year: number;
  setYear: (year: number) => void;
}): JSX.Element {
  const { translate } = useTranslate();
  const [yearDialogVisible, setYearDialogVisible] = useState(false);
  const showDialog = () => setYearDialogVisible(true);
  const hideDialog = () => setYearDialogVisible(false);
  const [newYear, setNewYear] = React.useState(year.toString());
  const [seasonMenuVisible, setSeasonMenuVisible] = React.useState(false);
  const openMenu = () => setSeasonMenuVisible(true);
  const closeMenu = () => setSeasonMenuVisible(false);
  const handleSeasonChange = (s: IAnimeSeasons) => {
    setSeason(s);
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={showDialog} style={styles.buttonContainer}>
        <Icon
          color="#ffffff"
          name="calendar-month"
          size={24}
          style={{ marginRight: 20 }}
        />
        <Text style={{ fontSize: 16 }}>{year}</Text>
      </Pressable>
      <Portal>
        <Dialog onDismiss={hideDialog} visible={yearDialogVisible}>
          <Dialog.Title>Type year</Dialog.Title>
          <TextInput
            keyboardType="number-pad"
            label="Year"
            onChangeText={text => setNewYear(text)}
            value={newYear}
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
        anchor={
          <Pressable onPress={openMenu} style={styles.buttonContainer}>
            <Icon
              color="#ffffff"
              name={season.icon}
              size={24}
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontSize: 16 }}>{translate(season.titleKey)}</Text>
            <Icon
              color="#ffffff"
              name={seasonMenuVisible ? 'chevron-up' : 'chevron-down'}
              size={24}
              style={{ marginLeft: 20 }}
            />
          </Pressable>
        }
        anchorPosition="bottom"
        onDismiss={closeMenu}
        visible={seasonMenuVisible}>
        {Object.entries(AnimeSeasons).map(([_, value], index) => (
          <Menu.Item
            key={index}
            leadingIcon={value.icon}
            onPress={() => handleSeasonChange(value)}
            title={translate(value.titleKey)}
            titleStyle={
              season.value === value.value ? colors.accent : colors.textLight
            }
          />
        ))}
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: '#ffffff',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
