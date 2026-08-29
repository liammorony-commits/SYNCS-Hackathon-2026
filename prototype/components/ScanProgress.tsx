import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = { progress: number };

export default function ScanProgress({ progress }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.circlePlaceholder}>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
      <Text style={styles.label}>Scanning…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 12 },
  circlePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#020617',
    borderWidth: 6,
    borderColor: 'rgba(56,189,248,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: { color: '#38bdf8', fontWeight: '700', fontSize: 20 },
  label: { color: '#9ca3af', marginTop: 8 },
});
