import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Share } from '../types';
import { ShareStatus } from '../../../lib/constants';
import { bookCardStyles } from '../../../components/BookCardStyles';
import { getFullImageUrl } from '../../../utils/imageUtils';
import { SharesStackParamList } from '../SharesStack';

type LendCardNavigationProp = StackNavigationProp<SharesStackParamList>;

interface LendCardProps {
  share: Share;
}

export const LendCard: React.FC<LendCardProps> = ({ share }) => {
  const [imageError, setImageError] = useState(false);
  const navigation = useNavigation<LendCardNavigationProp>();

  const { userBook, borrowerUser } = share;
  const { book } = userBook;
  const hasValidThumbnail = book.thumbnailUrl && book.thumbnailUrl.trim() !== '' && !imageError;

  const getStatusText = (status: number) => {
    switch (status) {
      case ShareStatus.Requested:
        return 'Requested';
      case ShareStatus.Ready:
        return 'Ready';
      case ShareStatus.PickedUp:
        return 'Picked Up';
      case ShareStatus.Returned:
        return 'Returned';
      case ShareStatus.HomeSafe:
        return 'Home Safe';
      case ShareStatus.Disputed:
        return 'Disputed';
      default:
        return 'Unknown';
    }
  };

  const formatReturnDate = (dateString: string | null) => {
    if (!dateString) return 'No return date set';

    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handlePress = () => {
    navigation.navigate('ShareDetails', { share });
  };

  return (
    <TouchableOpacity style={bookCardStyles.container} onPress={handlePress}>
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

          <View style={styles.detailsGroup}>
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Borrower: </Text>
              {borrowerUser.firstName} {borrowerUser.lastName}
            </Text>

            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Return by: </Text>
              {formatReturnDate(share.returnDate)}
            </Text>

            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Status: </Text>
              {getStatusText(share.status)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  detailsGroup: {
    marginTop: 8,
    gap: 2,
  },
  detailText: {
    color: '#6B6B6B',
    fontSize: 14,
    fontWeight: '400',
  },
  detailLabel: {
    fontWeight: '600',
  },
});