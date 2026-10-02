import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Header } from '../components/Header';
import { StatsSection } from '../components/StatsSection';
import { CategoriesFilter } from '../components/CategoriesFilter';
import { SwapperCard } from '../components/SwapperCard';
import { ActiveSessionCard } from '../components/ActiveSessionCard';
import { SwapperDetailModal } from '../components/SwapperDetailModal';
import { FEATURED_SWAPPERS, UPCOMING_SESSIONS } from '../data/mockData';
import { Swapper, SwapSession } from '../types';

export const DashboardScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSwapper, setSelectedSwapper] = useState<Swapper | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [requestedSwapperIds, setRequestedSwapperIds] = useState<string[]>([]);
  const [points, setPoints] = useState(240);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleProposeSwap = (swapper: Swapper) => {
    if (requestedSwapperIds.includes(swapper.id)) {
      showToast(`Already proposed a swap with ${swapper.name}!`);
      return;
    }

    setRequestedSwapperIds((prev) => [...prev, swapper.id]);
    setPoints((prev) => prev + 25);
    showToast(`Swap proposal sent to ${swapper.name}! (+25 Skill Pts) ⚡`);
  };

  const handleCardPress = (swapper: Swapper) => {
    setSelectedSwapper(swapper);
    setModalVisible(true);
  };

  const handleJoinSession = (session: SwapSession) => {
    Alert.alert(
      `Joining Session with ${session.partnerName}`,
      `Topic: ${session.teachingSkill} <-> ${session.learningSkill}\nStatus: ${session.status}`,
      [{ text: 'Start Virtual Room 📹' }]
    );
  };

  // Filter swappers based on search query & selected category
  const filteredSwappers = FEATURED_SWAPPERS.filter((s) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.offering.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.seeking.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      s.offering.category === selectedCategory ||
      s.seeking.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      {/* Toast Notification */}
      {toastMessage && (
        <View style={styles.toastContainer}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Top Header */}
        <View style={styles.codePushBanner}>
          <Text style={styles.codePushBannerText}>⚡ CodePush Live Hotfix v1.0.3 - Real-Time OTA Update Actives on your mobile store! 🚀</Text>
        </View>

        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          points={points}
        />

        {/* Quick Stats Grid */}
        <StatsSection
          completedSwaps={12}
          activeRequests={requestedSwapperIds.length + 1}
          rating={4.9}
          hoursLearned={18}
        />

        {/* Active Swap Sessions */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Active & Upcoming Sessions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>View Schedule →</Text>
          </TouchableOpacity>
        </View>

        {UPCOMING_SESSIONS.map((session) => (
          <ActiveSessionCard
            key={session.id}
            session={session}
            onJoinSession={handleJoinSession}
          />
        ))}

        {/* Categories Horizontal Scroll */}
        <CategoriesFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Recommended Skill Matches */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recommended Skill Swappers</Text>
          <Text style={styles.badgeCountText}>{filteredSwappers.length} Available</Text>
        </View>

        {filteredSwappers.length > 0 ? (
          filteredSwappers.map((swapper) => (
            <SwapperCard
              key={swapper.id}
              swapper={swapper}
              onPress={handleCardPress}
              onProposeSwap={handleProposeSwap}
              isRequested={requestedSwapperIds.includes(swapper.id)}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No matching swappers found</Text>
            <Text style={styles.emptySubtitle}>Try searching for a different skill or category</Text>
          </View>
        )}
      </ScrollView>

      {/* Swapper Detail Sheet Modal */}
      <SwapperDetailModal
        swapper={selectedSwapper}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onProposeSwap={handleProposeSwap}
        isRequested={selectedSwapper ? requestedSwapperIds.includes(selectedSwapper.id) : false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  codePushBanner: {
    backgroundColor: '#6366F1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  codePushBannerText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  toastContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 999,
    backgroundColor: '#1E293B',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#6366F1',
    elevation: 10,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6366F1',
  },
  badgeCountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
});
