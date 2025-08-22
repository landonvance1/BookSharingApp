import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, ActionSheetIOS, Platform } from 'react-native';
import { UserBook } from '../../books/types';
import { API_BASE_URL, BookStatus } from '../../../lib/constants';
import { bookCardStyles } from '../../../components/BookCardStyles';

interface LibraryBookCardProps {
  userBook: UserBook;
  onRemovePress: (userBookId: number) => void;
  onStatusChange: (userBookId: number, status: number) => void;
}

export const LibraryBookCard: React.FC<LibraryBookCardProps> = ({ userBook, onRemovePress, onStatusChange }) => {
  const [imageError, setImageError] = useState(false);
  
  const { book } = userBook;
  const hasValidThumbnail = book.thumbnailUrl && book.thumbnailUrl.trim() !== '' && !imageError;
  
  const getFullImageUrl = (thumbnailUrl: string) => {
    if (thumbnailUrl.startsWith('http://') || thumbnailUrl.startsWith('https://')) {
      return thumbnailUrl;
    }
    return `${API_BASE_URL}${thumbnailUrl.startsWith('/') ? '' : '/'}${thumbnailUrl}`;
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case BookStatus.Available:
        return 'Available';
      case BookStatus.OnLoan:
        return 'On Loan';
      case BookStatus.Unavailable:
        return 'Unavailable';
      default:
        return 'Unknown';
    }
  };

  const getStatusStyle = (status: number) => {
    switch (status) {
      case BookStatus.Available:
        return [bookCardStyles.statusContainer, bookCardStyles.statusAvailable];
      case BookStatus.OnLoan:
        return [bookCardStyles.statusContainer, bookCardStyles.statusOnLoan];
      case BookStatus.Unavailable:
        return [bookCardStyles.statusContainer, bookCardStyles.statusUnavailable];
      default:
        return [bookCardStyles.statusContainer, bookCardStyles.statusUnavailable];
    }
  };

  const handleRemovePress = () => {
    Alert.alert(
      'Remove Book',
      `Are you sure you want to remove "${book.title}" from your library?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => onRemovePress(userBook.id),
        },
      ]
    );
  };

  const handleStatusPress = () => {
    const statusOptions = [
      { label: 'Available', value: BookStatus.Available },
      { label: 'On Loan', value: BookStatus.OnLoan },
      { label: 'Unavailable', value: BookStatus.Unavailable },
    ];

    if (Platform.OS === 'ios') {
      const options = ['Cancel', ...statusOptions.map(s => s.label)];
      const cancelButtonIndex = 0;
      
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
          title: 'Change Status',
        },
        (buttonIndex) => {
          if (buttonIndex > 0 && buttonIndex <= statusOptions.length) {
            const selectedStatus = statusOptions[buttonIndex - 1];
            if (selectedStatus.value !== userBook.status) {
              onStatusChange(userBook.id, selectedStatus.value);
            }
          }
        }
      );
    } else {
      // Android - use Alert with buttons
      const buttons = statusOptions.map(option => ({
        text: option.label,
        onPress: () => {
          if (option.value !== userBook.status) {
            onStatusChange(userBook.id, option.value);
          }
        },
      }));
      
      buttons.push({
        text: 'Cancel',
        onPress: () => {}, // Do nothing on cancel
      });

      Alert.alert('Change Status', 'Select a new status for this book:', buttons);
    }
  };
  
  return (
    <View style={bookCardStyles.container}>
      <View style={bookCardStyles.header}>
        <Text style={bookCardStyles.author}>{book.author}</Text>
      </View>
      
      <View style={bookCardStyles.content}>
        <Text style={bookCardStyles.title}>{book.title}</Text>
        
        <View style={bookCardStyles.mainContent}>
          <View style={bookCardStyles.thumbnail}>
            {hasValidThumbnail ? (
              <Image
                source={{ uri: getFullImageUrl(book.thumbnailUrl) }}
                style={bookCardStyles.thumbnailImage}
                onError={() => {
                  setImageError(true);
                }}
                resizeMode="cover"
              />
            ) : (
              <Text style={bookCardStyles.thumbnailText}>No thumbnail</Text>
            )}
          </View>
          
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity 
              style={getStatusStyle(userBook.status)}
              onPress={handleStatusPress}
            >
              <Text style={bookCardStyles.statusText}>
                {getStatusText(userBook.status)} ▼
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={bookCardStyles.removeButton}
              onPress={handleRemovePress}
            >
              <Text style={bookCardStyles.removeButtonText}>Remove Book</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <View style={bookCardStyles.footer}>
        <Text style={bookCardStyles.description}>
          ISBN: {book.isbn}
        </Text>
      </View>
    </View>
  );
};