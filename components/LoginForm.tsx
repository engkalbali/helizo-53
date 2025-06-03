import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { AuthContext } from '../context/AuthContext';
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase'; // مسیر دقیق‌تر

// نوع داده برای فرم
interface AuthForm {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState<AuthForm>({ email: '', password: '' });

  const handleLogin = async () => {
    try {
      
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      if (setUser) {
        setUser(userCredential.user);
      }
      router.replace('/(tabs)' as any); // برو به تب‌ها
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('خطا در ورود', error.message);
      } else {
        Alert.alert('خطا در ورود', 'خطای ناشناخته‌ای رخ داده است.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>به هلیزو خوش اومدی</Text>
      <View style={styles.form}>
        <Text style={styles.label}>ایمیل</Text>
        <TextInput
          style={styles.input}
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          placeholder="ایمیل خود را وارد کنید"
          placeholderTextColor="#74512D"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>رمز عبور</Text>
        <TextInput
          style={styles.input}
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
          placeholder="رمز عبور خود را وارد کنید"
          placeholderTextColor="#74512D"
          secureTextEntry
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
          <Text style={styles.submitButtonText}>ورود</Text>
        </TouchableOpacity>
        <Link href="./signup" style={styles.link}>
          <Text style={styles.linkText}>حساب کاربری ندارید؟ ثبت‌نام کنید</Text>
        </Link>
      </View>
    </View>
  );
};

// استایل‌ها
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FEBA17',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  form: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4E1F00',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: '#74512D',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#4E1F00',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#FEBA17',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E1F00',
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    color: '#74512D',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;