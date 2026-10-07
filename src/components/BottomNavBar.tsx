import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
  Easing,
} from 'react-native';

export type TabType = 'dashboard' | 'explore' | 'swaps' | 'profile';

interface BottomNavBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadCount?: number;
}

// 1. Home Icon (Clean vector house)
const HomeIcon = ({ color, size = 18 }: { color: string; size?: number }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: 10,
        height: 10,
        borderTopWidth: 1.8,
        borderLeftWidth: 1.8,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
        position: 'absolute',
        top: 0.5,
      }}
    />
    <View
      style={{
        width: 12,
        height: 8,
        borderLeftWidth: 1.8,
        borderRightWidth: 1.8,
        borderBottomWidth: 1.8,
        borderColor: color,
        position: 'absolute',
        bottom: 1.5,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
      }}
    />
  </View>
);

// 2. Explore Icon (Clean vector magnifier)
const ExploreIcon = ({ color, size = 18 }: { color: string; size?: number }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: 11,
        height: 11,
        borderRadius: 5.5,
        borderWidth: 1.8,
        borderColor: color,
        position: 'absolute',
        top: 1,
        left: 1,
      }}
    />
    <View
      style={{
        width: 6,
        height: 1.8,
        backgroundColor: color,
        borderRadius: 1,
        transform: [{ rotate: '45deg' }],
        position: 'absolute',
        bottom: 2,
        right: 1.5,
      }}
    />
  </View>
);

// 3. Swaps Icon (Clean vector opposing transfer arrows)
const SwapsIcon = ({ color, size = 18 }: { color: string; size?: number }) => (
  <View style={{ width: size, height: size, justifyContent: 'center' }}>
    {/* Arrow right */}
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2.5 }}>
      <View style={{ width: 9, height: 1.8, backgroundColor: color, borderRadius: 1 }} />
      <View
        style={{
          width: 4.5,
          height: 4.5,
          borderTopWidth: 1.8,
          borderRightWidth: 1.8,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
          marginLeft: -2.5,
        }}
      />
    </View>
    {/* Arrow left */}
    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
      <View
        style={{
          width: 4.5,
          height: 4.5,
          borderBottomWidth: 1.8,
          borderLeftWidth: 1.8,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
          marginRight: -2.5,
        }}
      />
      <View style={{ width: 9, height: 1.8, backgroundColor: color, borderRadius: 1 }} />
    </View>
  </View>
);

// 4. Profile Icon (Clean vector user)
const ProfileIcon = ({ color, size = 18 }: { color: string; size?: number }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: 7,
        height: 7,
        borderRadius: 3.5,
        borderWidth: 1.8,
        borderColor: color,
        marginBottom: 1.5,
      }}
    />
    <View
      style={{
        width: 13,
        height: 6,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderWidth: 1.8,
        borderBottomWidth: 0,
        borderColor: color,
      }}
    />
  </View>
);

interface AnimatedTabItemProps {
  id: TabType;
  label: string;
  isActive: boolean;
  onPress: () => void;
  renderIcon: (color: string) => React.ReactNode;
  badge?: number;
}

const AnimatedTabItem: React.FC<AnimatedTabItemProps> = ({
  label,
  isActive,
  onPress,
  renderIcon,
  badge,
}) => {
  const pressScale = useRef(new Animated.Value(1)).current;
  const iconScale = useRef(new Animated.Value(isActive ? 1.08 : 1)).current;

  useEffect(() => {
    if (isActive) {
      // Smooth pop entrance sequence
      Animated.sequence([
        Animated.timing(iconScale, {
          toValue: 0.88,
          duration: 70,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.spring(iconScale, {
          toValue: 1.14,
          friction: 4,
          tension: 140,
          useNativeDriver: true,
        }),
        Animated.spring(iconScale, {
          toValue: 1.05,
          friction: 5,
          tension: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.spring(iconScale, {
        toValue: 1,
        friction: 6,
        tension: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [isActive]);

  const handlePressIn = () => {
    Animated.spring(pressScale, {
      toValue: 0.92,
      friction: 5,
      tension: 180,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressScale, {
      toValue: 1,
      friction: 4,
      tension: 140,
      useNativeDriver: true,
    }).start();
  };

  const activeColor = '#4F46E5';
  const inactiveColor = '#94A3B8';

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.tabItem}
    >
      <Animated.View
        style={[
          styles.tabContentColumn,
          {
            transform: [{ scale: pressScale }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.iconBubble,
            isActive && styles.iconBubbleActive,
            {
              transform: [{ scale: iconScale }],
            },
          ]}
        >
          {renderIcon(isActive ? activeColor : inactiveColor)}

          {badge && badge > 0 ? (
            <View style={styles.badgeIndicator} />
          ) : null}
        </Animated.View>

        {/* Text shown at the bottom of the icon by default for all tabs */}
        <Text
          style={[
            styles.tabLabel,
            isActive ? styles.tabLabelActive : styles.tabLabelInactive,
          ]}
        >
          {label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  unreadCount = 2,
}) => {
  const tabs: {
    id: TabType;
    label: string;
    renderIcon: (color: string) => React.ReactNode;
    badge?: number;
  }[] = [
    {
      id: 'dashboard',
      label: 'Home',
      renderIcon: (color) => <HomeIcon color={color} size={18} />,
    },
    {
      id: 'explore',
      label: 'Explore',
      renderIcon: (color) => <ExploreIcon color={color} size={18} />,
    },
    {
      id: 'swaps',
      label: 'Swaps',
      renderIcon: (color) => <SwapsIcon color={color} size={18} />,
      badge: unreadCount,
    },
    {
      id: 'profile',
      label: 'Profile',
      renderIcon: (color) => <ProfileIcon color={color} size={18} />,
    },
  ];

  return (
    <View style={styles.outerContainer}>
      <View style={styles.dock}>
        {tabs.map((tab) => (
          <AnimatedTabItem
            key={tab.id}
            id={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onPress={() => onTabChange(tab.id)}
            renderIcon={tab.renderIcon}
            badge={tab.badge}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 18,
    paddingBottom: Platform.OS === 'ios' ? 14 : 10,
    paddingTop: 4,
  },
  dock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    height: 58,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabContentColumn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBubble: {
    width: 36,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconBubbleActive: {
    backgroundColor: '#EEF2FF',
  },
  badgeIndicator: {
    position: 'absolute',
    top: 1,
    right: 5,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  tabLabel: {
    fontSize: 10.5,
    marginTop: 2,
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: '#4F46E5',
    fontWeight: '800',
  },
  tabLabelInactive: {
    color: '#94A3B8',
    fontWeight: '600',
  },
});
