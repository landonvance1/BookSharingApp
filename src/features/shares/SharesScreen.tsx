import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { BorrowCard } from './components/BorrowCard';
import { LendCard } from './components/LendCard';
import { useShares } from './hooks/useShares';
import { useLenderShares } from './hooks/useLenderShares';
import { Share } from './types';
import { SharesStackParamList } from './SharesStack';
import { useShareListNotificationCount } from '../notifications/hooks/useNotifications';
import { NotificationBadge } from '../notifications/components/NotificationBadge';

type SharesScreenNavigationProp = StackNavigationProp<SharesStackParamList, 'SharesList'>;

type TabType = 'borrows' | 'lends';

export default function SharesScreen() {
  const navigation = useNavigation<SharesScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<TabType>('borrows');
  const { shares, loading: borrowsLoading, error: borrowsError, refreshShares } = useShares();
  const { lenderShares, loading: lendsLoading, error: lendsError, refreshLenderShares } = useLenderShares();
  const scrollViewRef = React.useRef<any>(null);

  // Get notification counts for each tab
  const borrowsNotificationCount = useShareListNotificationCount(shares);
  const lendsNotificationCount = useShareListNotificationCount(lenderShares);

  // Refresh data when screen comes into focus (only refresh active tab)
  useFocusEffect(
    React.useCallback(() => {
      // Reset scroll position to top to avoid layout issues
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });

      if (activeTab === 'borrows') {
        refreshShares();
      } else {
        refreshLenderShares();
      }
    }, [activeTab, refreshShares, refreshLenderShares])
  );

  const renderBorrowItem = ({ item }: { item: Share }) => (
    <BorrowCard share={item} onArchiveSuccess={refreshShares} />
  );

  const renderLendItem = ({ item }: { item: Share }) => (
    <LendCard share={item} onArchiveSuccess={refreshLenderShares} />
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
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerPlaceholder} />
        <Text style={styles.headerTitle}>Shares</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ArchivedShares')}
          style={styles.archiveButton}
        >
          <Ionicons name="archive-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'borrows' && styles.activeTab]}
          onPress={() => setActiveTab('borrows')}
        >
          <View style={styles.tabContent}>
            <Text style={[styles.tabText, activeTab === 'borrows' && styles.activeTabText]}>
              My Borrows
            </Text>
          </View>
          <View style={styles.tabBadgeContainer}>
            <NotificationBadge count={borrowsNotificationCount} size="small" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'lends' && styles.activeTab]}
          onPress={() => setActiveTab('lends')}
        >
          <View style={styles.tabContent}>
            <Text style={[styles.tabText, activeTab === 'lends' && styles.activeTabText]}>
              My Lent Books
            </Text>
          </View>
          <View style={styles.tabBadgeContainer}>
            <NotificationBadge count={lendsNotificationCount} size="small" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        ref={scrollViewRef}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  headerPlaceholder: {
    width: 40,
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C3A5B',
    textAlign: 'center',
  },
  archiveButton: {
    padding: 8,
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
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tabBadgeContainer: {
    position: 'absolute',
    top: 6,
    right: 6,
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