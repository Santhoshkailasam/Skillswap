import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

export const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Top Banner Header */}
      <View style={styles.header}>
        <View style={styles.profileRow}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' }}
            style={styles.avatar}
          />
          <View style={styles.profileText}>
            <Text style={styles.name}>Alex Rivera</Text>
            <Text style={styles.role}>React Native Developer</Text>
            <Text style={styles.location}>📍 San Francisco, CA</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit ✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Level & Points Bar */}
        <View style={styles.pointsBar}>
          <View style={styles.pointsItem}>
            <Text style={styles.pointsVal}>240 ⚡</Text>
            <Text style={styles.pointsLbl}>Skill Points</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.pointsItem}>
            <Text style={styles.pointsVal}>Level 4</Text>
            <Text style={styles.pointsLbl}>Master Swapper</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.pointsItem}>
            <Text style={styles.pointsVal}>4.9 ⭐</Text>
            <Text style={styles.pointsLbl}>Rating (14)</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Skills I Offer */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Skills I Offer (Teaching) 🎓</Text>
            <TouchableOpacity><Text style={styles.addText}>+ Add Skill</Text></TouchableOpacity>
          </View>

          <View style={styles.skillTag}>
            <Text style={styles.skillTagIcon}>📱</Text>
            <View style={styles.skillTagBody}>
              <Text style={styles.skillTagName}>React Native & Expo</Text>
              <Text style={styles.skillTagLevel}>Level: Advanced • 8 Sessions taught</Text>
            </View>
          </View>

          <View style={styles.skillTag}>
            <Text style={styles.skillTagIcon}>💻</Text>
            <View style={styles.skillTagBody}>
              <Text style={styles.skillTagName}>TypeScript & State Management</Text>
              <Text style={styles.skillTagLevel}>Level: Intermediate • 4 Sessions taught</Text>
            </View>
          </View>
        </View>

        {/* Skills I Want to Learn */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Skills I Want to Learn 🎯</Text>
            <TouchableOpacity><Text style={styles.addText}>+ Add Target</Text></TouchableOpacity>
          </View>

          <View style={[styles.skillTag, { backgroundColor: 'rgba(236, 72, 153, 0.06)' }]}>
            <Text style={styles.skillTagIcon}>🎨</Text>
            <View style={styles.skillTagBody}>
              <Text style={styles.skillTagName}>Figma & UI/UX Design Systems</Text>
              <Text style={styles.skillTagLevel}>Target: Beginner → Intermediate</Text>
            </View>
          </View>

          <View style={[styles.skillTag, { backgroundColor: 'rgba(245, 158, 11, 0.06)' }]}>
            <Text style={styles.skillTagIcon}>🇪🇸</Text>
            <View style={styles.skillTagBody}>
              <Text style={styles.skillTagName}>Conversational Spanish</Text>
              <Text style={styles.skillTagLevel}>Target: Conversational</Text>
            </View>
          </View>
        </View>

        {/* Quick Settings */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Account & Settings ⚙️</Text>
          <TouchableOpacity style={styles.menuRow}>
            <Text style={styles.menuText}>Notifications & Reminders</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuRow}>
            <Text style={styles.menuText}>Connected Video Call Services</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuRow}>
            <Text style={styles.menuText}>SkillSwap Verification & Badges</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
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
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#6366F1',
    marginRight: 14,
  },
  profileText: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  role: {
    fontSize: 12,
    color: '#CBD5E1',
    marginTop: 2,
  },
  location: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  editBtn: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  editBtnText: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '700',
  },
  pointsBar: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#334155',
  },
  pointsItem: {
    alignItems: 'center',
  },
  pointsVal: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  pointsLbl: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#334155',
  },
  scrollContent: {
    padding: 20,
  },
  sectionCard: {
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  addText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6366F1',
  },
  skillTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.06)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
  },
  skillTagIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  skillTagBody: {
    flex: 1,
  },
  skillTagName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  skillTagLevel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuText: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '600',
  },
  menuArrow: {
    fontSize: 14,
    color: '#94A3B8',
  },
});
