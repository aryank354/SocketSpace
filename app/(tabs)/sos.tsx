import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { TriangleAlert as AlertTriangle, Shield, Phone } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function SOSScreen() {
  const { t } = useLanguage();
  const [tapCount, setTapCount] = useState(0);
  const [isActivated, setIsActivated] = useState(false);
  const resetTimeoutRef = useRef<NodeJS.Timeout>();

  const handleSOSTap = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }

    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    // Show notification for each tap
    Alert.alert(
      'SOS Tap',
      t('tapCount').replace('{count}', newTapCount.toString()),
      [{ text: 'OK' }],
      { cancelable: true }
    );

    if (newTapCount === 3) {
      setIsActivated(true);
      Alert.alert(
        t('sosActivated'),
        'Emergency services will be contacted immediately.',
        [{ text: 'OK' }]
      );
    } else {
      // Reset counter after 3 seconds if not completed
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
      resetTimeoutRef.current = setTimeout(() => {
        setTapCount(0);
      }, 3000);
    }
  };

  const resetSOS = () => {
    setTapCount(0);
    setIsActivated(false);
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }
  };

  if (isActivated) {
    return (
      <SafeAreaView style={[styles.container, styles.activatedContainer]}>
        <View style={styles.activatedContent}>
          <Shield size={80} color="#fff" />
          <Text style={styles.activatedTitle}>{t('sosActivated')}</Text>
          <Text style={styles.activatedSubtitle}>
            Emergency protocol is now active. Help is on the way.
          </Text>
          <View style={styles.emergencyActions}>
            <TouchableOpacity style={styles.callButton}>
              <Phone size={24} color="#fff" />
              <Text style={styles.callButtonText}>Call 911</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.resetButton} onPress={resetSOS}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.sosHeader}>
          <AlertTriangle size={60} color="#f97316" />
          <Text style={styles.title}>{t('sosWarning')}</Text>
          <Text style={styles.subtitle}>{t('sosDescription')}</Text>
        </View>

        <View style={styles.tapIndicator}>
          <Text style={styles.tapCountText}>
            {tapCount === 0 ? 'Tap to activate' : `${tapCount} / 3 taps`}
          </Text>
          <View style={styles.progressDots}>
            {[...Array(3)].map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index < tapCount && styles.activeDot
                ]}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.sosButton, tapCount > 0 && styles.sosButtonActive]}
          onPress={handleSOSTap}
          activeOpacity={0.8}
        >
          <Text style={styles.sosButtonText}>SOS</Text>
          <Text style={styles.sosButtonSubtext}>Emergency Activation</Text>
        </TouchableOpacity>

        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            🚨 This will contact emergency services
          </Text>
          <Text style={styles.warningSubtext}>
            Only use in real emergencies. Tap 3 times consecutively to activate.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  activatedContainer: {
    backgroundColor: '#dc2626',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activatedContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sosHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  activatedTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  activatedSubtitle: {
    fontSize: 18,
    color: '#fca5a5',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 40,
  },
  tapIndicator: {
    alignItems: 'center',
    marginBottom: 40,
  },
  tapCountText: {
    fontSize: 18,
    color: '#64748b',
    marginBottom: 16,
  },
  progressDots: {
    flexDirection: 'row',
    gap: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e2e8f0',
  },
  activeDot: {
    backgroundColor: '#f97316',
  },
  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#f97316',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  sosButtonActive: {
    backgroundColor: '#ea580c',
    transform: [{ scale: 1.05 }],
  },
  sosButtonText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  sosButtonSubtext: {
    fontSize: 14,
    color: '#fed7aa',
    marginTop: 4,
  },
  warningBox: {
    backgroundColor: '#fef3c7',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    alignItems: 'center',
  },
  warningText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    textAlign: 'center',
    marginBottom: 8,
  },
  warningSubtext: {
    fontSize: 14,
    color: '#a16207',
    textAlign: 'center',
    lineHeight: 20,
  },
  emergencyActions: {
    marginBottom: 40,
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: '#16a34a',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});