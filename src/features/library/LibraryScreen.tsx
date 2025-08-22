import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useUserBooks } from './hooks/useUserBooks';
import { useDebounceValue } from '../../hooks/useDebounceValue';
import { LibraryBookCard } from './components/LibraryBookCard';
import { UserBook } from '../books/types';
import { SearchInput } from '../../components/SearchInput';

export default function LibraryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounceValue(searchQuery, 300);
  const { userBooks, loading, error, updateUserBookStatus, removeUserBook } = useUserBooks();

  const filteredBooks = userBooks.filter(userBook => {
    if (!debouncedQuery.trim()) return true;
    
    const query = debouncedQuery.toLowerCase();
    const book = userBook.book;
    
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
  });

  const handleRemoveBook = async (userBookId: number) => {
    try {
      await removeUserBook(userBookId);
    } catch (error) {
      console.error('Failed to remove book:', error);
    }
  };

  const handleStatusChange = async (userBookId: number, status: number) => {
    try {
      await updateUserBookStatus(userBookId, status);
    } catch (error) {
      console.error('Failed to update book status:', error);
    }
  };

  const renderBookCard = ({ item }: { item: UserBook }) => (
    <LibraryBookCard 
      userBook={item} 
      onRemovePress={handleRemoveBook}
      onStatusChange={handleStatusChange}
    />
  );

  if (loading && userBooks.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading your library...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput
          placeholder="Search your books..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {userBooks.length === 0 && !loading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Your Library is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Books you add to your library will appear here
          </Text>
        </View>
      ) : filteredBooks.length === 0 && debouncedQuery.trim() ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No books found</Text>
          <Text style={styles.emptySubtitle}>
            Try a different search term
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredBooks}
          renderItem={renderBookCard}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#fee',
    margin: 16,
    borderRadius: 8,
  },
  errorText: {
    color: '#d00',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    paddingVertical: 8,
  },
});