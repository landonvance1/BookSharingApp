import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, RefreshControl } from 'react-native';
import { BorrowCard } from './components/BorrowCard';
import { useShares } from './hooks/useShares';
import { Share } from './types';

export default function SharesScreen() {
  const { shares, loading, error, refreshShares } = useShares();

  const renderBorrowItem = ({ item }: { item: Share }) => (
    <BorrowCard share={item} />
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refreshShares} />
      }
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Borrows</Text>
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        {shares.length === 0 && !loading && !error && (
          <Text style={styles.emptyText}>No borrowed books found</Text>
        )}
        <FlatList
          data={shares}
          renderItem={renderBorrowItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </View>

      {/* Future section for books you're lending out */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Lent Books</Text>
        <Text style={styles.emptyText}>Coming soon...</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1C3A5B',
    paddingHorizontal: 16,
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