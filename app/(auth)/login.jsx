import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import Storage from 'expo-native-storage';


export default function LoginPage() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (password === '1234') { // مثال لكلمة المرور
      console.log('تم تسجيل الدخول بنجاح');
      Storage.setItemSync('usernames',"1234")
      router.replace('/(tabs)/home'); // الانتقال للرئيسية
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* قسم اللوجو والترحيب */}
        <View style={styles.headerSection}>
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://db.utq.org.sa/api/img/logo.png' }} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.welcomeTitle}>مرحباً بك مجدداً</Text>
          <Text style={styles.welcomeSub}>سجل دخولك للوصول إلى لوحة التحكم</Text>
        </View>

        {/* قسم المدخلات */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>كلمة المرور السريعة</Text>
          <TextInput
            style={styles.input}
            placeholder="••••"
            placeholderTextColor="#bbb"
            secureTextEntry={true}
            keyboardType="numeric"
            maxLength={4}
            value={password}
            onChangeText={setPassword}
          />
          
          <TouchableOpacity 
            style={[styles.loginBtn, !password && styles.disabledBtn]} 
            onPress={handleLogin}
            disabled={!password}
          >
            <Text style={styles.loginBtnText}>تأكيد الدخول</Text>
          </TouchableOpacity>
        </View>

        {/* تذييل الصفحة */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>بصيرة - نظام إدارة السفراء</Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 30,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#f9f9f9',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    // ظل خفيف للوجو
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  logo: {
    width: 80,
    height: 80,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  welcomeSub: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  inputSection: {
    width: '100%',
  },
  inputLabel: {
    textAlign: 'right',
    fontSize: 14,
    color: '#70655e',
    marginBottom: 10,
    fontWeight: '600',
    marginRight: 5,
  },
  input: {
    backgroundColor: '#f5f5f5',
    height: 60,
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 24,
    textAlign: 'center', // لجعل النقط في المنتصف
    color: '#333',
    letterSpacing: 10, // تباعد بين نقاط كلمة المرور
    borderWidth: 1,
    borderColor: '#eee',
  },
  loginBtn: {
    backgroundColor: '#70655e', // اللون الموحد لمشروعك
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    elevation: 3,
  },
  disabledBtn: {
    backgroundColor: '#ccc',
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 50,
    alignItems: 'center',
  },
  footerText: {
    color: '#ccc',
    fontSize: 12,
  },
});