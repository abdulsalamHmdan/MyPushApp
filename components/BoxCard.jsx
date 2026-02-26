import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';

const BoxesCard = () => {
  const [view, setView] = useState('menu');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBoxes = (selectedFilter) => {
    setLoading(true);
    setView('list');

    // ملاحظة: تم استخدام الرابط الخاص بك مع الـ IP المحلي
    fetch(`http://192.168.1.5:3000/api/bx?filter=${selectedFilter}&id=6997bddc08604665a15cdec4`)
      .then((response) => response.json())
      .then((json) => {
        if (Array.isArray(json)) {
          setData(json);
        } else {
          setData([]);
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

  // 1. شاشة القائمة الرئيسية (Menu) كما في الصورة 005
  if (view === 'menu') {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.badge}><Text style={styles.badgeText}>005</Text></View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>الصناديق السهمية</Text>
            <Text style={styles.headerSub}>donate.utq.org.sa متابعة إنجاز صناديقك من روابط</Text>
          </View>
        </View>

        {/* المربع المتقطع في المنتصف */}
        <View style={styles.dashedContainer}>
          <Text style={styles.dashedText}>الصناديق السهمية</Text>
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

  // 2. شاشة عرض النتائج (List) كما في الصورة التفصيلية
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badge}><Text style={styles.badgeText}>005</Text></View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>الصناديق السهمية</Text>
          <Text style={styles.headerSub}>donate.utq.org.sa متابعة إنجاز صناديقك من روابط</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
        <Text style={styles.backBtnText}>عودة</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#70655e" style={{ marginVertical: 20 }} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {data.map((item) => {
            // حساب نسبة الإنجاز
            const progress = item.goal > 0 ? Math.min((item.total / item.goal) * 100, 100) : 0;
            
            return (
              <View key={item.pk} style={styles.boxItemCard}>
                {/* شريط اسم الوقف العلوي */}
                <View style={styles.boxHeaderBar}>
                  <Text style={styles.boxNameText}>{item.name}</Text>
                </View>

                {/* صورة الوقف */}
                <Image 
                  source={{ uri: 'https://donate.utq.org.sa/media/goal/gt_12232Artboard 1 copy-100.webp' }} // رابط افتراضي للصورة
                  style={styles.boxImage}
                  resizeMode="contain"
                />

                {/* شريط نسبة الإنجاز */}
                <View style={styles.progressSection}>
                  <View style={styles.progressLabels}>
                    <Text style={styles.progressValueText}>{progress.toFixed(0)}%</Text>
                    <Text style={styles.progressLabelText}>نسبة الإنجاز</Text>
                  </View>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                  </View>
                </View>

                {/* شبكة الإحصائيات السفلية */}
                <View style={styles.statsGrid}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>المستهدف</Text>
                    <Text style={styles.statValue}>{item.goal || '-'} ريال</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>إجمالي المبلغ</Text>
                    <Text style={styles.statValue}>{item.total} ريال</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>المتبرعين</Text>
                    <Text style={styles.statValue}>{item.order_count}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // التصميم العام للبطاقة
  card: { backgroundColor: '#fff', borderRadius: 30, padding: 20, marginTop: 15, elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10,width:"100%" },
  header: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  headerTextContainer: { alignItems: 'flex-end', flex: 1, marginRight: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  headerSub: { fontSize: 12, color: '#999', textAlign: 'right' },
  badge: { backgroundColor: '#f5f5f5', width: 35, height: 35, borderRadius: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  badgeText: { fontSize: 10, color: '#999' },

  // تصميم الـ Menu
  dashedContainer: { height: 140, borderStyle: 'dashed', borderWidth: 1, borderColor: '#ddd', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  dashedText: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  mainBtn: { backgroundColor: '#70655e', padding: 16, borderRadius: 15, alignItems: 'center', marginBottom: 10 },
  mainBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  secondaryBtn: { padding: 16, borderRadius: 15, borderWidth: 1, borderColor: '#eee', alignItems: 'center' },
  secondaryBtnText: { color: '#333', fontWeight: '600', fontSize: 16 },

  // تصميم الـ List والتفاصيل
  backBtn: { padding: 12, backgroundColor: '#f9f9f9', borderRadius: 12, marginBottom: 15, alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  backBtnText: { color: '#666', fontWeight: 'bold' },
  boxItemCard: { backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: '#f0f0f0', marginBottom: 20, overflow: 'hidden',padding:"10px" },
  boxHeaderBar: { backgroundColor: '#f4ece6', padding: 10, alignItems: 'center' },
  boxNameText: { color: '#70655e', fontWeight: 'bold', fontSize: 15 },
  boxImage: { width: '100%', height: 200,marginTop:"10px" },
  
  // شريط التقدم
  progressSection: { padding: 15 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabelText: { fontSize: 12, color: '#999' },
  progressValueText: { fontSize: 12, color: '#999' },
  progressBarBg: { height: 8, backgroundColor: '#f0f0f0', borderRadius: 4 },
  progressBarFill: { height: '100%', backgroundColor: '#bca693', borderRadius: 4 },

  // الإحصائيات
  statsGrid: { flexDirection: 'row-reverse', padding: 15, borderTopWidth: 1, borderTopColor: '#f9f9f9', justifyContent: 'space-between' },
  statItem: { alignItems: 'center', flex: 1 },
  statLabel: { fontSize: 10, color: '#ccc', marginBottom: 4 },
  statValue: { fontSize: 14, fontWeight: 'bold', color: '#70655e' }
});

export default BoxesCard;