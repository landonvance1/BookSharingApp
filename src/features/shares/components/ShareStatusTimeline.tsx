import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Share } from '../types';
import { ShareStatus } from '../../../lib/constants';

interface StatusStep {
  status: ShareStatus;
  label: string;
  description: string;
  actionLabel?: string;
}

const statusSteps: StatusStep[] = [
  {
    status: ShareStatus.Requested,
    label: 'Requested',
    description: 'Borrower has requested this book',
    actionLabel: 'Mark as Ready'
  },
  {
    status: ShareStatus.Ready,
    label: 'Ready',
    description: 'Book is ready for pickup',
    actionLabel: 'Mark as Picked Up'
  },
  {
    status: ShareStatus.PickedUp,
    label: 'Picked Up',
    description: 'Book has been picked up',
    actionLabel: 'Mark as Returned'
  },
  {
    status: ShareStatus.Returned,
    label: 'Returned',
    description: 'Book has been returned',
    actionLabel: 'Confirm Home Safe'
  },
  {
    status: ShareStatus.HomeSafe,
    label: 'Home Safe',
    description: 'Book is safely returned to owner'
  }
];

interface ShareStatusTimelineProps {
  share: Share;
  isOwner: boolean;
  isBorrower: boolean;
  onStatusUpdate?: (newStatus: ShareStatus) => void;
}

export default function ShareStatusTimeline({
  share,
  isOwner,
  isBorrower,
  onStatusUpdate
}: ShareStatusTimelineProps) {
  const getNextValidStatus = (currentStatus: ShareStatus): ShareStatus | null => {
    const currentIndex = statusSteps.findIndex(step => step.status === currentStatus);
    if (currentIndex === -1 || currentIndex === statusSteps.length - 1) {
      return null;
    }
    return statusSteps[currentIndex + 1].status;
  };

  const canUserProgressStatus = (currentStatus: ShareStatus): boolean => {
    switch (currentStatus) {
      case ShareStatus.Requested:
        return isOwner; // Only owner can mark as ready
      case ShareStatus.Ready:
        return isBorrower; // Only borrower can mark as picked up
      case ShareStatus.PickedUp:
        return isBorrower; // Only borrower can mark as returned
      case ShareStatus.Returned:
        return isOwner; // Only owner can confirm home safe
      default:
        return false;
    }
  };

  const handleStatusProgress = () => {
    const nextStatus = getNextValidStatus(share.status);
    if (!nextStatus || !canUserProgressStatus(share.status)) {
      return;
    }

    const currentStep = statusSteps.find(step => step.status === share.status);
    Alert.alert(
      'Update Status',
      `${currentStep?.actionLabel}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            if (onStatusUpdate) {
              onStatusUpdate(nextStatus);
            }
          }
        }
      ]
    );
  };

  const handleDecline = () => {
    Alert.alert(
      'Decline Share Request',
      'Are you sure you want to decline this share request?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Decline',
          style: 'destructive',
          onPress: () => {
            if (onStatusUpdate) {
              onStatusUpdate(ShareStatus.Declined);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.timelineContainer}>
      {statusSteps.map((step, index) => {
        const isCompleted = share.status > step.status;
        const isCurrent = share.status === step.status;
        const isNext = share.status === step.status - 1;
        const canProgress = isCurrent && canUserProgressStatus(share.status);

        return (
          <View key={step.status} style={styles.timelineStep}>
            <View style={styles.timelineRow}>
              <View style={[
                styles.timelineIcon,
                isCompleted && styles.timelineIconCompleted,
                isCurrent && styles.timelineIconCurrent
              ]}>
                {isCompleted ? (
                  <Icon name="checkmark" size={16} color="#fff" />
                ) : (
                  <Text style={[
                    styles.timelineIconText,
                    isCurrent && styles.timelineIconTextCurrent
                  ]}>
                    {index + 1}
                  </Text>
                )}
              </View>
              <View style={styles.timelineContent}>
                <Text style={[
                  styles.timelineLabel,
                  isCurrent && styles.timelineLabelCurrent
                ]}>
                  {step.label}
                </Text>
                <Text style={styles.timelineDescription}>
                  {step.description}
                </Text>
                {canProgress && step.actionLabel && (
                  <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                      style={styles.progressButton}
                      onPress={handleStatusProgress}
                    >
                      <Text style={styles.progressButtonText}>
                        {step.actionLabel}
                      </Text>
                    </TouchableOpacity>
                    {share.status === ShareStatus.Requested && isOwner && (
                      <TouchableOpacity
                        style={styles.declineButton}
                        onPress={handleDecline}
                      >
                        <Text style={styles.declineButtonText}>
                          Decline Share
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            </View>
            {index < statusSteps.length - 1 && (
              <View style={[
                styles.timelineLine,
                isCompleted && styles.timelineLineCompleted
              ]} />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  timelineContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  timelineStep: {
    marginBottom: 8,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  timelineIconCompleted: {
    backgroundColor: '#4CAF50',
  },
  timelineIconCurrent: {
    backgroundColor: '#007AFF',
  },
  timelineIconText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B6B6B',
  },
  timelineIconTextCurrent: {
    color: '#fff',
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 8,
  },
  timelineLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C3A5B',
    marginBottom: 2,
  },
  timelineLabelCurrent: {
    color: '#007AFF',
  },
  timelineDescription: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 8,
  },
  timelineLine: {
    position: 'absolute',
    left: 15,
    top: 32,
    width: 2,
    height: 24,
    backgroundColor: '#e0e0e0',
  },
  timelineLineCompleted: {
    backgroundColor: '#4CAF50',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  progressButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  progressButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  declineButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  declineButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});