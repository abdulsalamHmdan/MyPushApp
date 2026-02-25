import React, { useState, useEffect } from 'react'; // تأكد من وجود الأقواس المتعرجة حول useState
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';

const BoxesCard = () => {
  // تأكد أن تعريف الـ State يبدأ بمصفوفة فارغة [] وليس null
  const [view, setView] = useState('menu'); 
  const [data, setData] = useState([]); // هنا كان أحد أسباب الخطأ المحتملة
  const [loading, setLoading] = useState(false);

  const fetchBoxes = (selectedFilter) => {
    setLoading(true);
    setView('list');

    fetch(`http://192.168.1.5:3000/api/bx?filter=${selectedFilter}&id=6997bddc08604665a15cdec4`)
      .then((response) => response.json())
      .then((json) => {
        // تحقق أن البيانات القادمة مصفوفة فعلاً قبل وضعها في الـ State
        if (Array.isArray(json)) {
          setData(json);
        } else {
          setData([]); // إذا لم تكن مصفوفة، نضع مصفوفة فارغة لتجنب الـ Crash
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching boxes:', error);
        setLoading(false);
        setData([]);
      });
  };

  const handleBack = () => {
    setView('menu');
    setData([]);
  };

  if (view === 'menu') {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.badge}><Text style={styles.badgeText}>005</Text></View>
          <Text style={styles.headerTitle}>الصناديق السهمية</Text>
        </View>
        <TouchableOpacity style={styles.mainBtn} onPress={() => fetchBoxes('all')}>
          <Text style={styles.mainBtnText}>عرض جميع الصناديق</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => fetchBoxes('today')}>
          <Text style={styles.secondaryBtnText}>عرض صناديق اليوم</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
        <Text style={styles.backBtnText}>عودة</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="small" color="#70655e" />
      ) : (
        data.map((item) => (
          <View key={item.id} style={styles.boxItem}>
            <Text style={styles.boxName}>{item.name}</Text>
            <View style={styles.footerGrid}>
              <Text style={styles.gridValue}>الهدف: {item.goal}</Text>
              <Text style={styles.gridValue}>المحقق: {item.total}</Text>
            </View>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 25, padding: 20, marginTop: 15, elevation: 3 },
  header: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  badge: { backgroundColor: '#f5f5f5', width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  badgeText: { fontSize: 10, color: '#999' },
  mainBtn: { backgroundColor: '#70655e', padding: 15, borderRadius: 12, marginBottom: 10, alignItems: 'center' },
  mainBtnText: { color: '#fff', fontWeight: 'bold' },
  secondaryBtn: { padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#eee', alignItems: 'center' },
  secondaryBtnText: { color: '#333' },
  backBtn: { padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  backBtnText: { fontWeight: 'bold' },
  boxItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  boxName: { textAlign: 'right', fontWeight: 'bold' },
  footerGrid: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginTop: 10 },
  gridValue: { fontSize: 12, color: '#666' }
});

export default BoxesCard;