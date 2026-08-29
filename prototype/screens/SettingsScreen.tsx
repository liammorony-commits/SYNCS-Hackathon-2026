import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.box}><Text style={styles.text}>This page is a placeholder for now.</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  title: { color: '#e5e7eb', fontSize: 18, fontWeight: '700', marginBottom: 10 },
  box: { marginTop: 12, padding: 10, borderRadius: 10, backgroundColor: '#020617', borderWidth: 1, borderColor: '#1f2937' },
  text: { color: '#9ca3af' },
});
