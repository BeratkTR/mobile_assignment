import { Tabs } from 'expo-router/js-tabs';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1e293b',
        tabBarInactiveTintColor: '#94a3b8',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Sözler',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 18, color }}>📖</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Kaydedilenler',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 18, color }}>🔖</Text>
          ),
        }}
      />
    </Tabs>
  );
}

