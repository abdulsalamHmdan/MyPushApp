import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export default function RootLayout() {

  useEffect(() => {
    // دالة داخلية للتعامل مع الحفظ التلقائي
    async function autoSaveToken() {
      try {
        const token = await registerForPushNotificationsAsync();
        
        if (token) {
          console.log('تم جلب التوكين بنجاح:', token);
          
          // إرسال المفتاح للسيرفر تلقائياً
          const response = await fetch(`http://192.168.1.5:3000/api/savekey/${token}`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (response.ok) {
            console.log('✅ تم تحديث المفتاح في قاعدة البيانات تلقائياً');
          }
        }
      } catch (error) {
        console.error('❌ خطأ في عملية الحفظ التلقائي:', error);
      }
    }

    autoSaveToken();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

// دالة التسجيل (تأكد من وجودها أسفل الملف أو استيرادها)
export async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'web') return;

  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus === 'granted') {
      const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    }
  }
  return token;
}