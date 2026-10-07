import React, { useEffect, useState, useRef } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Platform,
  Animated,
  Easing,
} from 'react-native';
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

    if (Platform.OS === 'android') {
      (StatusBar as any).setBackgroundColor?.('#EEF2FF', true);
      StatusBar.setBarStyle('dark-content', true);
    }
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <AppContent />
    </SafeAreaProvider>
  );
}

const TAB_ORDER: Record<TabType, number> = {
  dashboard: 0,
  explore: 1,
  swaps: 2,
  profile: 3,
};

function AppContent() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Animation values for smooth screen switching
  const screenFade = useRef(new Animated.Value(1)).current;
  const screenSlide = useRef(new Animated.Value(0)).current;

  const handleTabChange = (newTab: TabType) => {
    if (newTab === activeTab) return;

    const fromIndex = TAB_ORDER[activeTab];
    const toIndex = TAB_ORDER[newTab];
    const slideOffset = toIndex > fromIndex ? 18 : -18;

    // Reset entrance animation
    screenFade.setValue(0.2);
    screenSlide.setValue(slideOffset);

    setActiveTab(newTab);

    // Smooth screen cross-fade and directional slide
    Animated.parallel([
      Animated.timing(screenFade, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(screenSlide, {
        toValue: 0,
        friction: 7,
        tension: 110,
        useNativeDriver: true,
      }),
    ]).start();
  };

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
      <Animated.View
        style={[
          styles.content,
          {
            opacity: screenFade,
            transform: [{ translateX: screenSlide }],
          },
        ]}
      >
        {renderScreen()}
      </Animated.View>
      <View style={[styles.bottomContainer, { paddingBottom: insets.bottom }]}>
        <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF',
  },
  content: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  bottomContainer: {
    backgroundColor: '#F8FAFC',
  },
});

export default App;
