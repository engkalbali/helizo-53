import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';


export default function AuthTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FEBA17',
        tabBarInactiveTintColor: '#74512D',
        tabBarStyle: { backgroundColor: '#4E1F00' },
      }}
    >
      <Tabs.Screen
        name="login"
        options={{
          title: 'ورود',
          tabBarIcon: ({ color }) => <Feather name="key" size={24} color={color} />,
        }}/>
        <Tabs.Screen
        name="signup"
        options={{
          title: 'ثبت‌نام',
          tabBarIcon: ({ color }) => <Feather name="arrow-up-circle" size={24} color={color} />,
        }}/>
    </Tabs>
  );
}
