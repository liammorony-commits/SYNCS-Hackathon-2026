import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Animated, StyleSheet } from 'react-native';
import HologramCard from '../components/HologramCard';
import HistoryPanel from '../components/HistoryPanel';
import { HologramEvent, HistoryItem } from '../types';

type Props = {
  events: HologramEvent[];
  history: HistoryItem[];
  onEventPress?: (e: HologramEvent) => void;
};

export default function PastScreen({ events, history, onEventPress }: Props) {
  const [expanded, setExpanded] = useState(false);
  const historyHeight = useRef(new Animated.Value(80)).current;

  const toggle = () => {
    setExpanded((p) => !p);
    Animated.timing(historyHeight, { toValue: expanded ? 80 : 180, duration: 250, useNativeDriver: false }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Past Events – Holograms</Text>
      <ScrollView>
        {events.map((ev) => (
          <HologramCard key={ev.id} event={ev} onPress={onEventPress} />
        ))}
      </ScrollView>
      <HistoryPanel height={historyHeight} expanded={expanded} toggle={toggle} items={history} />
      <View style={styles.aiBox}>
        <Text style={styles.aiTitle}>AI Historical Summary (Placeholder)</Text>
        <Text style={styles.aiText}>Once the camera recognises the Quadrangle, Taff’s AI will generate a live summary here.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  title: { color: '#e5e7eb', fontSize: 18, fontWeight: '700', marginBottom: 10 },
  aiBox: { marginTop: 12, padding: 12, borderRadius: 12, backgroundColor: 'rgba(15,23,42,0.9)', borderWidth: 1, borderColor: 'rgba(56,189,248,0.5)' },
  aiTitle: { color: '#38bdf8', fontWeight: '700', marginBottom: 4 },
  aiText: { color: '#9ca3af', fontSize: 13 },
});
