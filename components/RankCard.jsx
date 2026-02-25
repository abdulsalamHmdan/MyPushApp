import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const RankCard = () => {
  const [rankData, setRankData] = useState(null);
  const [loading, setLoading] = useState(true);

  // جلب البيانات فور تحميل الكومبوننت
  useEffect(() => {
    fetchRankData();
  }, []);

  const fetchRankData = () => {
    setLoading(true);
    fetch('http://192.168.1.5:3000/api/rn?id=6997bddc08604665a15cdec4')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setRankData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching rank data:', error);
        setRankData({});
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View style={[styles.card, styles.center]}>
        <ActivityIndicator size="small" color="#70655e" />
      </View>
    );
  }

  if (!rankData) return null;

  return (
    <View style={styles.card}>
      {/* الهيدر العلوي */}
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>004</Text>
        </View>
        <View>
          <Text style={styles.headerTitle}>ترتيبك بين السفراء</Text>
          <Text style={styles.headerSub}>آخر تحديث : {rankData.lastUpdate || 'الآن'}</Text>
        </View>
      </View>

      {/* قائمة الترتيب */}
      <View style={styles.listContainer}>
        <View style={styles.rankItem}>
          <Text style={styles.rankLabel}>ترتيبك على السفراء</Text>
          <Text style={styles.rankValue}>{rankData.a || "-"}</Text>
        </View>

        <View style={styles.rankItem}>
          <Text style={styles.rankLabel}>ترتيبك على سفراء فرعك</Text>
          <Text style={styles.rankValue}>{rankData.b || "-"}</Text>
        </View>

        <View style={styles.rankItem}>
          <Text style={styles.rankLabel}>ترتيب فرعك على الفروع</Text>
          <Text style={styles.rankValue}>{rankData.c || '-'}</Text>
        </View>
      </View>

      {/* زر التحديث (Function فاضية تطبع بالكونسول) */}
      <TouchableOpacity 
        style={styles.actionBtn} 
        onPress={() => {
          console.log('جاري تحديث الترتيب...');
          fetchRankData();
        }}
      >
        <Text style={styles.actionBtnText}>تحديث الترتيب</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 25, width: '100%', padding: 20, marginTop: 15, elevation: 3, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  center: { height: 150, justifyContent: 'center', alignItems: 'center' },
  header: { marginBottom: 20, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', textAlign: 'right' },
  headerSub: { fontSize: 13, color: '#6c7ae0', textAlign: 'right', marginTop: 2 },
  badge: { backgroundColor: '#f5f5f5', width: 35, height: 35, borderRadius: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  badgeText: { fontSize: 10, color: '#999' },
  listContainer: { marginBottom: 10 },
  rankItem: { backgroundColor: '#fff', padding: 18, borderRadius: 15, borderWidth: 1, borderColor: '#f8f8f8', alignItems: 'center', marginBottom: 12 },
  rankLabel: { fontSize: 16, color: '#607d8b', marginBottom: 5 },
  rankValue: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  actionBtn: { backgroundColor: '#70655e', padding: 16, borderRadius: 15, alignItems: 'center' },
  actionBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default RankCard;