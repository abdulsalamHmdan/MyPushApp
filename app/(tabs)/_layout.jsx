import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import Storage from 'expo-native-storage';

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const username = Storage.getItemSync('usernames');
    
    // هل المستخدم حالياً داخل صفحات الـ (auth) مثل login؟
    const inAuthGroup = segments[0] === '(auth)';

    if (!username && !inAuthGroup) {
      // إذا لم يسجل دخول وهو ليس في صفحة اللوجن، اطرده هناك
      router.replace('/login');
    } else if (username && inAuthGroup) {
      // إذا مسجل دخول ويحاول فتح اللوجن، وجهه للرئيسية
      router.replace('/home');
    }
  }, [segments]); // يراقب المسار الحالي باستمرار

  return (
    <Stack>
      {/* <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="(tabs)/login" options={{ title: 'تسجيل الدخول' }} /> */}
      <Stack.Screen name="(tabs)/home" options={{ title: 'الرئيسية' }} />
    </Stack>
  );
}