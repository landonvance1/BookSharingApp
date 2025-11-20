import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, ActionSheetIOS, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserBook } from '../../books/types';
import { BookStatus } from '../../../lib/constants';
import { bookCardStyles } from '../../../components/BookCardStyles';
import { getFullImageUrl } from '../../../utils/imageUtils';

interface LibraryBookCardProps {
  userBook: UserBook;
  onRemovePress: (userBookId: number) => void;
  onStatusChange: (userBookId: number, status: number) => void;
}

export const LibraryBookCard: React.FC<LibraryBookCardProps> = ({ userBook, onRemovePress, onStatusChange }) => {
  const [imageError, setImageError] = useState(false);
  
  const { book } = userBook;
  const hasValidThumbnail = book.thumbnailUrl && book.thumbnailUrl.trim() !== '' && !imageError;

  const getStatusText = (status: number) => {
    switch (status) {
      case BookStatus.Available:
        return 'Available';
      case BookStatus.BeingShared:
        return 'Being Shared';
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
      case BookStatus.BeingShared:
        return [bookCardStyles.statusContainer, bookCardStyles.statusBeingShared];
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
      { label: 'Being Shared', value: BookStatus.BeingShared },
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
      <TouchableOpacity 
        style={bookCardStyles.trashIcon}
        onPress={handleRemovePress}
      >
        <Ionicons name="close" size={20} color="#C4443C" />
      </TouchableOpacity>
      
      <View style={bookCardStyles.cardContent}>
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
            <Text style={bookCardStyles.thumbnailText}>No Cover</Text>
          )}
        </View>
        
        <View style={bookCardStyles.contentArea}>
          <Text style={bookCardStyles.author}>{book.author}</Text>
          <Text style={bookCardStyles.title}>{book.title}</Text>
          
          <View style={bookCardStyles.actionButtons}>
            <TouchableOpacity 
              style={getStatusStyle(userBook.status)}
              onPress={handleStatusPress}
            >
              <Text style={bookCardStyles.statusText}>
                {getStatusText(userBook.status)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};