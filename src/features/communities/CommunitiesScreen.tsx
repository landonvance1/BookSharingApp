import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { communitiesApi } from './api/communitiesApi';
import { CommunityWithMemberCount } from './types';
import { useAuth } from '../../contexts/AuthContext';

export default function CommunitiesScreen() {
  const [communities, setCommunities] = useState<CommunityWithMemberCount[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadCommunities();
  }, []);

  const loadCommunities = async () => {
    try {
      setLoading(true);
      if (!user?.id) {
        setCommunities([]);
        return;
      }
      const data = await communitiesApi.getUserCommunities(user.id);
      setCommunities(data);
    } catch (error) {
      console.error('Error loading communities:', error);
      Alert.alert('Error', 'Failed to load communities');
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveCommunity = async (communityId: number) => {
    if (!user?.id) return;
    
    Alert.alert(
      'Leave Community',
      'Are you sure you want to leave this community?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: async () => {
            try {
              await communitiesApi.leaveCommunity(communityId, user.id);
              await loadCommunities(); // Reload the list
            } catch (error) {
              console.error('Error leaving community:', error);
              Alert.alert('Error', 'Failed to leave community');
            }
          }
        }
      ]
    );
  };

  const renderCommunity = ({ item }: { item: CommunityWithMemberCount }) => (
    <View style={[styles.communityItem, !item.active && styles.inactiveCommunity]}>
      <View style={styles.communityInfo}>
        <Text style={[styles.communityName, !item.active && styles.inactiveText]}>{item.name}</Text>
        <Text style={[styles.memberCount, !item.active && styles.inactiveText]}>
          {item.memberCount || 0} {(item.memberCount || 0) === 1 ? 'member' : 'members'}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.leaveButton, !item.active && styles.inactiveButton]}
        onPress={() => handleLeaveCommunity(item.id)}
      >
        <Text style={[styles.leaveButtonText, !item.active && styles.inactiveText]}>Leave</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2D5A27" />
        <Text style={styles.loadingText}>Loading communities...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Communities</Text>
      {communities.length === 0 ? (
        <Text style={styles.subtitle}>No communities found</Text>
      ) : (
        <FlatList
          data={communities}
          renderItem={renderCommunity}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7F4',
    padding: 8,
    paddingTop: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F7F4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1C3A5B',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6B6B',
    textAlign: 'center',
    marginTop: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6B6B6B',
  },
  list: {
    flex: 1,
  },
  communityItem: {
    backgroundColor: '#FEFCF9',
    padding: 16,
    marginBottom: 8,
    marginHorizontal: 8,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#1C3A5B',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  inactiveCommunity: {
    backgroundColor: '#E8E6E3',
    opacity: 0.7,
  },
  communityInfo: {
    flex: 1,
  },
  communityName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C3A5B',
    marginBottom: 4,
  },
  memberCount: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  inactiveText: {
    color: '#6B6B6B',
  },
  leaveButton: {
    backgroundColor: '#C4443C',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  leaveButtonText: {
    color: '#FEFCF9',
    fontSize: 14,
    fontWeight: '500',
  },
  inactiveButton: {
    backgroundColor: '#8FA68E',
  },
});