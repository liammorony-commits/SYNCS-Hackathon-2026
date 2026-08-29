import React from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  height: Animated.Value;
  title?: string;
  toggle?: () => void;
  children?: React.ReactNode;
  openLabel?: string;
  closeLabel?: string;
};

export default function SlidingPanel({ height, title, toggle, children, openLabel = 'Show', closeLabel = 'Hide' }: Props) {
  return (
    <Animated.View style={[styles.panel, { height }] as any}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {toggle && (
          <TouchableOpacity onPress={toggle}>
            <Text style={styles.toggle}>{closeLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.body}>{children}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: 12,
    backgroundColor: 'rgba(15,23,42,0.95)',
    borderWidth: 1,
    borderColor: '#1f2937',
    overflow: 'hidden',
    marginBottom: 8,
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
  body: { padding: 8 },
});
