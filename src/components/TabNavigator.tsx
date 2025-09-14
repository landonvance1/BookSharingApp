import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { BookSearchPage } from '../features/books/components/BookSearchPage';
import { LibraryStack } from '../features/library/LibraryStack';
import SharesScreen from '../features/shares/SharesScreen';
import CommunitiesScreen from '../features/communities/CommunitiesScreen';
import SettingsScreen from '../features/settings/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string;

            switch (route.name) {
              case 'Search':
                iconName = focused ? 'search' : 'search-outline';
                break;
              case 'Library':
                iconName = focused ? 'library' : 'library-outline';
                break;
              case 'Shares':
                iconName = focused ? 'gift' : 'gift-outline';
                break;
              case 'Communities':
                iconName = focused ? 'people' : 'people-outline';
                break;
              case 'Settings':
                iconName = focused ? 'settings' : 'settings-outline';
                break;
              default:
                iconName = 'circle';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Search" component={BookSearchPage} />
        <Tab.Screen name="Library" component={LibraryStack} />
        <Tab.Screen name="Shares" component={SharesScreen} />
        <Tab.Screen name="Communities" component={CommunitiesScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
  );
}