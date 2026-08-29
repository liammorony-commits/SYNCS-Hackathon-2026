import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Animated, StyleSheet } from 'react-native';
import CommentCard from '../components/CommentCard';
import SlidingPanel from '../components/SlidingPanel';
import { Comment } from '../types';

type Props = {
  initialComments: Comment[];
  onCommentPress?: (c: Comment) => void;
};

export default function PresentScreen({ initialComments, onCommentPress }: Props) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [phone, setPhone] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelHeight = useRef(new Animated.Value(0)).current;

  const togglePanel = () => {
    setPanelOpen((p) => !p);
    Animated.timing(panelHeight, { toValue: panelOpen ? 0 : 220, duration: 250, useNativeDriver: false }).start();
  };

  const post = () => {
    if (!name.trim() || !text.trim() || !phone.trim()) return;
    const c: Comment = { id: `c${comments.length + 1}`, name: name.trim(), text: text.trim(), time: 'Just now', phone: phone.trim() };
    setComments([c, ...comments]);
    setName(''); setText(''); setPhone('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Present Moments – Last Hour</Text>
      <SlidingPanel height={panelHeight} title="Nearby Stories" toggle={togglePanel}>
        <ScrollView>
          {comments.map((c) => (
            <CommentCard key={c.id} comment={c} onPress={onCommentPress} />
          ))}
        </ScrollView>
      </SlidingPanel>

      <View style={styles.newBox}>
        <Text style={styles.newTitle}>Add New Moment</Text>
        <TextInput style={styles.input} placeholder="Your name" placeholderTextColor="#6b7280" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="What happened here?" placeholderTextColor="#6b7280" value={text} onChangeText={setText} />
        <TextInput style={styles.input} placeholder="Your phone (for nearby connections)" placeholderTextColor="#6b7280" value={phone} onChangeText={setPhone} />
        <TouchableOpacity style={styles.post} onPress={post}><Text style={styles.postText}>Post Moment</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  title: { color: '#e5e7eb', fontSize: 18, fontWeight: '700', marginBottom: 10 },
  newBox: { marginTop: 8, padding: 10, borderRadius: 12, backgroundColor: '#020617', borderWidth: 1, borderColor: '#1f2937' },
  newTitle: { color: '#e5e7eb', fontWeight: '700', marginBottom: 6 },
  input: { backgroundColor: '#0b1020', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, color: '#e5e7eb', fontSize: 13, marginBottom: 6, borderWidth: 1, borderColor: '#1f2937' },
  post: { marginTop: 4, paddingVertical: 8, borderRadius: 999, backgroundColor: '#38bdf8', alignItems: 'center' },
  postText: { color: '#0f172a', fontWeight: '700' },
});
