import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { BorrowCard } from './components/BorrowCard';
import { LendCard } from './components/LendCard';
import { useShares } from './hooks/useShares';
import { useLenderShares } from './hooks/useLenderShares';
import { BorrowerShare, LenderShare } from './types';

type TabType = 'borrows' | 'lends';

export default function SharesScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('borrows');
  const { shares, loading: borrowsLoading, error: borrowsError, refreshShares } = useShares();
  const { lenderShares, loading: lendsLoading, error: lendsError, refreshLenderShares } = useLenderShares();

  const renderBorrowItem = ({ item }: { item: BorrowerShare }) => (
    <BorrowCard share={item} />
  );

  const renderLendItem = ({ item }: { item: LenderShare }) => (
    <LendCard share={item} />
  );

  const handleRefresh = async () => {
    if (activeTab === 'borrows') {
      await refreshShares();
    } else {
      await refreshLenderShares();
    }
  };

  const currentLoading = activeTab === 'borrows' ? borrowsLoading : lendsLoading;
  const currentError = activeTab === 'borrows' ? borrowsError : lendsError;
  const currentData = activeTab === 'borrows' ? shares : lenderShares;

  return (
    <View style={styles.container}>
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
              {activeTab === 'borrows' ? 'No borrowed books found' : 'No lent books found'}
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
    backgroundColor: '#1C3A5B',
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