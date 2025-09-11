import { Tabs } from 'expo-router';
import { CustomTabBar } from '@/components/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Learn',
        }}
      />
      <Tabs.Screen
        name="sos"
        options={{
          title: 'SOS',
        }}
      />
      <Tabs.Screen
        name="ar"
        options={{
          title: 'AR',
        }}
      />
    </Tabs>
  );
}