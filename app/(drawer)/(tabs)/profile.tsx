import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';

const ProfileScreen = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    // خروج از حساب کاربری
    setUser(null);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.photoURL || 'https://placehold.co/100x100' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user?.displayName || 'کاربر مهمان'}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ویرایش پروفایل</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logout]} onPress={handleLogout}>
        <Text style={[styles.buttonText, { color: '#fff' }]}>خروج</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#FEBA17',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4E1F00',
  },
  email: {
    fontSize: 16,
    color: '#74512D',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#FEBA17',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 32,
    marginVertical: 8,
  },
  logout: {
    backgroundColor: '#4E1F00',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#4E1F00',
  },
});

export default ProfileScreen;
