import React, {useEffect, useRef, useState} from 'react';
import {NativeModules, SafeAreaView, StyleSheet, Text, Pressable, View} from 'react-native';

function writeAppLog(message: string) {
  try {
    const logger = NativeModules.AppLogger;
    if (logger && typeof logger.log === 'function') logger.log(message);
  } catch {
    // Logging must never interrupt the app.
  }
}

export default function App() {
  const [count, setCount] = useState(0);
  const tapCount = useRef(0);

  useEffect(() => {
    writeAppLog('لقد نجح البناء وتم تشغيل التطبيق بنجاح');
  }, []);

  const onCounterPress = () => {
    setCount(current => current + 1);
    tapCount.current += 1;
    if (tapCount.current % 100 === 0) {
      writeAppLog(`تم النقر ${tapCount.current}`);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>KLENCOD-RN</Text>
        <Text style={styles.title}>Govf</Text>
        <Text style={styles.body}>مشروع React Native CLI جاهز للتعديل والبناء عبر GitHub.</Text>
        <Pressable style={styles.button} onPress={onCounterPress}>
          <Text style={styles.buttonText}>تم الضغط {count} مرة</Text>
        </Pressable>
        <Text style={styles.hint}>يُكتب حدث في سجل التطبيق عند كل 100 ضغطة.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#0A0E14'},
  container: {flex: 1, justifyContent: 'center', padding: 24},
  eyebrow: {color: '#3791FF', fontSize: 14, fontWeight: '700', letterSpacing: 2},
  title: {color: '#F5F7FA', fontSize: 32, fontWeight: '800', marginTop: 8},
  body: {color: '#9DABBB', fontSize: 16, lineHeight: 24, marginTop: 14},
  button: {backgroundColor: '#3791FF', borderRadius: 14, padding: 16, marginTop: 28},
  buttonText: {color: '#FFFFFF', textAlign: 'center', fontSize: 16, fontWeight: '700'},
  hint: {color: '#788897', fontSize: 13, textAlign: 'center', marginTop: 18},
});