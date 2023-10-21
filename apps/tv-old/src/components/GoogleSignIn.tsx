import React, { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Image, Pressable, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

import { fireGetUser } from '../services/firebase/fire-auth.service';
import { useAppDispatch } from '../services/store/store';
import { ActivityIndicator, Text } from 'react-native-paper';
import { defaultRadius } from '../styles/global.style';

GoogleSignin.configure({
  webClientId:
    '235555521653-u912a0ccok2j0kmbpv11i4jlpfu29obf.apps.googleusercontent.com',
});

const onGoogleButtonPress = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.error(error);
  }
};

const GoogleSignIn = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Pressable
      style={styles.googleLogin}
      onPressIn={() => setIsLoading(true)}
      onPress={() => onGoogleButtonPress().then(() => dispatch(fireGetUser()))}>
      <Image
        style={styles.gLogo}
        source={require('../../assets/google_g_logo.png')}
      />
      <Text variant="titleSmall">Google</Text>
      {isLoading && (
        <ActivityIndicator style={styles.marginLeft} size={'small'} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  gLogo: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  googleLogin: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'pink',
    borderWidth: 1,
    borderRadius: defaultRadius,
    width: '100%',
    maxWidth: 400,
  },
  marginLeft: {
    marginLeft: 10,
  },
});

export default GoogleSignIn;
