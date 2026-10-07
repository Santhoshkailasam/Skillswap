import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
  Easing,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const { width } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  duration = 1800,
}) => {
  // Animation values
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(12)).current;
  const screenFadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Smooth entrance
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.spring(textTranslateY, {
        toValue: 0,
        friction: 6,
        tension: 50,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Smooth exit
    const exitTimer = setTimeout(() => {
      handleExit();
    }, duration);

    return () => {
      clearTimeout(exitTimer);
    };
  }, []);

  const handleExit = () => {
    Animated.timing(screenFadeOut, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      onFinish();
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: screenFadeOut,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" />

      <TouchableOpacity
        activeOpacity={1}
        onPress={handleExit}
        style={styles.centerContent}
      >
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <Image
            source={require('../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.textWrapper,
            {
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }],
            },
          ]}
        >
          <View style={styles.titleRow}>
            <Text style={styles.appName}>SKILL</Text>
            <Text style={[styles.appName, styles.appNameAccent]}>SWAP</Text>
          </View>

          <View style={styles.badgeContainer}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>PEER-TO-PEER TALENT EXCHANGE</Text>
          </View>

          <Text style={styles.tagline}>
            Teach what you love • Master what you need
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logoWrapper: {
    width: 110,
    height: 110,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#EEF2FF',
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 24,
  },
  textWrapper: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  appName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 3,
  },
  appNameAccent: {
    color: '#4F46E5',
    marginLeft: 3,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    marginBottom: 10,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#4F46E5',
    letterSpacing: 1.2,
  },
  tagline: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});
