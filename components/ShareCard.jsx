import React, { use, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Share, Clipboard } from 'react-native';

const ShareCard = () => {
      const [shareData, setShareData] = useState(null);
      const [loading, setLoading] = useState(true);
    useEffect(() => {
        // fetch('https://db.utq.org.sa/api/share')
        fetch('http://192.168.1.5:3000/api/share', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      .then((response) => response.json())
      .then((data) => {
        setShareData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching share data:', error);
        setLoading(false);
      });
    },[])
  
  const onShare = async () => {
    try {
      await Share.share({
        message: `${shareData?.message}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const copyLink = () => {
    Clipboard.setString(shareData?.link);
    alert('تم نسخ الرابط!');
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>رسالة النشر</Text>
        <Text style={styles.headerSub}>انسخ/شارك الرسالة مع صورة جاهزة</Text>
      </View>

      <Image source={{ uri: shareData?.image }} style={styles.mainImage} resizeMode="cover" />

      <View style={styles.linkSection}>
        <Text style={styles.linkText} numberOfLines={1}>{shareData?.link}</Text>
        <TouchableOpacity style={styles.copyBtn} onPress={copyLink}>
          <Text style={styles.copyBtnText}>نسخ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.messageBox}>
        <Text style={styles.messageText}>{shareData?.message}</Text>
      </View>

      <TouchableOpacity style={styles.shareBtn} onPress={onShare}>
        <Text style={styles.shareBtnText}>مشاركة</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.copyMsgBtn} onPress={() => { Clipboard.setString(shareData?.message); alert('تم نسخ النص!'); }}>
        <Text style={styles.copyMsgBtnText}>نسخ الرسالة</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 20, width: '100%', padding: 15, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  header: { marginBottom: 15, alignItems: 'flex-end' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  headerSub: { fontSize: 12, color: '#888' },
  mainImage: { width: '100%', height: 200, borderRadius: 15, marginBottom: 15 },
  linkSection: { flexDirection: 'row-reverse', backgroundColor: '#f9f9f9', padding: 8, borderRadius: 10, alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#eee' },
  linkText: { flex: 1, textAlign: 'right', fontSize: 12, color: '#555', paddingHorizontal: 10 },
  copyBtn: { paddingHorizontal: 15, paddingVertical: 5, backgroundColor: '#fff', borderRadius: 5, borderWidth: 1, borderColor: '#ddd' },
  copyBtnText: { fontSize: 12, color: '#333' },
  messageBox: { backgroundColor: '#fcfcfc', padding: 15, borderRadius: 15, marginBottom: 20, borderStyle: 'dashed', borderWidth: 1, borderColor: '#eee' },
  messageText: { textAlign: 'right', fontSize: 13, color: '#666', lineHeight: 20 },
  shareBtn: { backgroundColor: '#70655e', padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 10 },
  shareBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  copyMsgBtn: { padding: 15, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  copyMsgBtnText: { color: '#70655e', fontWeight: 'bold' },
});

export default ShareCard;