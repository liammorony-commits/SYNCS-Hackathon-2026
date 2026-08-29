import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Comment } from '../types';

type Props = {
  comment: Comment;
  onPress?: (c: Comment) => void;
};

export default function CommentCard({ comment, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress?.(comment)}>
      <Text style={styles.name}>{comment.name}</Text>
      <Text style={styles.text}>{comment.text}</Text>
      <Text style={styles.meta}>{comment.time} · Phone: {comment.phone}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    marginVertical: 6,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(15,23,42,0.9)',
  },
  name: { color: '#e5e7eb', fontWeight: '600' },
  text: { color: '#9ca3af', marginTop: 2 },
  meta: { color: '#6b7280', fontSize: 11, marginTop: 4 },
});
