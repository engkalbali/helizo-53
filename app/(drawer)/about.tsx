import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>درباره برنامه</Text>
      <Text style={styles.description}>
        هلیزو یک اپلیکیشن آشپزی حرفه‌ای، شخصی‌سازی‌شده و مدرن با طراحی خاص برای شماست.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff9f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4E1F00",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#74512D",
  },
});
