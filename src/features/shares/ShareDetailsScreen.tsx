import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  PanResponder,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Share } from './types';
import { ShareStatus } from '../../lib/constants';
import { getFullImageUrl } from '../../utils/imageUtils';
import { useAuth } from '../../contexts/AuthContext';
import { SharesStackParamList } from './SharesStack';
import ShareStatusTimeline from './components/ShareStatusTimeline';

type ShareDetailsNavigationProp = StackNavigationProp<SharesStackParamList, 'ShareDetails'>;
type ShareDetailsRouteProp = RouteProp<SharesStackParamList, 'ShareDetails'>;


export default function ShareDetailsScreen() {
  const navigation = useNavigation<ShareDetailsNavigationProp>();
  const route = useRoute<ShareDetailsRouteProp>();
  const { user } = useAuth();
  const { share } = route.params;
  const [imageError, setImageError] = useState(false);

  const { userBook, borrowerUser } = share;
  const { book, userId: ownerId, user: owner } = userBook;
  const hasValidThumbnail = book.thumbnailUrl && book.thumbnailUrl.trim() !== '' && !imageError;

  // Determine if current user is the owner or borrower
  const isOwner = user?.id === ownerId;
  const isBorrower = user?.id === share.borrower;

  // Swipe back gesture
  const screenWidth = Dimensions.get('window').width;
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return gestureState.dx > 20 && Math.abs(gestureState.dy) < 50;
    },
    onPanResponderMove: (evt, gestureState) => {
      // Could add visual feedback here
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > screenWidth * 0.3) {
        navigation.goBack();
      }
    },
  });

  const handleStatusUpdate = (newStatus: ShareStatus) => {
    // TODO: Implement API call to update status
    console.log('Update status to:', newStatus);
  };

  const handleDispute = () => {
    Alert.alert(
      'Report Issue',
      'Are you sure you want to report an issue with this share?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Report Issue',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement API call to set disputed status
            console.log('Set status to disputed');
          }
        }
      ]
    );
  };

  const formatReturnDate = (dateString: string | null) => {
    if (!dateString) return 'No return date set';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };


  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Share Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Book Info */}
      <View style={styles.bookInfo}>
        <View style={styles.thumbnail}>
          {hasValidThumbnail ? (
            <Image
              source={{ uri: getFullImageUrl(book.thumbnailUrl) }}
              style={styles.thumbnailImage}
              onError={() => setImageError(true)}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.thumbnailText}>No Cover</Text>
          )}
        </View>

        <View style={styles.bookDetails}>
          <Text style={styles.author}>{book.author}</Text>
          <Text style={styles.title}>{book.title}</Text>

          <View style={styles.detailsGroup}>
            {isBorrower && (
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Owner: </Text>
                {owner.firstName} {owner.lastName}
              </Text>
            )}
            {isOwner && (
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Borrower: </Text>
                {borrowerUser.firstName} {borrowerUser.lastName}
              </Text>
            )}
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Return by: </Text>
              {formatReturnDate(share.returnDate)}
            </Text>
          </View>
        </View>
      </View>

      {/* Status Timeline */}
      <ShareStatusTimeline
        share={share}
        isOwner={isOwner}
        isBorrower={isBorrower}
        onStatusUpdate={handleStatusUpdate}
      />

      {/* Dispute Button */}
      {share.status !== ShareStatus.Disputed && share.status !== ShareStatus.HomeSafe && (
        <TouchableOpacity style={styles.disputeButton} onPress={handleDispute}>
          <Text style={styles.disputeButtonText}>Report Issue</Text>
        </TouchableOpacity>
      )}

      {/* Disputed Status Warning */}
      {share.status === ShareStatus.Disputed && (
        <View style={styles.disputedWarning}>
          <Icon name="warning" size={20} color="#C4443C" />
          <Text style={styles.disputedText}>
            This share has been marked as disputed
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
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
  headerSpacer: {
    width: 40,
  },
  bookInfo: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  thumbnail: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  thumbnailText: {
    fontSize: 12,
    color: '#6B6B6B',
    textAlign: 'center',
  },
  bookDetails: {
    flex: 1,
  },
  author: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C3A5B',
    marginBottom: 12,
  },
  detailsGroup: {
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  detailLabel: {
    fontWeight: '600',
  },
  chatPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#f8f8f8',
    margin: 16,
    borderRadius: 8,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  chatPlaceholderText: {
    fontSize: 16,
    color: '#6B6B6B',
    fontStyle: 'italic',
  },
  disputeButton: {
    backgroundColor: '#C4443C',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disputeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disputedWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3CD',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFEAA7',
  },
  disputedText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#C4443C',
    fontWeight: '500',
  },
});