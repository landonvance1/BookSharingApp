import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface NotificationBadgeProps {
  count: number;
  size?: 'small' | 'medium';
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count, size = 'small' }) => {
  if (count === 0) {
    return null;
  }

  const displayCount = count > 99 ? '99+' : count.toString();
  const isSmall = size === 'small';

  return (
    <View style={[styles.badge, isSmall ? styles.badgeSmall : styles.badgeMedium]}>
      <Text style={[styles.badgeText, isSmall ? styles.badgeTextSmall : styles.badgeTextMedium]}>
        {displayCount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 18,
    paddingHorizontal: 4,
  },
  badgeSmall: {
    height: 18,
    minWidth: 18,
  },
  badgeMedium: {
    height: 22,
    minWidth: 22,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '600',
  },
  badgeTextSmall: {
    fontSize: 11,
  },
  badgeTextMedium: {
    fontSize: 13,
  },
});
