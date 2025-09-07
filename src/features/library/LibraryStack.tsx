import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LibraryScreen from './LibraryScreen';
import BarcodeScanner from './screens/BarcodeScanner';
import BookConfirmation from './screens/BookConfirmation';
import ExternalBookSearch from './screens/ExternalBookSearch';

export type LibraryStackParamList = {
  LibraryMain: { showSuccess?: boolean } | undefined;
  BarcodeScanner: undefined;
  ExternalBookSearch: undefined;
  BookConfirmation: {
    book: {
      id: number;
      title: string;
      author: string;
      thumbnailUrl: string;
    };
  };
};

const Stack = createStackNavigator<LibraryStackParamList>();

export function LibraryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="LibraryMain" 
        component={LibraryScreen}
      />
      <Stack.Screen
        name="BarcodeScanner"
        component={BarcodeScanner}
        options={{
          headerShown: true,
          title: 'Scan Book',
          headerBackTitle: '',
        }}
      />
      <Stack.Screen
        name="ExternalBookSearch"
        component={ExternalBookSearch}
        options={{
          headerShown: true,
          title: 'Add Book',
          headerBackTitle: '',
        }}
      />
      <Stack.Screen
        name="BookConfirmation"
        component={BookConfirmation}
        options={{
          headerShown: true,
          title: 'Add Book',
          headerBackTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}