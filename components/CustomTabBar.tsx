import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BookOpen, CircleAlert as AlertCircle, Camera } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import * as Haptics from 'expo-haptics';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { t } = useLanguage();

  const getIcon = (routeName: string, focused: boolean) => {
    const size = routeName === 'sos' ? 32 : 24;
    const color = focused ? '#2563eb' : '#64748b';

    switch (routeName) {
      case 'index':
        return <BookOpen size={size} color={color} />;
      case 'sos':
        return <AlertCircle size={size} color="#fff" />;
      case 'ar':
        return <Camera size={size} color={color} />;
      default:
        return null;
    }
  };

  const getLabel = (routeName: string) => {
    switch (routeName) {
      case 'index':
        return t('learn');
      case 'sos':
        return t('sos');
      case 'ar':
        return t('ar');
      default:
        return '';
    }
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const isSOS = route.name === 'sos';

        const onPress = () => {
          if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={[styles.tab, isSOS && styles.sosTab]}
          >
            <View style={[styles.iconContainer, isSOS && styles.sosIcon]}>
              {getIcon(route.name, isFocused)}
            </View>
            {!isSOS && (
              <Text style={[styles.label, { color: isFocused ? '#2563eb' : '#64748b' }]}>
                {getLabel(route.name)}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  sosTab: {
    flex: 0.8,
    marginTop: -20,
  },
  iconContainer: {
    padding: 8,
  },
  sosIcon: {
    backgroundColor: '#f97316',
    borderRadius: 32,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});