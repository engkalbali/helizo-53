import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../context/AuthContext'; // Context برای احراز هویت
import { supabase } from '../../../lib/supabase'; // فرضاً فایل supabase.ts برای ارتباط با Supabase
import { Feather } from '@expo/vector-icons'; // برای آیکون‌ها
import { DrawerActions } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

// نوع داده برای دستور پخت
type Recipe = {
  id: string;
  title: string;
  image: string;
  prepTime: string;
};

// نوع ناوبری
//type NavigationProp = DrawerNavigationProp<any>;

// کامپوننت کارت دستور پخت
const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <TouchableOpacity style={styles.card}>
    <Image source={{ uri: recipe.image }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{recipe.title}</Text>
      <Text style={styles.cardSubtitle}>{recipe.prepTime}</Text>
      <TouchableOpacity style={styles.cardButton}>
        <Text style={styles.cardButtonText}>مشاهده دستور پخت</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

// کامپوننت صفحه اصلی
const HomeScreen = () => {
  const parentNav = useNavigation();

  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { user } = useContext(AuthContext); // گرفتن اطلاعات کاربر از Context
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const toggleDrawer = () => {
  parentNav.dispatch(DrawerActions.toggleDrawer());
};

  // گرفتن دستور پخت‌ها از Supabase
  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('id, title, image_url, prep_time')
        .limit(10);
      if (error) {
        console.error('Error fetching recipes:', error);
      } else if (data) {
        setRecipes(
          data.map((item: any) => ({
            id: item.id,
            title: item.title,
            image: item.image_url,
            prepTime: item.prep_time,
          }))
        );
      }
    };
    fetchRecipes();
  }, []);

  return (
    <View style={styles.container}>
      {/* هدر */}
      <ImageBackground
        source={{ uri: 'https://buxlpvxtitehccsqaljd.supabase.co/storage/v1/object/public/food-images//backgroundvect.jpg' }} // جایگزین با تصویر دلخواه
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Feather name="menu" size={24} color="#FEBA17" />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {user ? `خوش اومدی، ${user.displayName || 'آشپز'}` : 'به هلیزو خوش اومدی!'}
        </Text>
        <Text style={styles.headerSubtitle}>لذت آشپزی رو تجربه کن</Text>
      </ImageBackground>

      {/* چالش روزانه */}
      <View style={styles.challengeSection}>
        <Text style={styles.sectionTitle}>چالش امروز</Text>
        <TouchableOpacity style={styles.challengeCard}>
          <Text style={styles.challengeText}>یه غذای ایتالیایی بپز!</Text>
          <Text style={styles.challengeSubtitle}>مثل پاستا یا پیتزا</Text>
        </TouchableOpacity>
      </View>

      {/* لیست دستور پخت‌ها */}
      <View style={styles.recipesSection}>
        <Text style={styles.sectionTitle}>دستور پخت‌های پیشنهادی</Text>
        <FlatList
          data={recipes}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recipeList}
        />
      </View>
    </View>
  );
};

// استایل‌ها
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // پس‌زمینه روشن برای کنتراست
  },
  header: {
    height: 200,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerImage: {
    opacity: 0.3,
    backgroundColor: '#4E1F00', // فیلتر قهوه‌ای تیره
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FEBA17', // زرد کهربایی
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    fontSize: 24,
    color: '#FFF',
    marginTop: 5,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  challengeSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4E1F00', // قهوه‌ای تیره
    marginBottom: 10,
  },
  challengeCard: {
    backgroundColor: '#74512D', // قهوه‌ای متوسط
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  challengeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FEBA17', // زرد کهربایی
  },
  challengeSubtitle: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 5,
  },
  recipesSection: {
    paddingHorizontal: 20,
  },
  recipeList: {
    paddingBottom: 20,
  },
  card: {
    width: 200,
    backgroundColor: '#74512D', // قهوه‌ای متوسط
    borderRadius: 10,
    marginRight: 15,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#FEBA17',
    marginVertical: 5,
  },
  cardButton: {
    backgroundColor: '#FEBA17', // زرد کهربایی
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  cardButtonText: {
    fontSize: 14,
    color: '#4E1F00', // قهوه‌ای تیره
    fontWeight: '500',
  },
});

export default HomeScreen;