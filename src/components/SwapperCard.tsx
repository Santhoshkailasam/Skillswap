import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Swapper } from '../types';

interface SwapperCardProps {
  swapper: Swapper;
  onPress: (swapper: Swapper) => void;
  onProposeSwap: (swapper: Swapper) => void;
  isRequested?: boolean;
}

export const SwapperCard: React.FC<SwapperCardProps> = ({
  swapper,
  onPress,
  onProposeSwap,
  isRequested = false,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(swapper)}
      activeOpacity={0.9}
    >
      {/* Top Header */}
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: swapper.avatar }} style={styles.avatar} />
          <View style={styles.nameBlock}>
            <Text style={styles.name}>{swapper.name}</Text>
            <Text style={styles.role} numberOfLines={1}>{swapper.role}</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.ratingText}>{swapper.rating}</Text>
              <Text style={styles.reviewsText}>({swapper.reviewsCount} reviews)</Text>
            </View>
          </View>
        </View>

        <View style={styles.matchBadge}>
          <Text style={styles.matchText}>{swapper.matchScore}% Match</Text>
        </View>
      </View>

      {/* Skills Swap Container */}
      <View style={styles.swapBox}>
        {/* Offering */}
        <View style={styles.skillColumn}>
          <View style={styles.tagHeader}>
            <Text style={styles.offerDot}>●</Text>
            <Text style={styles.tagLabel}>OFFERS</Text>
          </View>
          <View style={styles.skillPillOffer}>
            <Text style={styles.skillIcon}>{swapper.offering.icon}</Text>
            <Text style={styles.skillName} numberOfLines={1}>
              {swapper.offering.name}
            </Text>
          </View>
        </View>

        {/* Swap Exchange Arrow */}
        <View style={styles.arrowBox}>
          <Text style={styles.arrowIcon}>⇄</Text>
        </View>

        {/* Seeking */}
        <View style={styles.skillColumn}>
          <View style={styles.tagHeader}>
            <Text style={styles.seekDot}>●</Text>
            <Text style={styles.tagLabel}>SEEKS</Text>
          </View>
          <View style={styles.skillPillSeek}>
            <Text style={styles.skillIcon}>{swapper.seeking.icon}</Text>
            <Text style={styles.skillName} numberOfLines={1}>
              {swapper.seeking.name}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer Actions */}
      <View style={styles.cardFooter}>
        <Text style={styles.locationText}>📍 {swapper.location}</Text>
        <TouchableOpacity
          style={[styles.proposeBtn, isRequested && styles.proposeBtnActive]}
          onPress={() => onProposeSwap(swapper)}
          activeOpacity={0.8}
        >
          <Text style={[styles.proposeBtnText, isRequested && styles.proposeBtnTextActive]}>
            {isRequested ? 'Requested ✓' : 'Propose Swap ⚡'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 20,
    elevation: 3,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },
  nameBlock: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  role: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  star: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  matchBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: '#10B981',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#059669',
  },
  swapBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 10,
    marginBottom: 14,
  },
  skillColumn: {
    flex: 1,
  },
  tagHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  offerDot: {
    fontSize: 8,
    color: '#6366F1',
    marginRight: 4,
  },
  seekDot: {
    fontSize: 8,
    color: '#EC4899',
    marginRight: 4,
  },
  tagLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  skillPillOffer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
  },
  skillPillSeek: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(236, 72, 153, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
  },
  skillIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  skillName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  arrowBox: {
    paddingHorizontal: 6,
  },
  arrowIcon: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#64748B',
  },
  proposeBtn: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  proposeBtnActive: {
    backgroundColor: '#10B981',
  },
  proposeBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  proposeBtnTextActive: {
    color: '#FFFFFF',
  },
});
