import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBookResult } from '../types';
import { bookCardStyles } from '../../../components/BookCardStyles';
import { getImageUrlFromId } from '../../../utils/imageUtils';

interface SearchBookCardProps {
  book: SearchBookResult;
  onBorrowPress?: (book: SearchBookResult) => void;
}

export const SearchBookCard: React.FC<SearchBookCardProps> = ({ book, onBorrowPress }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  const hasValidThumbnail = book.bookId && book.bookId > 0 && !imageError;
  
  return (
    <View style={bookCardStyles.container}>
      <View style={bookCardStyles.cardContent}>
        <View style={bookCardStyles.thumbnail}>
          {hasValidThumbnail ? (
            <Image
              source={{ uri: getImageUrlFromId(book.bookId) }}
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
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <Icon name="people" size={16} color="#6B6B6B" style={{ marginRight: 6 }} />
            <Text style={bookCardStyles.community}>{book.communityName}</Text>
          </View>
          
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

