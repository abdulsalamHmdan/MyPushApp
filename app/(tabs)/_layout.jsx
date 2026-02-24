import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, Text } from 'react-native';
import ShareCard from '../../components/ShareCard'; // سننشئ هذا الملف الآن
import GoalsCard from '../../components/GoalsCard'; // سننشئ هذا الملف الآن

export default function HomeScreen() {


  useEffect(() => {
    // جلب بيانات بطاقة المشاركة من الـ API
    
  }, []);

  // if (loading) {
  //   return (
  //     <View style={styles.center}>
  //       <ActivityIndicator size="large" color="#70655e" />
  //     </View>
  //   );
  // }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.welcomeText}>مرحباً</Text>
      
      {/* عرض بطاقة المشاركة إذا توفرت البيانات */}
      
        <ShareCard  
        />
        <GoalsCard  
        />
      
      
      {/* يمكنك إضافة بطاقات أخرى هنا مستقبلاً */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { padding: 20, alignItems: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcomeText: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
});