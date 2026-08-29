import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import MarkerDot from '../components/MarkerDot';
import { Marker } from '../types';

type Props = {
  markers: Marker[];
  onMarkerPress?: (m: Marker) => void;
};

export default function HomeScreen({ markers, onMarkerPress }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historical Building Markers</Text>
      <View style={styles.mapLayout}>
        {markers.map((m, i) => (
          <MarkerDot
            key={m.id}
            marker={m}
            style={i === 0 ? { top: 30, left: 40 } : i === 1 ? { top: 80, left: 120 } : { top: 20, right: 40 }}
            onPress={onMarkerPress}
          />
        ))}
      </View>
      <Text style={styles.hint}>Tap a glowing marker to view building info and scannable status.</Text>
      <FlatList
        data={markers}
        keyExtractor={(i) => i.id}
        style={{ marginTop: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => onMarkerPress?.(item)}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={[styles.status, item.status === 'Scannable' && { color: '#22c55e' }, item.status === 'Nearby' && { color: '#38bdf8' }]}>{item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  title: { color: '#e5e7eb', fontSize: 18, fontWeight: '700', marginBottom: 10 },
  mapLayout: { height: 140, borderRadius: 12, backgroundColor: '#020617', borderWidth: 1, borderColor: '#1f2937', marginBottom: 8, overflow: 'hidden' },
  hint: { color: '#9ca3af', fontSize: 12, marginTop: 4 },
  card: { padding: 10, marginBottom: 8, borderRadius: 10, backgroundColor: 'rgba(15,23,42,0.9)', borderWidth: 1, borderColor: 'rgba(56,189,248,0.4)' },
  name: { color: '#e5e7eb', fontWeight: '600' },
  status: { color: '#38bdf8', fontSize: 12, marginTop: 2 },
});
