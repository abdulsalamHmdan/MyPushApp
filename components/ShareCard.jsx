import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Sharing from 'expo-sharing';
// import * as FileSystem from 'expo-file-system';
import * as FileSystem from 'expo-file-system/legacy';
import * as Clipboard from 'expo-clipboard';

const ShareCard = () => {
  const [shareData, setShareData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://192.168.1.5:3000/api/share',{
        method: 'GET',
        headers: {  'Content-Type': 'application/json' },
    } )
      .then((response) => response.json())
      .then((data) => {
        setShareData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  // الدالة السحرية لمشاركة الصورة مع النص
  const onShare = async () => {
    if (!shareData) return;

    try {
      // 1. تحديد مسار مؤقت للصورة في ذاكرة الهاتف
      const localUri = FileSystem.cacheDirectory + 'temp_share_image.png';

      // 2. تحميل الصورة من الرابط إلى الذاكرة المحلية
      const downloadResult = await FileSystem.downloadAsync(shareData.image, localUri);

      // 3. التحقق من إمكانية المشاركة على الجهاز
      if (!(await Sharing.isAvailableAsync())) {
        alert('المشاركة غير متاحة على هذا الجهاز');
        return;
      }

      // 4. تنفيذ عملية المشاركة
      // ملاحظة: في iOS سيظهر النص والصورة معاً، في أندرويد يتم مشاركة الملف
      // ويفضل نسخ النص للمجلد (Clipboard) احتياطاً للمستخدم
      await Sharing.shareAsync(downloadResult.uri, {
        dialogTitle: 'مشاركة الرسالة',
        mimeType: 'image/png',
      });

    } catch (error) {
      console.error('Share Error:', error);
      alert('حدث خطأ أثناء محاولة المشاركة');
    }
  };

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    alert('تم نسخ النص!');
  };

  if (loading) return <ActivityIndicator size="small" color="#70655e" />;
  if (!shareData) return null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>رسالة النشر</Text>
        <Text style={styles.headerSub}>شارك الصورة مع النص الجاهز</Text>
      </View>

      <Image source={{ uri: shareData.image }} style={styles.mainImage} />

      <View style={styles.messageBox}>
        <Text style={styles.messageText}>{shareData.message}</Text>
      </View>

      <TouchableOpacity style={styles.shareBtn} onPress={onShare}>
        <Text style={styles.shareBtnText}>مشاركة الصورة</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.copyMsgBtn} 
        onPress={() => copyToClipboard(shareData.message)}
      >
        <Text style={styles.copyMsgBtnText}>نسخ نص الرسالة</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 20, width: '100%', padding: 15, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, marginTop: 10 },
  header: { marginBottom: 15, alignItems: 'flex-end' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  headerSub: { fontSize: 12, color: '#888' },
  mainImage: { width: '100%', height: 200, borderRadius: 15, marginBottom: 15 },
  messageBox: { backgroundColor: '#fcfcfc', padding: 15, borderRadius: 15, marginBottom: 20, borderStyle: 'dashed', borderWidth: 1, borderColor: '#eee' },
  messageText: { textAlign: 'right', fontSize: 13, color: '#666', lineHeight: 20 },
  shareBtn: { backgroundColor: '#70655e', padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 10 },
  shareBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  copyMsgBtn: { padding: 15, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  copyMsgBtnText: { color: '#70655e', fontWeight: 'bold' },
});

export default ShareCard;