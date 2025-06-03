import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AddFoodScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>افزودن غذای جدید</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>+ عکس غذا</Text>
      </TouchableOpacity>

      {/* فرم وارد کردن: عنوان، دسته‌بندی، زمان پخت، مواد اولیه، طرز تهیه (بعداً اضافه می‌کنیم) */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4E1F00',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FEBA17',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#4E1F00',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddFoodScreen;
