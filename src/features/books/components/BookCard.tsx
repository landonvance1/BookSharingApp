import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onBorrowPress?: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onBorrowPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.author}>{book.author}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{book.title}</Text>
        
        <View style={styles.mainContent}>
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailText}>Book thumbnail here</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.borrowButton}
            onPress={() => onBorrowPress?.(book)}
          >
            <Text style={styles.borrowButtonText}>Ask to borrow button</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.description}>
          ISBN: {book.isbn}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  author: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  thumbnail: {
    width: 120,
    height: 160,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  thumbnailText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
  borrowButton: {
    borderWidth: 2,
    borderColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 4,
  },
  borrowButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    backgroundColor: '#000',
    padding: 16,
    paddingTop: 0,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});