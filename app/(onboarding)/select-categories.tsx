import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { supabase } from '../../lib/supabase';

const SelectCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) {
        console.error("خطا در خواندن دسته‌ها:", error);
      } else {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  const toggleCategory = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const saveFavorites = async (userId: string) => {
    const { error } = await supabase
      .from('user_profiles')
      .update({ favorite_categories: selected })
      .eq('id', userId);

    if (error) console.error('خطا در ذخیره علایق:', error);
    else console.log('دسته‌های انتخاب‌شده ذخیره شد');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>دسته‌بندی‌های مورد علاقه‌تو انتخاب کن:</Text>
      <View style={styles.grid}>
        {categories.map((cat) => {
          const isSelected = selected.includes(cat.id);
          return (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.card,
                isSelected && { borderColor: '#FEBA17', borderWidth: 3 },
              ]}
              onPress={() => toggleCategory(cat.id)}
            >
              <Image source={{ uri: cat.icon_url }} style={styles.image} />
              <Text style={styles.label}>{cat.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {selected.length > 0 && (
        <TouchableOpacity style={styles.confirmButton} onPress={() => saveFavorites('USER_ID')}>
          <Text style={styles.confirmText}>تأیید انتخاب</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4E1F00',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  card: {
    width: 140,
    height: 160,
    backgroundColor: '#74512D',
    borderRadius: 12,
    overflow: 'hidden',
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 100,
  },
  label: {
    marginTop: 8,
    fontWeight: '600',
    color: '#FEBA17',
  },
  confirmButton: {
    backgroundColor: '#FEBA17',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 32,
    marginTop: 30,
  },
  confirmText: {
    fontWeight: 'bold',
    color: '#4E1F00',
  },
});

export default SelectCategories;
