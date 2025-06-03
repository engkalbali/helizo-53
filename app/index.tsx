import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { router } from 'expo-router';

// اگر RootStackParamList را تعریف نکرده‌اید، آن را تعریف کنید
// type RootStackParamList = {
//   Splash: undefined;
//   Auth: undefined;
//   // سایر صفحات را اینجا اضافه کنید
// };

const SplashScreen = () => {
  
  useEffect(() => {
  const timeout = setTimeout(() => {
    return router.replace('/(auth)/login' as any);
  }, 5000);
  return () => clearTimeout(timeout);
}, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // جایگزین با لوگوی خودت
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Helizo</Text>
      <Text style={styles.subtitle}>لذت آشپزی رو تجربه کن</Text>
    </View>
  );
};

// استایل‌ها
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4E1F00', // قهوه‌ای تیره
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FEBA17', // زرد کهربایی
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 10,
  },
});

export default SplashScreen;