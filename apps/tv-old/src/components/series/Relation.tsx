import React, { useState } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslate } from '../../i18n/useTranslate';
import { Relation } from '@aniwatch/shared';
import { darkColor } from '../../styles/darkMode.style';
import { defaultRadius } from '../../styles/global.style';

import { ProgressiveImage } from '../ProgressiveImage';

export const AnimeRelation = ({
  relation,
  handleNavigation,
}: {
  relation: Relation;
  handleNavigation: ((event: GestureResponderEvent) => void) | null | undefined;
}) => {
  const { translate } = useTranslate();
  const [focus, setFocus] = useState(false);

  return (
    <Pressable
      style={[styles.container, focus ? styles.containerFocus : null]}
      onPress={handleNavigation}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}>
      <View style={[styles.containerInside]}>
        <ProgressiveImage
          source={relation.coverImage.medium}
          style={[styles.poster]}
        />
        <View style={styles.details}>
          <View style={[styles.flexColumn, styles.marginTop]}>
            <Text variant="bodySmall" style={[styles.textCapitalize]}>
              {translate(
                'anime_details.relations_list.' + relation.relationType,
              )}
            </Text>
            <Text variant="titleMedium" style={styles.title} numberOfLines={3}>
              {relation.title.romaji}
            </Text>
          </View>
          <View style={[styles.flexRow, styles.marginBottom]}>
            <Text variant="bodyMedium" style={styles.textCapitalize}>
              {relation.format}
            </Text>
            <Text> · </Text>
            <Text variant="bodyMedium" style={styles.textCapitalize}>
              {relation.status}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 300,
    height: 115,
    borderRadius: defaultRadius,
    backgroundColor: darkColor.C800,
    marginTop: 10,
    marginLeft: 20,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  containerFocus: {
    backgroundColor: '#CC8899',
  },
  containerInside: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: darkColor.C800,
    borderRadius: defaultRadius,
  },
  title: {
    width: 185,
  },
  poster: {
    maxHeight: 115,
    width: 90,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    resizeMode: 'cover',
  },
  details: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexRow: {
    flexDirection: 'row',
  },
  marginTop: {
    marginLeft: 10,
    marginTop: 5,
  },
  marginBottom: {
    marginLeft: 10,
    marginBottom: 5,
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
});
