// App.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import PastScreen from './screens/PastScreen';
import PresentScreen from './screens/PresentScreen';
import ScanScreen from './screens/ScanScreen';
import SettingsScreen from './screens/SettingsScreen';
import { HologramEvent, Comment, Marker, HistoryItem, Tab, Screen } from './types';

const hologramEvents: HologramEvent[] = [
  { id: '1', year: 1886, title: 'A Wedding in the Quadrangle', description: 'A beautiful ceremony was held in the Great Hall followed by celebrations here.', details: 'In 1886, the Great Hall hosted a grand wedding. Guests spilled into the Quadrangle, filling the space with music, laughter, and celebration.' },
  { id: '2', year: 1920, title: 'Graduation Day', description: 'Generations of students have celebrated their achievements in this iconic place.', details: 'The Quadrangle has seen countless graduation ceremonies. In 1920, students walked through the arches into a new chapter of their lives.' },
  { id: '3', year: 1854, title: 'The Foundation', description: 'Construction of the main building begins.', details: 'In 1854, the foundations of the main building were laid. The Quadrangle slowly took shape as the heart of the University of Sydney.' },
];

const historyTimeline: HistoryItem[] = [
  { id: 'h1', year: 1886, label: 'A Wedding in the Quadrangle' },
  { id: 'h2', year: 1920, label: 'Graduation Day' },
  { id: 'h3', year: 1950, label: 'Post-War Celebrations' },
  { id: 'h4', year: 2000, label: 'A New Millennium' },
  { id: 'h5', year: 2026, label: 'Your Story Continues' },
];

const initialComments: Comment[] = [
  { id: 'c1', name: 'Isabella R.', text: 'I proposed to my partner right here under the tree 💍❤️', time: '18m ago', phone: '+61 4XX XXX XXX' },
  { id: 'c2', name: 'James M.', text: 'Graduated today! 4 years of hard work paid off 🎓', time: '42m ago', phone: '+61 4XX XXX XXX' },
  { id: 'c3', name: 'Sophia L.', text: 'This is where I met some of my lifelong best friends 🧡', time: '1h ago', phone: '+61 4XX XXX XXX' },
];

