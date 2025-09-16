import React, { useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Share } from '../types';
import { ShareStatus } from '../../../lib/constants';
import { bookCardStyles } from '../../../components/BookCardStyles';
import { getFullImageUrl } from '../../../utils/imageUtils';

interface ShareBookCardProps {
  share: Share;
  showOwner?: boolean;
  showReturnDate?: boolean;
}

export const ShareBookCard: React.FC<ShareBookCardProps> = ({
  share,
  showOwner = true,
  showReturnDate = true
}) => {
  const [imageError, setImageError] = useState(false);

  const { userBook } = share;
  const { book, user } = userBook;
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

  return (
    <View style={bookCardStyles.container}>
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
            {showOwner && (
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Owner: </Text>
                {user.firstName} {user.lastName}
              </Text>
            )}

            {showReturnDate && (
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Return by: </Text>
                {formatReturnDate(share.returnDate)}
              </Text>
            )}

            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Status: </Text>
              {getStatusText(share.status)}
            </Text>
          </View>
        </View>
      </View>
    </View>
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