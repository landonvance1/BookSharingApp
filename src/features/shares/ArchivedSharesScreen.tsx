import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { BorrowCard } from './components/BorrowCard';
import { LendCard } from './components/LendCard';
import { useArchivedShares } from './hooks/useArchivedShares';
import { useArchivedLenderShares } from './hooks/useArchivedLenderShares';
import { Share } from './types';
import { SharesStackParamList } from './SharesStack';

type TabType = 'borrows' | 'lends';
type ArchivedSharesNavigationProp = StackNavigationProp<SharesStackParamList, 'ArchivedShares'>;

export default function ArchivedSharesScreen() {
  const navigation = useNavigation<ArchivedSharesNavigationProp>();
  const [activeTab, setActiveTab] = useState<TabType>('borrows');
  const { archivedShares, loading: borrowsLoading, error: borrowsError, refreshArchivedShares } = useArchivedShares();
  const { archivedLenderShares, loading: lendsLoading, error: lendsError, refreshArchivedLenderShares } = useArchivedLenderShares();

  // Refresh data when screen comes into focus (only refresh active tab)
  useFocusEffect(
    React.useCallback(() => {
      if (activeTab === 'borrows') {
        refreshArchivedShares();
      } else {
        refreshArchivedLenderShares();
      }
    }, [activeTab, refreshArchivedShares, refreshArchivedLenderShares])
  );

  const renderBorrowItem = ({ item }: { item: Share }) => (
    <BorrowCard share={item} showUnarchive onArchiveSuccess={refreshArchivedShares} />
  );

  const renderLendItem = ({ item }: { item: Share }) => (
    <LendCard share={item} showUnarchive onArchiveSuccess={refreshArchivedLenderShares} />
  );

  const handleRefresh = async () => {
    if (activeTab === 'borrows') {
      await refreshArchivedShares();
    } else {
      await refreshArchivedLenderShares();
    }
  };

  const currentLoading = activeTab === 'borrows' ? borrowsLoading : lendsLoading;
  const currentError = activeTab === 'borrows' ? borrowsError : lendsError;
  const currentData = activeTab === 'borrows' ? archivedShares : archivedLenderShares;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Archived Shares</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'borrows' && styles.activeTab]}
          onPress={() => setActiveTab('borrows')}
        >
          <Text style={[styles.tabText, activeTab === 'borrows' && styles.activeTabText]}>
            My Borrows
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'lends' && styles.activeTab]}
          onPress={() => setActiveTab('lends')}
        >
          <Text style={[styles.tabText, activeTab === 'lends' && styles.activeTabText]}>
            My Lent Books
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={currentLoading} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.section}>
          {currentError && (
            <Text style={styles.errorText}>{currentError}</Text>
          )}
          {currentData.length === 0 && !currentLoading && !currentError && (
            <Text style={styles.emptyText}>
              {activeTab === 'borrows' ? 'No archived borrows' : 'No archived lent books'}
            </Text>
          )}
          <FlatList
            data={currentData}
            renderItem={activeTab === 'borrows' ? renderBorrowItem : renderLendItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B6B6B',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 20,
  },
  errorText: {
    color: '#C4443C',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B6B6B',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
    paddingHorizontal: 16,
  },
});
