import { Slot, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Text } from 'react-native';
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayoutWrapper() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname(); // این جایگزین window.location.pathname می‌شه

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setIsAdmin(data?.isAdmin === true);
        }
      }
      setLoading(false);
    };
    checkAdmin();
  }, [user]);

  if (loading) return null;

  if (!isAdmin && pathname.includes('add-food')) {
    return <Text style={{ padding: 20, color: 'red' }}>دسترسی غیرمجاز</Text>;
  }

  return <Drawer />;
}
