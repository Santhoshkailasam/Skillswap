import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const TRENDING_SKILLS = [
  { name: 'React Native & Expo', category: 'Coding', learners: 1420, icon: '📱', color: '#6366F1' },
  { name: 'UI/UX Design Systems', category: 'Design', learners: 980, icon: '🎨', color: '#EC4899' },
  { name: 'Spanish Conversation', category: 'Languages', learners: 1840, icon: '🇪🇸', color: '#F59E0B' },
  { name: 'Python for AI & Data', category: 'Coding', learners: 2150, icon: '🐍', color: '#10B981' },
  { name: 'Guitar & Songwriting', category: 'Music', learners: 640, icon: '🎸', color: '#8B5CF6' },
  { name: 'SEO & Content Growth', category: 'Business', learners: 890, icon: '🚀', color: '#3B82F6' },
];

export const ExploreScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Skills & Community 🌎</Text>
        <Text style={styles.headerSubtitle}>Discover in-demand skills offered by global peers</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Trending Badge */}
        <Text style={styles.sectionTitle}>🔥 Trending Skills to Learn</Text>

        <View style={styles.grid}>
          {TRENDING_SKILLS.map((skill, index) => (
            <TouchableOpacity key={index} style={styles.card} activeOpacity={0.8}>
              <View style={[styles.iconCircle, { backgroundColor: `${skill.color}15` }]}>
                <Text style={styles.cardIcon}>{skill.icon}</Text>
              </View>
              <Text style={styles.skillName}>{skill.name}</Text>
              <Text style={styles.categoryName}>{skill.category}</Text>

              <View style={styles.footerRow}>
                <Text style={styles.learnersText}>👥 {skill.learners} swappers</Text>
                <Text style={[styles.exploreTag, { color: skill.color }]}>Explore →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* How SkillSwap Works Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>How SkillSwap Works 💡</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>1</Text>
            <Text style={styles.stepText}>List skills you can teach and skills you want to learn.</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>2</Text>
            <Text style={styles.stepText}>Get matched with peers based on mutual skill interest.</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>3</Text>
            <Text style={styles.stepText}>Schedule 1-on-1 virtual sessions and earn Skill Points!</Text>
          </View>
        </View>
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
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
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
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%',
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
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 22,
  },
  skillName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  categoryName: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  footerRow: {
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  learnersText: {
    fontSize: 10,
    color: '#94A3B8',
  },
  exploreTag: {
    fontSize: 11,
    fontWeight: '800',
  },
  banner: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 20,
    marginTop: 8,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6366F1',
    color: '#FFFFFF',
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 28,
    marginRight: 12,
  },
  stepText: {
    fontSize: 13,
    color: '#CBD5E1',
    flex: 1,
    lineHeight: 18,
  },
});
