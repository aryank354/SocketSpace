import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, Star, BookOpen, Target, Zap, Shield } from 'lucide-react-native';

const modules = [
  {
    id: 1,
    title: 'Basic Self-Defense',
    description: 'Learn fundamental techniques for personal protection',
    xp: 50,
    level: 1,
    progress: 85,
    icon: Shield,
    color: '#16a34a'
  },
  {
    id: 2,
    title: 'Situational Awareness',
    description: 'Develop skills to assess and respond to threats',
    xp: 75,
    level: 1,
    progress: 60,
    icon: Target,
    color: '#2563eb'
  },
  {
    id: 3,
    title: 'Emergency Response',
    description: 'Critical protocols for emergency situations',
    xp: 100,
    level: 2,
    progress: 30,
    icon: Zap,
    color: '#f97316'
  },
  {
    id: 4,
    title: 'Advanced Tactics',
    description: 'Master-level defensive strategies and techniques',
    xp: 150,
    level: 3,
    progress: 0,
    icon: Trophy,
    color: '#dc2626',
    locked: true
  }
];

export default function LearnScreen() {
  const { t } = useLanguage();
  const { isLoggedIn, username } = useAuth();
  const [userXP, setUserXP] = useState(285);
  const [userLevel, setUserLevel] = useState(2);

  const nextLevelXP = (userLevel + 1) * 200;
  const currentLevelXP = userLevel * 200;
  const progressToNext = ((userXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Header />
        <View style={styles.loginPrompt}>
          <BookOpen size={80} color="#64748b" />
          <Text style={styles.loginTitle}>Login Required</Text>
          <Text style={styles.loginSubtitle}>
            Please log in to access your personalized learning experience
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>{t('yourProgress')}</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>{username?.charAt(0).toUpperCase()}</Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>Welcome back, {username}!</Text>
                <Text style={styles.userStats}>{t('level')} {userLevel} • {userXP} {t('xp')}</Text>
              </View>
            </View>
            
            <View style={styles.levelProgress}>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${Math.max(0, Math.min(100, progressToNext))}%` }]} />
              </View>
              <Text style={styles.progressText}>
                {Math.max(0, nextLevelXP - userXP)} XP to {t('level')} {userLevel + 1}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.modulesSection}>
          <Text style={styles.sectionTitle}>{t('modules')}</Text>
          <View style={styles.modulesList}>
            {modules.map((module) => (
              <TouchableOpacity
                key={module.id}
                style={[styles.moduleCard, module.locked && styles.lockedModule]}
                disabled={module.locked}
              >
                <View style={[styles.moduleIcon, { backgroundColor: `${module.color}20` }]}>
                  <module.icon size={24} color={module.color} />
                </View>
                
                <View style={styles.moduleContent}>
                  <View style={styles.moduleHeader}>
                    <Text style={[styles.moduleTitle, module.locked && styles.lockedText]}>
                      {module.title}
                    </Text>
                    <View style={styles.moduleXP}>
                      <Star size={14} color="#f59e0b" />
                      <Text style={styles.xpText}>{module.xp} XP</Text>
                    </View>
                  </View>
                  
                  <Text style={[styles.moduleDescription, module.locked && styles.lockedText]}>
                    {module.description}
                  </Text>
                  
                  {!module.locked && (
                    <View style={styles.moduleProgress}>
                      <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, { width: `${module.progress}%` }]} />
                      </View>
                      <Text style={styles.progressText}>{module.progress}% Complete</Text>
                    </View>
                  )}
                  
                  {module.locked && (
                    <Text style={styles.lockedText}>
                      Unlock at {t('level')} {module.level}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.achievementsList}>
            <View style={styles.achievementCard}>
              <Trophy size={32} color="#f59e0b" />
              <Text style={styles.achievementTitle}>First Steps</Text>
              <Text style={styles.achievementDesc}>Completed first module</Text>
            </View>
            <View style={styles.achievementCard}>
              <Target size={32} color="#2563eb" />
              <Text style={styles.achievementTitle}>Quick Learner</Text>
              <Text style={styles.achievementDesc}>Reached Level 2</Text>
            </View>
            <View style={styles.achievementCard}>
              <Zap size={32} color="#16a34a" />
              <Text style={styles.achievementTitle}>Streak Master</Text>
              <Text style={styles.achievementDesc}>7 day learning streak</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
  },
  loginPrompt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 24,
    marginBottom: 12,
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  progressSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  userStats: {
    fontSize: 14,
    color: '#64748b',
  },
  levelProgress: {
    gap: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2563eb',
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'right',
  },
  modulesSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modulesList: {
    gap: 16,
  },
  moduleCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lockedModule: {
    opacity: 0.6,
  },
  moduleIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  moduleContent: {
    flex: 1,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  moduleXP: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  xpText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#92400e',
  },
  moduleDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 12,
  },
  moduleProgress: {
    gap: 6,
  },
  lockedText: {
    color: '#94a3b8',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  achievementsList: {
    paddingVertical: 8,
  },
  achievementCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    width: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 8,
    textAlign: 'center',
  },
  achievementDesc: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'center',
  },
});