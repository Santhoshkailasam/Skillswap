import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { ExploreScreen } from './src/screens/ExploreScreen';
import { SwapsScreen } from './src/screens/SwapsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { BottomNavBar, TabType } from './src/components/BottomNavBar';
import { CodePushService } from './src/services/CodePushService';

function App() {
  useEffect(() => {
    // Automatically check for Over-The-Air hotfixes on app startup
    CodePushService.checkForUpdates();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'explore':
        return <ExploreScreen />;
      case 'swaps':
        return <SwapsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>{renderScreen()}</View>
      <View style={{ paddingBottom: insets.bottom }}>
        <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});

export default App;
