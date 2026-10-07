import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';

interface LiveSwapItem {
  id: string;
  creatorName: string;
  avatar: string;
  teachSkill: string;
  learnSkill: string;
  category: string;
  level: string;
  timeAgo: string;
  proposalsCount: number;
}

const DEFAULT_CATEGORIES = [
  { id: 'all', name: 'All Skills', icon: '✦' },
  { id: 'code', name: 'Coding', icon: '💻' },
  { id: 'design', name: 'UI/UX', icon: '🎨' },
  { id: 'languages', name: 'Languages', icon: '🗣️' },
  { id: 'music', name: 'Music', icon: '🎸' },
  { id: 'business', name: 'Business', icon: '📈' },
];

export const DashboardScreen: React.FC = () => {
  // State management
  const [points, setPoints] = useState(240);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Swap Creator state
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [newTeachSkill, setNewTeachSkill] = useState('');
  const [newLearnSkill, setNewLearnSkill] = useState('');

  // Live Community Barter Feed
  const [communitySwaps, setCommunitySwaps] = useState<LiveSwapItem[]>([
    {
      id: 'swap-1',
      creatorName: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      teachSkill: 'Python & FastApi',
      learnSkill: 'Spanish Conversation',
      category: 'code',
      level: 'Advanced',
      timeAgo: '10m ago',
      proposalsCount: 3,
    },
    {
      id: 'swap-2',
      creatorName: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      teachSkill: 'Classical Piano & Chords',
      learnSkill: 'Digital Marketing & SEO',
      category: 'music',
      level: 'Expert',
      timeAgo: '25m ago',
      proposalsCount: 5,
    },
    {
      id: 'swap-3',
      creatorName: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      teachSkill: 'Calisthenics & Strength',
      learnSkill: 'Video Editing (Premiere)',
      category: 'business',
      level: 'Intermediate',
      timeAgo: '1h ago',
      proposalsCount: 2,
    },
    {
      id: 'swap-4',
      creatorName: 'Sophia Chen',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      teachSkill: 'Figma Design Systems',
      learnSkill: 'React Native Basics',
      category: 'design',
      level: 'Advanced',
      timeAgo: '2h ago',
      proposalsCount: 6,
    },
    {
      id: 'swap-5',
      creatorName: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
      teachSkill: 'French & German Fluency',
      learnSkill: 'Prompt Engineering',
      category: 'languages',
      level: 'Master',
      timeAgo: '3h ago',
      proposalsCount: 4,
    },
  ]);

  const [proposedSwapIds, setProposedSwapIds] = useState<string[]>([]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Broadcast a new swap
  const handleBroadcastSwap = () => {
    if (!newTeachSkill.trim() || !newLearnSkill.trim()) {
      showToast('⚠️ Please enter both skills to swap!');
      return;
    }

    const newPost: LiveSwapItem = {
      id: `swap-${Date.now()}`,
      creatorName: 'Kailasam (You)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      teachSkill: newTeachSkill.trim(),
      learnSkill: newLearnSkill.trim(),
      category: 'code',
      level: 'Expert',
      timeAgo: 'Just now',
      proposalsCount: 0,
    };

    setCommunitySwaps((prev) => [newPost, ...prev]);
    setPoints((prev) => prev + 25);
    setNewTeachSkill('');
    setNewLearnSkill('');
    setCreateModalVisible(false);
    showToast('🚀 Skill Swap Broadcasted! (+25 Credits Earned)');
  };

  const handleProposeSwap = (swapId: string, name: string) => {
    if (proposedSwapIds.includes(swapId)) {
      showToast(`Already sent a proposal to ${name}!`);
      return;
    }
    setProposedSwapIds((prev) => [...prev, swapId]);
    setPoints((prev) => prev + 25);
    showToast(`⚡ Proposal sent to ${name}! (+25 Credits)`);
  };

  // Filter community swaps by category
  const filteredSwaps = communitySwaps.filter((s) => {
    return selectedCategory === 'all' || s.category === selectedCategory;
  });

  return (
    <View style={styles.container}>
      {/* Toast Notification */}
      {toastMessage && (
        <View style={styles.toastContainer}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* 1. FIXED TOP HEADER WITH SOFT LIGHT INDIGO (#EEF2FF) BACKGROUND */}
      <View style={styles.fixedHeader}>
        <View style={styles.brandGroup}>
          <View style={styles.logoBadge}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.brandTitleCol}>
            <View style={styles.brandTextRow}>
              <Text style={styles.brandTextPrimary}>SKILL</Text>
              <Text style={styles.brandTextAccent}>SWAP</Text>
            </View>
            <Text style={styles.brandSubtag}>TALENT EXCHANGE</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.creditsBadge}
            onPress={() => showToast(`⚡ Your Balance: ${points} Skill Credits`)}
            activeOpacity={0.8}
          >
            <Text style={styles.creditsIcon}>⚡</Text>
            <Text style={styles.creditsNum}>{points}</Text>
            <Text style={styles.creditsUnit}>PTS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.newSwapBtn}
            onPress={() => setCreateModalVisible(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.newSwapBtnText}>+ Swap</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. SCROLLABLE FEED CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Category Filter Pills */}
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Skill Domains</Text>
            <Text style={styles.sectionBadge}>{filteredSwaps.length} Active</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {DEFAULT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryChip,
                    isSelected && styles.categoryChipActive,
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.categoryIcon}>{cat.icon}</Text>
                  <Text
                    style={[
                      styles.categoryLabel,
                      isSelected && styles.categoryLabelActive,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Live Community Barter Exchange Feed */}
        <View style={styles.feedSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Live Barter Exchange</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>HUB</Text>
            </View>
          </View>

          {filteredSwaps.map((item) => {
            const hasProposed = proposedSwapIds.includes(item.id);

            return (
              <View key={item.id} style={styles.swapCard}>
                {/* Header: User & Category */}
                <View style={styles.cardHeader}>
                  <Image source={{ uri: item.avatar }} style={styles.cardAvatar} />
                  <View style={styles.cardUserInfo}>
                    <Text style={styles.cardUserName}>{item.creatorName}</Text>
                    <Text style={styles.cardUserMeta}>
                      {item.timeAgo} • {item.level}
                    </Text>
                  </View>
                  <View style={styles.cardCatBadge}>
                    <Text style={styles.cardCatText}>
                      {item.category.toUpperCase()}
                    </Text>
                  </View>
                </View>

                {/* Trade Box */}
                <View style={styles.tradeBox}>
                  <View style={styles.tradeCol}>
                    <Text style={styles.tradeLabelTeach}>GIVES 🎓</Text>
                    <Text style={styles.tradeSkillTeach}>{item.teachSkill}</Text>
                  </View>
                  <View style={styles.arrowBox}>
                    <Text style={styles.tradeArrow}>⇄</Text>
                  </View>
                  <View style={styles.tradeCol}>
                    <Text style={styles.tradeLabelLearn}>WANTS 🎯</Text>
                    <Text style={styles.tradeSkillLearn}>{item.learnSkill}</Text>
                  </View>
                </View>

                {/* Footer: Count & Action */}
                <View style={styles.cardFooter}>
                  <Text style={styles.proposalsCount}>
                    💬 {item.proposalsCount} proposals
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.proposeBtn,
                      hasProposed && styles.proposeBtnDone,
                    ]}
                    onPress={() => handleProposeSwap(item.id, item.creatorName)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.proposeBtnText}>
                      {hasProposed ? '✓ Sent' : '⚡ Propose Swap (+25)'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Broadcast Swap Modal */}
      <Modal
        visible={createModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setCreateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalHeading}>Broadcast Skill Swap 🚀</Text>
              <TouchableOpacity
                onPress={() => setCreateModalVisible(false)}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubheading}>
              Connect with peers around the world by bartering what you know for what you need.
            </Text>

            <Text style={styles.inputLabel}>Skill You Can Teach 🎓</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. React Native, UI Design, Python..."
              placeholderTextColor="#94A3B8"
              value={newTeachSkill}
              onChangeText={setNewTeachSkill}
            />

            <Text style={styles.inputLabel}>Skill You Want To Learn 🎯</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Spanish, Video Editing, Piano..."
              placeholderTextColor="#94A3B8"
              value={newLearnSkill}
              onChangeText={setNewLearnSkill}
            />

            <TouchableOpacity
              style={styles.modalSubmitBtn}
              onPress={handleBroadcastSwap}
              activeOpacity={0.85}
            >
              <Text style={styles.modalSubmitBtnText}>⚡ Broadcast Swap (+25 Credits)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  toastContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 9999,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },

  /* Fixed Top Header with Soft Light Indigo Tint (#EEF2FF) */
  fixedHeader: {
    backgroundColor: '#EEF2FF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E7FF',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 100,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    marginRight: 10,
    overflow: 'hidden',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoImage: {
    width: 36,
    height: 36,
    borderRadius: 10,
  },
  brandTitleCol: {
    justifyContent: 'center',
  },
  brandTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTextPrimary: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.3,
  },
  brandTextAccent: {
    fontSize: 18,
    fontWeight: '900',
    color: '#4F46E5',
    letterSpacing: 0.3,
    marginLeft: 3,
  },
  brandSubtag: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#6366F1',
    letterSpacing: 1.1,
    marginTop: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  creditsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  creditsIcon: {
    fontSize: 13,
    color: '#F59E0B',
    marginRight: 3,
  },
  creditsNum: {
    fontSize: 13,
    fontWeight: '900',
    color: '#4F46E5',
  },
  creditsUnit: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#6366F1',
    marginLeft: 3,
  },
  newSwapBtn: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  newSwapBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  /* Scrollable Content */
  scrollContent: {
    paddingTop: 14,
    paddingBottom: 28,
  },

  /* Categories */
  categoriesSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  sectionBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4F46E5',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  categoryScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryChipActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  categoryIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  categoryLabelActive: {
    color: '#FFFFFF',
  },

  /* Feed Section */
  feedSection: {
    paddingHorizontal: 20,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  liveText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.5,
  },
  swapCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  cardUserInfo: {
    flex: 1,
  },
  cardUserName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  cardUserMeta: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  cardCatBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  cardCatText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#475569',
  },
  tradeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  tradeCol: {
    flex: 1,
  },
  tradeLabelTeach: {
    fontSize: 9,
    fontWeight: '800',
    color: '#16A34A',
    letterSpacing: 0.5,
  },
  tradeSkillTeach: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
    marginTop: 2,
  },
  arrowBox: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tradeArrow: {
    fontSize: 16,
    color: '#4F46E5',
    fontWeight: '900',
  },
  tradeLabelLearn: {
    fontSize: 9,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: 0.5,
  },
  tradeSkillLearn: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D4ED8',
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  proposalsCount: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  proposeBtn: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  proposeBtnDone: {
    backgroundColor: '#10B981',
  },
  proposeBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalCloseButton: {
    padding: 6,
  },
  modalCloseText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: 'bold',
  },
  modalSubheading: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 18,
    lineHeight: 18,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#334155',
    marginBottom: 6,
  },
  modalInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    color: '#0F172A',
    fontSize: 13,
    marginBottom: 16,
  },
  modalSubmitBtn: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  modalSubmitBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
