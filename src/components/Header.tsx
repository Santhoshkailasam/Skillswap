import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  points: number;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, points }) => {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topRow}>
        <View style={styles.userProfile}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' }}
              style={styles.avatar}
            />
            <View style={styles.onlineStatus} />
          </View>
          <View style={styles.userTextContainer}>
            <Text style={styles.greetingText}>Welcome back 👋</Text>
            <Text style={styles.userName}>Alex Rivera</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.pointsBadge} activeOpacity={0.8}>
          <Text style={styles.pointsIcon}>⚡</Text>
          <View>
            <Text style={styles.pointsLabel}>SKILL PTS</Text>
            <Text style={styles.pointsValue}>{points} pts</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Hero Title & Pitch */}
      <View style={styles.heroBox}>
        <Text style={styles.heroTitle}>Swap Skills, Expand Horizons ✨</Text>
        <Text style={styles.heroSubtitle}>Teach what you love, learn what you need.</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search skills (e.g. Figma, Python, Piano)..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange('')} style={styles.clearBtn}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    elevation: 8,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#6366F1',
  },
  onlineStatus: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#0F172A',
  },
  userTextContainer: {
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  userName: {
    fontSize: 18,
    color: '#F8FAFC',
    fontWeight: '700',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderWidth: 1,
    borderColor: '#6366F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointsIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  pointsLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#818CF8',
    letterSpacing: 0.5,
  },
  pointsValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  heroBox: {
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#CBD5E1',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 14,
  },
  clearBtn: {
    padding: 4,
  },
  clearText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
