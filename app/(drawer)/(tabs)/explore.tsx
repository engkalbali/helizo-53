import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { supabase } from '../../../lib/supabase';

type Recipe = {
  id: string;
  title: string;
  image_url: string;
};

const ExploreScreen = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('id, title, image_url')
        .order('created_at', { ascending: false }) // اگر ستون created_at دارید
        .limit(15);

      if (error) console.error('خطا در دریافت غذاها:', error);
      else setRecipes(data);
    };

    fetchRandomRecipes();
  }, []);

  const renderItem = ({ item }: { item: Recipe }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>اکسپلور</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#4E1F00',
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#74512D',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
  },
  title: {
    padding: 10,
    fontSize: 14,
    color: '#FEBA17',
    fontWeight: '600',
  },
});

export default ExploreScreen;