const buildingMarkers: Marker[] = [
  { id: 'm1', name: 'Quadrangle – Great Hall', status: 'Scannable', description: 'Central ceremonial hall. Key historical events and graduations have taken place here.' },
  { id: 'm2', name: 'Quadrangle – Lawn', status: 'Scannable', description: 'Open green space where students gather, celebrate, and create new memories.' },
  { id: 'm3', name: 'Clock Tower', status: 'Nearby', description: 'Iconic landmark overlooking the campus. A silent witness to decades of change.' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('PAST');
  const [activeScreen, setActiveScreen] = useState<Screen>('HOME');

  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<HologramEvent | null>(null);
  const [eventModalVisible, setEventModalVisible] = useState(false);

  const [historyExpanded, setHistoryExpanded] = useState(false);
  const historyHeight = useRef(new Animated.Value(80)).current;

  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [commentModalVisible, setCommentModalVisible] = useState(false);

  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const [markerModalVisible, setMarkerModalVisible] = useState(false);

  const bottomPanelHeight = useRef(new Animated.Value(0)).current;
  const [bottomPanelVisible, setBottomPanelVisible] = useState(false);

  useEffect(() => {
    if (isScanning) {
      setScanProgress(0);
      const steps = [20, 40, 80, 100];
      let index = 0;
      const interval = setInterval(() => {
        setScanProgress(steps[index]);
        index++;
        if (index === steps.length) {
          clearInterval(interval);
          setIsScanning(false);
          setScanComplete(true);
          setActiveScreen('SCAN');
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const handleScanPress = () => {
    if (scanComplete || isScanning) return;
    setIsScanning(true);
  };

  const toggleHistory = () => {
    setHistoryExpanded((prev) => !prev);
    Animated.timing(historyHeight, { toValue: historyExpanded ? 80 : 180, duration: 250, useNativeDriver: false }).start();
  };

  const toggleBottomPanel = () => {
    setBottomPanelVisible((prev) => !prev);
    Animated.timing(bottomPanelHeight, { toValue: bottomPanelVisible ? 0 : 220, duration: 250, useNativeDriver: false }).start();
  };

  const addNewComment = (name: string, text: string, phone: string) => {
    if (!name.trim() || !text.trim() || !phone.trim()) return;
    const newComment: Comment = { id: `c${comments.length + 1}`, name: name.trim(), text: text.trim(), time: 'Just now', phone: phone.trim() };
    setComments([newComment, ...comments]);
  };

  const renderTopTabs = () => (
    <View style={styles.tabBar}>
      <TouchableOpacity style={[styles.tabButton, activeTab === 'PRESENT' && styles.tabButtonActiveLeft]} onPress={() => setActiveTab('PRESENT')}>
        <Text style={[styles.tabText, activeTab === 'PRESENT' && styles.tabTextActive]}>PRESENT</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tabButton, activeTab === 'PAST' && styles.tabButtonActiveRight]} onPress={() => setActiveTab('PAST')}>
        <Text style={[styles.tabText, activeTab === 'PAST' && styles.tabTextActive]}>PAST</Text>
      </TouchableOpacity>
    </View>
  );

  const renderMainArea = () => {
    if (activeScreen === 'HOME') {
      return activeTab === 'PAST' ? (
        <PastScreen events={hologramEvents} history={historyTimeline} onEventPress={(e) => { setSelectedEvent(e); setEventModalVisible(true); }} />
      ) : (
        <HomeScreen markers={buildingMarkers} onMarkerPress={(m) => { setSelectedMarker(m); setMarkerModalVisible(true); }} />
      );
    }
    if (activeScreen === 'SCAN') {
      return <ScanScreen isScanning={isScanning} scanProgress={scanProgress} scanComplete={scanComplete} />;
    }
    if (activeScreen === 'SETTINGS') {
      return <SettingsScreen />;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderTopTabs()}
      {renderMainArea()}

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomButton} onPress={() => setActiveScreen('HOME')}><Text style={styles.bottomText}>Home</Text></TouchableOpacity>

        <View style={styles.scanContainer}>
          <TouchableOpacity style={[styles.scanButton, scanComplete && styles.scanButtonComplete]} onPress={handleScanPress}><Text style={styles.scanText}>{scanComplete ? 'Live' : isScanning ? 'Scanning…' : 'Scan'}</Text></TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.bottomButton} onPress={() => setActiveScreen('SETTINGS')}><Text style={styles.bottomText}>Settings</Text></TouchableOpacity>
      </View>

      {/* Event Modal */}
      <Modal visible={eventModalVisible} transparent animationType="fade" onRequestClose={() => setEventModalVisible(false)}>
        <View style={styles.modalBackdrop}><View style={styles.modalContent}>{selectedEvent && (<>
          <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
          <Text style={styles.modalSubtitle}>{selectedEvent.year}</Text>
          <Text style={styles.modalText}>{selectedEvent.details}</Text>
        </>) }
        <TouchableOpacity style={styles.modalCloseButton} onPress={() => setEventModalVisible(false)}><Text style={styles.modalCloseText}>Close</Text></TouchableOpacity>
        </View></View>
      </Modal>

      {/* Comment Modal */}
      <Modal visible={commentModalVisible} transparent animationType="fade" onRequestClose={() => setCommentModalVisible(false)}>
        <View style={styles.modalBackdrop}><View style={styles.modalContent}>{selectedComment && (<>
          <Text style={styles.modalTitle}>{selectedComment.name}</Text>
          <Text style={styles.modalSubtitle}>{selectedComment.time}</Text>
          <Text style={styles.modalText}>{selectedComment.text}</Text>
          <Text style={styles.modalText}>Phone: {selectedComment.phone}</Text>
        </>) }
        <TouchableOpacity style={styles.modalCloseButton} onPress={() => setCommentModalVisible(false)}><Text style={styles.modalCloseText}>Close</Text></TouchableOpacity>
        </View></View>
      </Modal>

      {/* Marker Modal */}
      <Modal visible={markerModalVisible} transparent animationType="fade" onRequestClose={() => setMarkerModalVisible(false)}>
        <View style={styles.modalBackdrop}><View style={styles.modalContent}>{selectedMarker && (<>
          <Text style={styles.modalTitle}>{selectedMarker.name}</Text>
          <Text style={styles.modalSubtitle}>Status: {selectedMarker.status}</Text>
          <Text style={styles.modalText}>{selectedMarker.description}</Text>
        </>) }
        <TouchableOpacity style={styles.modalCloseButton} onPress={() => setMarkerModalVisible(false)}><Text style={styles.modalCloseText}>Close</Text></TouchableOpacity>
        </View></View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050814',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: '#0b1020',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1f2937',
    alignItems: 'center',
  },
  tabButtonActiveLeft: {
    backgroundColor: '#1f2a4d',
    borderColor: '#38bdf8',
  },
  tabButtonActiveRight: {
    backgroundColor: '#1f2a4d',
    borderColor: '#38bdf8',
  },
  tabText: {
    color: '#8b9ac7',
    fontWeight: '600',
    letterSpacing: 1,
  },
  tabTextActive: {
    color: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  sectionTitle: {
    color: '#e5e7eb',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  hologramCard: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.7)',
  },
  hologramYear: {
    color: '#38bdf8',
    fontWeight: '700',
    marginBottom: 4,
  },
  hologramTitle: {
    color: '#e5e7eb',
    fontWeight: '700',
    marginBottom: 4,
  },
  hologramDescription: {
    color: '#9ca3af',
    fontSize: 13,
  },
  viewEventButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#38bdf8',
  },
  viewEventText: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '600',
  },
  historyPanel: {
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderWidth: 1,
    borderColor: '#1f2937',
    overflow: 'hidden',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  historyTitle: {
    color: '#e5e7eb',
    fontWeight: '700',
  },
  historyToggle: {
    color: '#38bdf8',
    fontWeight: '600',
    fontSize: 12,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  historyYear: {
    color: '#38bdf8',
    fontWeight: '600',
    width: 60,
  },
  historyText: {
    color: '#e5e7eb',
    flex: 1,
  },
  aiSummaryBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.5)',
  },
  aiSummaryTitle: {
    color: '#38bdf8',
    fontWeight: '700',
    marginBottom: 4,
  },
  aiSummaryText: {
    color: '#9ca3af',
    fontSize: 13,
  },
  bottomSlidingPanel: {
    borderRadius: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderWidth: 1,
    borderColor: '#1f2937',
    overflow: 'hidden',
    marginBottom: 8,
  },
  bottomPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  bottomPanelTitle: {
    color: '#e5e7eb',
    fontWeight: '700',
  },
  bottomPanelToggle: {
    color: '#38bdf8',
    fontWeight: '600',
    fontSize: 12,
  },
  commentCard: {
    marginHorizontal: 8,
    marginVertical: 6,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
  },
  commentName: {
    color: '#e5e7eb',
    fontWeight: '600',
  },
  commentText: {
    color: '#9ca3af',
    marginTop: 2,
  },
  commentMeta: {
    color: '#6b7280',
    fontSize: 11,
    marginTop: 4,
  },
  newCommentBox: {
    marginTop: 8,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  newCommentTitle: {
    color: '#e5e7eb',
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#0b1020',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#e5e7eb',
    fontSize: 13,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  addCommentButton: {
    marginTop: 4,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#38bdf8',
    alignItems: 'center',
  },
  addCommentText: {
    color: '#0f172a',
    fontWeight: '700',
  },
  infoBox: {
    marginTop: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  infoText: {
    color: '#9ca3af',
    fontSize: 13,
  },
  scanStatusBox: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 12,
  },
  scanStatusText: {
    color: '#e5e7eb',
    fontWeight: '600',
  },
  scanStatusSub: {
    color: '#9ca3af',
    fontSize: 13,
    marginTop: 4,
  },
  bottomBar: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: '#020617',
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
  },
  bottomButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  bottomText: {
    color: '#9ca3af',
    fontWeight: '600',
  },
  scanContainer: {
    alignItems: 'center',
  },
  scanButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#38bdf8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#38bdf8',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  scanButtonComplete: {
    backgroundColor: '#22c55e',
    shadowColor: '#22c55e',
  },
  scanText: {
    color: '#0f172a',
    fontWeight: '700',
  },
  mapLayout: {
    height: 140,
    borderRadius: 12,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 8,
    overflow: 'hidden',
  },
  markerDot: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#38bdf8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#38bdf8',
  },
  mapHint: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 4,
  },
  markerCard: {
    padding: 10,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.4)',
  },
  markerName: {
    color: '#e5e7eb',
    fontWeight: '600',
  },
  markerStatus: {
    color: '#38bdf8',
    fontSize: 12,
    marginTop: 2,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#38bdf8',
  },
  modalTitle: {
    color: '#e5e7eb',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 4,
  },
  modalSubtitle: {
    color: '#38bdf8',
    fontWeight: '600',
    marginBottom: 8,
  },
  modalText: {
    color: '#9ca3af',
    fontSize: 13,
    marginBottom: 8,
  },
  modalCloseButton: {
    marginTop: 8,
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#38bdf8',
  },
  modalCloseText: {
    color: '#38bdf8',
    fontWeight: '600',
    fontSize: 12,
  },
});
