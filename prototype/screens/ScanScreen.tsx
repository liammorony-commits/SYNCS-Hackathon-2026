import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScanProgress from '../components/ScanProgress';

type Props = { isScanning: boolean; scanProgress: number; scanComplete: boolean; onStart?: () => void };

export default function ScanScreen({ isScanning, scanProgress, scanComplete }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanning & Live Overlay</Text>
      <View style={styles.box}>
        {isScanning && <ScanProgress progress={scanProgress} />}
        {!isScanning && !scanComplete && <Text style={styles.text}>Tap Scan below to begin recognition of nearby historical buildings.</Text>}
        {scanComplete && (
          <>
            <Text style={styles.text}>Location recognised – holograms, comments, and AI summaries will appear in real time.</Text>
            <Text style={styles.sub}>This is where Ruben’s camera recognition and Taff’s AI summary connect with your interactive frontend.</Text>
          </>
        )}
      </View>
      <View style={styles.cameraPlaceholder}><Text style={{ color: '#9ca3af' }}>Camera placeholder</Text></View>
      <View style={styles.aiBox}><Text style={{ color: '#9ca3af' }}>AI summary will appear here once camera recognises the Quadrangle</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  title: { color: '#e5e7eb', fontSize: 18, fontWeight: '700', marginBottom: 10 },
  box: { padding: 12, borderRadius: 12, backgroundColor: 'rgba(15,23,42,0.9)', borderWidth: 1, borderColor: '#1f2937', marginBottom: 12 },
  text: { color: '#e5e7eb', fontWeight: '600' },
  sub: { color: '#9ca3af', marginTop: 4 },
  cameraPlaceholder: { height: 180, borderRadius: 12, backgroundColor: '#020617', borderWidth: 1, borderColor: '#1f2937', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  aiBox: { padding: 12, borderRadius: 12, backgroundColor: 'rgba(15,23,42,0.9)', borderWidth: 1, borderColor: 'rgba(56,189,248,0.5)' },
});
