import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatsSectionProps {
  completedSwaps: number;
  activeRequests: number;
  rating: number;
  hoursLearned: number;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  completedSwaps,
  activeRequests,
  rating,
  hoursLearned,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.statCard, { borderLeftColor: '#6366F1' }]}>
        <Text style={styles.statIcon}>🤝</Text>
        <Text style={styles.statNumber}>{completedSwaps}</Text>
        <Text style={styles.statLabel}>Swaps Done</Text>
      </View>

      <View style={[styles.statCard, { borderLeftColor: '#10B981' }]}>
        <Text style={styles.statIcon}>⚡</Text>
        <Text style={styles.statNumber}>{activeRequests}</Text>
        <Text style={styles.statLabel}>Active Requests</Text>
      </View>

      <View style={[styles.statCard, { borderLeftColor: '#F59E0B' }]}>
        <Text style={styles.statIcon}>⭐</Text>
        <Text style={styles.statNumber}>{rating}</Text>
        <Text style={styles.statLabel}>Peer Rating</Text>
      </View>

      <View style={[styles.statCard, { borderLeftColor: '#EC4899' }]}>
        <Text style={styles.statIcon}>⏱️</Text>
        <Text style={styles.statNumber}>{hoursLearned}h</Text>
        <Text style={styles.statLabel}>Hours Learned</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
});
