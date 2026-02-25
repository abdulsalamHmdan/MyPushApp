import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const GoalsCard = ({phone}) => {
  const [goalsData, setGoalsData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // جلب بيانات الأهداف من الـ API مباشرة داخل الكومبوننت
    fetch(`http://192.168.1.5:3000/api/gl?phone=${phone}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    })
      .then((response) => response.json())
      .then((data) => {
        setGoalsData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching goals data:', error);
        setLoading(false);
      });
  }, []);

  const handleAction = (actionName) => {
    setLoading(true)
    fetch(`http://192.168.1.5:3000/api/gl?phone=${phone}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    })
      .then((response) => response.json())
      .then((data) => {
        setGoalsData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching goals data:', error);
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

  // في حال فشل الجلب أو البيانات فارغة
//   if (!goalsData) return null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badge}><Text style={styles.badgeText}>003</Text></View>
        <View>
            <Text style={styles.headerTitle}>مستهدف اليوم</Text>
            <Text style={styles.headerSub}>متابعة الإنجاز اليومي بسرعة</Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.row}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>هدف الصناديق</Text>
            <View style={styles.valueContainer}>
               <Text style={styles.statValue}>{goalsData?.boxesGoal}</Text>
               <Text style={styles.unit}>/ يوم</Text>
            </View>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>هدف المبلغ</Text>
            <View style={styles.valueContainer}>
               <Text style={styles.statValue}>{goalsData?.amountGoal}</Text>
               <Text style={styles.unit}>/ يوم</Text>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>المحقق اليوم</Text>
            <View style={styles.valueContainer}>
               <Text style={styles.statValue}>{goalsData?.boxesAchieved}</Text>
               <Text style={styles.unit}>صندوق</Text>
            </View>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>المحقق اليوم</Text>
            <View style={styles.valueContainer}>
               <Text style={styles.statValue}>{goalsData?.amountAchieved}</Text>
               <Text style={styles.unit}>ريال</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.mainBtn} onPress={() => handleAction('تحديث إنجاز اليوم')}>
        <Text style={styles.mainBtnText}>تحديث إنجاز اليوم</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn} onPress={() => handleAction('الحصول على الكوبون')}>
        <Text style={styles.secondaryBtnText}>الحصول على الكوبون</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn} onPress={() => handleAction('صفحة الكوبونات')}>
        <Text style={styles.secondaryBtnText}>صفحة الكوبونات</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 25, width: '100%', padding: 20, marginTop: 20, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  center: { height: 200, justifyContent: 'center', alignItems: 'center' },
  header: { marginBottom: 20, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', textAlign: 'right' },
  headerSub: { fontSize: 13, color: '#888', textAlign: 'right' },
  badge: { backgroundColor: '#f5f5f5', width: 35, height: 35, borderRadius: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  badgeText: { fontSize: 10, color: '#999' },
  statsGrid: { marginBottom: 20 },
  row: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 12 },
  statBox: { width: '48%', backgroundColor: '#fff', padding: 15, borderRadius: 15, borderWidth: 1, borderColor: '#f8f8f8', alignItems: 'center' },
  statLabel: { fontSize: 12, color: '#aaa', marginBottom: 5 },
  valueContainer: { flexDirection: 'row-reverse', alignItems: 'baseline' },
  statValue: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  unit: { fontSize: 11, color: '#ccc', marginRight: 4 },
  mainBtn: { backgroundColor: '#70655e', padding: 16, borderRadius: 15, alignItems: 'center', marginBottom: 10 },
  mainBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  secondaryBtn: { padding: 16, borderRadius: 15, alignItems: 'center', borderWidth: 1, borderColor: '#f0f0f0', marginBottom: 8 },
  secondaryBtnText: { color: '#555', fontWeight: '600' },
});

export default GoalsCard;