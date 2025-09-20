import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SharesScreen from './SharesScreen';
import ShareDetailsScreen from './ShareDetailsScreen';
import { Share } from './types';

export type SharesStackParamList = {
  SharesList: undefined;
  ShareDetails: { share: Share };
};

const Stack = createStackNavigator<SharesStackParamList>();

export const SharesStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SharesList" component={SharesScreen} />
      <Stack.Screen name="ShareDetails" component={ShareDetailsScreen} />
    </Stack.Navigator>
  );
};