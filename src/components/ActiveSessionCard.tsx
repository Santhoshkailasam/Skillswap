import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SwapSession } from '../types';

interface ActiveSessionCardProps {
  session: SwapSession;
  onJoinSession?: (session: SwapSession) => void;
}

export const ActiveSessionCard: React.FC<ActiveSessionCardProps> = ({
  session,
  onJoinSession,
}) => {
  const isInProgress = session.status === 'In Progress';

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.userInfo}>
          <Image source={{ uri: session.partnerAvatar }} style={styles.avatar} />
          <View>
            <Text style={styles.partnerName}>{session.partnerName}</Text>
            <Text style={styles.timeText}>📅 {session.dateTime}</Text>
          </View>
        </View>

        <View
          style={[
            styles.statusBadge,
            isInProgress ? styles.statusBadgeActive : styles.statusBadgeUpcoming,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              isInProgress ? styles.statusTextActive : styles.statusTextUpcoming,
            ]}
          >
            {isInProgress ? '● IN PROGRESS' : 'UPCOMING'}
          </Text>
        </View>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>YOU ARE TEACHING</Text>
          <Text style={styles.detailValue} numberOfLines={1}>
            {session.teachingSkill}
          </Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>YOU ARE LEARNING</Text>
          <Text style={styles.detailValue} numberOfLines={1}>
            {session.learningSkill}
          </Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <Text style={styles.durationText}>⏳ {session.duration}</Text>
        <TouchableOpacity
          style={[styles.joinBtn, !isInProgress && styles.joinBtnUpcoming]}
          onPress={() => onJoinSession && onJoinSession(session)}
        >
          <Text style={styles.joinBtnText}>
            {isInProgress ? 'Join Call 📹' : 'View Room Details'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: '#6366F1',
  },
  partnerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  timeText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  statusBadgeUpcoming: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  statusTextActive: {
    color: '#34D399',
  },
  statusTextUpcoming: {
    color: '#818CF8',
  },
  detailsRow: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  detailBox: {
    flex: 1,
    paddingHorizontal: 4,
  },
  detailLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#CBD5E1',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  joinBtn: {
    backgroundColor: '#10B981',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  joinBtnUpcoming: {
    backgroundColor: '#6366F1',
  },
  joinBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
