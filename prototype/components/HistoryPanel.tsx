import React from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { HistoryItem } from '../types';

type Props = {
  height: Animated.Value;
  expanded: boolean;
  toggle: () => void;
  items: HistoryItem[];
};

export default function HistoryPanel({ height, expanded, toggle, items }: Props) {
  return (
    <Animated.View style={[styles.panel, { height }] as any}>
      <View style={styles.header}>
        <Text style={styles.title}>History Timeline</Text>
        <TouchableOpacity onPress={toggle}>
          <Text style={styles.toggle}>{expanded ? 'Collapse' : 'Expand'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {items.map((it) => (
          <View key={it.id} style={styles.item}>
            <Text style={styles.year}>{it.year}</Text>
            <Text style={styles.text}>{it.label}</Text>
          </View>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  panel: {
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(15,23,42,0.9)',
    borderWidth: 1,
    borderColor: '#1f2937',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  title: { color: '#e5e7eb', fontWeight: '700' },
  toggle: { color: '#38bdf8', fontWeight: '600', fontSize: 12 },
  item: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6 },
  year: { color: '#38bdf8', fontWeight: '600', width: 60 },
  text: { color: '#e5e7eb', flex: 1 },
});
