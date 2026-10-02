import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const INITIAL_REQUESTS = [
  {
    id: 'req-1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    offering: 'Figma Design Systems 🎨',
    seeking: 'React Native & Mobile App 📱',
    status: 'Pending Response',
    time: '2 hours ago',
  },
  {
    id: 'req-2',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    offering: 'Python Data Structures 🐍',
    seeking: 'Spanish Conversation 🇪🇸',
    status: 'Accepted ✓',
    time: 'Yesterday',
  },
];

export const SwapsScreen: React.FC = () => {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted'>('all');

  const handleAccept = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Accepted ✓' } : r))
    );
  };

  const filteredRequests = requests.filter((r) => {
    if (filter === 'pending') return r.status.includes('Pending');
    if (filter === 'accepted') return r.status.includes('Accepted');
    return true;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Skill Swaps 💬</Text>
        <Text style={styles.headerSubtitle}>Manage incoming & outgoing swap proposals</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {(['all', 'pending', 'accepted'] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tabBtn, filter === t && styles.tabBtnActive]}
            onPress={() => setFilter(t)}
          >
            <Text style={[styles.tabBtnText, filter === t && styles.tabBtnTextActive]}>
              {t.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {filteredRequests.map((req) => {
          const isAccepted = req.status.includes('Accepted');
          return (
            <View key={req.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Image source={{ uri: req.avatar }} style={styles.avatar} />
                <View style={styles.info}>
                  <Text style={styles.name}>{req.name}</Text>
                  <Text style={styles.time}>{req.time}</Text>
                </View>
                <View style={[styles.badge, isAccepted ? styles.badgeAccepted : styles.badgePending]}>
                  <Text style={[styles.badgeText, isAccepted ? styles.badgeTextAccepted : styles.badgeTextPending]}>
                    {req.status}
                  </Text>
                </View>
              </View>

              <View style={styles.swapDetails}>
                <Text style={styles.detailText}>Offers: <Text style={styles.highlight}>{req.offering}</Text></Text>
                <Text style={styles.detailText}>Wants: <Text style={styles.highlight}>{req.seeking}</Text></Text>
              </View>

              <View style={styles.actionRow}>
                {isAccepted ? (
                  <TouchableOpacity style={styles.chatBtn}>
                    <Text style={styles.chatBtnText}>Open Chat & Schedule 💬</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.acceptBtn}
                      onPress={() => handleAccept(req.id)}
                    >
                      <Text style={styles.acceptBtnText}>Accept Swap ✓</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.declineBtn}>
                      <Text style={styles.declineBtnText}>Decline</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  tabBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  tabBtnActive: {
    backgroundColor: '#6366F1',
  },
  tabBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
  },
  tabBtnTextActive: {
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  time: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgePending: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
  },
  badgeAccepted: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  badgeTextPending: {
    color: '#D97706',
  },
  badgeTextAccepted: {
    color: '#059669',
  },
  swapDetails: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    marginBottom: 14,
  },
  detailText: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  highlight: {
    fontWeight: '700',
    color: '#0F172A',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  chatBtn: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  chatBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  acceptBtn: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 8,
  },
  acceptBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  declineBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  declineBtnText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '600',
  },
});
