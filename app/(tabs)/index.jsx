import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useRouter, useRootNavigationState } from 'expo-router';
import Storage from 'expo-native-storage';

export default function Index() {
    return <Text style={{ textAlign: 'center', marginTop: 50 }}>جاري تحميل الصفحة</Text>;
}