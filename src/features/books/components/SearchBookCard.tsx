import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Book } from '../types';
import { API_BASE_URL } from '../../../lib/constants';
import { bookCardStyles } from '../../../components/BookCardStyles';

interface SearchBookCardProps {
  book: Book;
  onBorrowPress?: (book: Book) => void;
}

export const SearchBookCard: React.FC<SearchBookCardProps> = ({ book, onBorrowPress }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  const hasValidThumbnail = book.thumbnailUrl && book.thumbnailUrl.trim() !== '' && !imageError;
  
  const getFullImageUrl = (thumbnailUrl: string) => {
    if (thumbnailUrl.startsWith('http://') || thumbnailUrl.startsWith('https://')) {
      return thumbnailUrl;
    }
    return `${API_BASE_URL}${thumbnailUrl.startsWith('/') ? '' : '/'}${thumbnailUrl}`;
  };
  
  return (
    <View style={bookCardStyles.container}>
      <View style={bookCardStyles.cardContent}>
        <View style={bookCardStyles.thumbnail}>
          {hasValidThumbnail ? (
            <Image
              source={{ uri: getFullImageUrl(book.thumbnailUrl) }}
              style={bookCardStyles.thumbnailImage}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
              resizeMode="cover"
            />
          ) : (
            <Text style={bookCardStyles.thumbnailText}>No Cover</Text>
          )}
        </View>
        
        <View style={bookCardStyles.contentArea}>
          <Text style={bookCardStyles.author}>{book.author}</Text>
          <Text style={bookCardStyles.title}>{book.title}</Text>
          
          <View style={bookCardStyles.actionButtons}>
            <TouchableOpacity 
              style={bookCardStyles.primaryButton}
              onPress={() => onBorrowPress?.(book)}
            >
              <Text style={bookCardStyles.primaryButtonText}>Request Book</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

