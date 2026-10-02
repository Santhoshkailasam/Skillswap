import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Swapper } from '../types';

interface SwapperDetailModalProps {
  swapper: Swapper | null;
  visible: boolean;
  onClose: () => void;
  onProposeSwap: (swapper: Swapper) => void;
  isRequested?: boolean;
}

export const SwapperDetailModal: React.FC<SwapperDetailModalProps> = ({
  swapper,
  visible,
  onClose,
  onProposeSwap,
  isRequested = false,
}) => {
  if (!swapper) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        
        <View style={styles.sheetContainer}>
          <View style={styles.handle} />

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header profile info */}
            <View style={styles.header}>
              <Image source={{ uri: swapper.avatar }} style={styles.avatar} />
              <View style={styles.headerInfo}>
                <Text style={styles.name}>{swapper.name}</Text>
                <Text style={styles.role}>{swapper.role}</Text>
                <View style={styles.ratingRow}>
                  <Text style={styles.star}>⭐</Text>
                  <Text style={styles.ratingText}>{swapper.rating}</Text>
                  <Text style={styles.reviewsText}>({swapper.reviewsCount} reviews)</Text>
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{swapper.matchScore}% Match</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Bio section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.bioText}>{swapper.bio}</Text>
            </View>

            {/* Logistics */}
            <View style={styles.infoGrid}>
              <View style={styles.infoCard}>
                <Text style={styles.infoIcon}>📍</Text>
                <Text style={styles.infoLabel}>LOCATION</Text>
                <Text style={styles.infoValue}>{swapper.location}</Text>
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoIcon}>⏰</Text>
                <Text style={styles.infoLabel}>AVAILABILITY</Text>
                <Text style={styles.infoValue}>{swapper.availability}</Text>
              </View>
            </View>

            {/* Offered Skill */}
            <View style={styles.skillBoxOffer}>
              <View style={styles.skillHeaderRow}>
                <Text style={styles.offerBadge}>OFFERING TO TEACH</Text>
                <Text style={styles.levelBadge}>{swapper.offering.level}</Text>
              </View>
              <View style={styles.skillTitleRow}>
                <Text style={styles.skillIconLarge}>{swapper.offering.icon}</Text>
                <Text style={styles.skillNameLarge}>{swapper.offering.name}</Text>
              </View>
            </View>

            {/* Seeking Skill */}
            <View style={styles.skillBoxSeek}>
              <View style={styles.skillHeaderRow}>
                <Text style={styles.seekBadge}>WANTS TO LEARN</Text>
                <Text style={styles.levelBadge}>{swapper.seeking.level}</Text>
              </View>
              <View style={styles.skillTitleRow}>
                <Text style={styles.skillIconLarge}>{swapper.seeking.icon}</Text>
                <Text style={styles.skillNameLarge}>{swapper.seeking.name}</Text>
              </View>
            </View>
          </ScrollView>

          {/* Action Button */}
          <TouchableOpacity
            style={[styles.actionBtn, isRequested && styles.actionBtnRequested]}
            onPress={() => {
              onProposeSwap(swapper);
              onClose();
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.actionBtnText}>
              {isRequested ? 'Swap Proposal Sent ✓' : 'Send Swap Request 🤝'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
  },
  backdrop: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    maxHeight: '85%',
    elevation: 10,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#6366F1',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  role: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  star: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#94A3B8',
    marginRight: 10,
  },
  badgeContainer: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  bioText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#94A3B8',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  skillBoxOffer: {
    backgroundColor: 'rgba(99, 102, 241, 0.06)',
    borderWidth: 1,
    borderColor: '#6366F1',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  skillBoxSeek: {
    backgroundColor: 'rgba(236, 72, 153, 0.06)',
    borderWidth: 1,
    borderColor: '#EC4899',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
  },
  skillHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  offerBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6366F1',
  },
  seekBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#EC4899',
  },
  levelBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  skillTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillIconLarge: {
    fontSize: 22,
    marginRight: 10,
  },
  skillNameLarge: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  actionBtn: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  actionBtnRequested: {
    backgroundColor: '#10B981',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
