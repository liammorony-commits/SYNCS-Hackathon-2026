import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Marker } from '../types';

type Props = {
  marker: Marker;
  style?: any;
  onPress?: (m: Marker) => void;
};

export default function MarkerDot({ marker, style, onPress }: Props) {
  return (
    <TouchableOpacity style={[styles.dot, style]} onPress={() => onPress?.(marker)}>
      <View style={styles.inner} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#38bdf8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#38bdf8' },
});
