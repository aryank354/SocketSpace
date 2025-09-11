import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, TrendingUp } from 'lucide-react-native';

const blogPosts = [
  {
    id: 1,
    title: "The Art of Self-Defense",
    description: "Master the fundamentals of personal protection with proven techniques that have been tested in real-world scenarios.",
    image: "https://images.pexels.com/photos/4753987/pexels-photo-4753987.jpeg?auto=compress&cs=tinysrgb&w=400",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Situational Awareness Mastery",
    description: "Develop your sixth sense for danger and learn to identify potential threats before they become problems.",
    image: "https://images.pexels.com/photos/5717634/pexels-photo-5717634.jpeg?auto=compress&cs=tinysrgb&w=400",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Emergency Response Protocols",
    description: "Essential steps to take during various emergency situations, from natural disasters to personal attacks.",
    image: "https://images.pexels.com/photos/5725953/pexels-photo-5725953.jpeg?auto=compress&cs=tinysrgb&w=400",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Mental Resilience Training",
    description: "Build unbreakable mental strength to stay calm and focused under pressure when it matters most.",
    image: "https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=400",
    readTime: "8 min read"
  }
];

export default function HomeScreen() {
  const { t } = useLanguage();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('blogTitle')}</Text>
            <Link href="/learn" asChild>
              <TouchableOpacity style={styles.learnButton}>
                <BookOpen size={20} color="#2563eb" />
                <Text style={styles.learnButtonText}>Start Learning</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <View style={styles.blogGrid}>
          {blogPosts.map((post) => (
            <TouchableOpacity key={post.id} style={styles.blogCard}>
              <Image source={{ uri: post.image }} style={styles.blogImage} />
              <View style={styles.blogContent}>
                <Text style={styles.blogTitle}>{post.title}</Text>
                <Text style={styles.blogDescription}>{post.description}</Text>
                <View style={styles.blogMeta}>
                  <TrendingUp size={14} color="#64748b" />
                  <Text style={styles.readTime}>{post.readTime}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  learnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  learnButtonText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
  blogGrid: {
    paddingHorizontal: 20,
    gap: 16,
    paddingBottom: 100,
  },
  blogCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  blogImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#e2e8f0',
  },
  blogContent: {
    padding: 16,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  blogDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 12,
  },
  blogMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  readTime: {
    fontSize: 12,
    color: '#64748b',
  },
});