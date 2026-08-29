import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { HologramEvent } from '../types';

type Props = {
  event: HologramEvent;
  onPress?: (e: HologramEvent) => void;
};

export default function HologramCard({ event, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress?.(event)}>
      <Text style={styles.year}>{event.year}</Text>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.desc} numberOfLines={2}>{event.description}</Text>
      <View style={styles.button}>
        <Text style={styles.buttonText}>View Event</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(56,189,248,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(56,189,248,0.7)',
  },
  year: { color: '#38bdf8', fontWeight: '700', marginBottom: 4 },
  title: { color: '#e5e7eb', fontWeight: '700', marginBottom: 4 },
  desc: { color: '#9ca3af', fontSize: 13 },
  button: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#38bdf8',
  },
  buttonText: { color: '#38bdf8', fontSize: 12, fontWeight: '600' },
});
