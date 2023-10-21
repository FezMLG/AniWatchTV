import React from 'react';
import { Animated, StyleProp } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';

export const ProgressiveImage = (props: {
  source: string;
  style: StyleProp<ImageStyle>;
}) => {
  const imageAnimated = new Animated.Value(0);

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  const { source, style } = props;

  return (
    <FastImage
      source={{
        uri: source,
        priority: FastImage.priority.normal,
      }}
      style={[style]}
      resizeMode={FastImage.resizeMode.cover}
      onLoad={onImageLoad}
    />
  );
};
