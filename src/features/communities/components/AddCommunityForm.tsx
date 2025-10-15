import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { communitiesApi } from '../api/communitiesApi';

interface AddCommunityFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddCommunityForm({ onSuccess, onCancel }: AddCommunityFormProps) {
  const [communityName, setCommunityName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    setError('');

    if (!communityName.trim()) {
      setError('Please enter a community name');
      return;
    }

    try {
      setIsCreating(true);
      await communitiesApi.addCommunity(communityName.trim());
      setCommunityName('');
      onSuccess();
    } catch (error) {
      console.error('Error creating community:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create community';
      setError(errorMessage);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setCommunityName('');
    setError('');
    onCancel();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Community Name"
        placeholderTextColor="#999"
        value={communityName}
        onChangeText={(text) => {
          setCommunityName(text);
          if (error) setError('');
        }}
        editable={!isCreating}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}
          disabled={isCreating}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.createButton, isCreating && styles.disabledButton]}
          onPress={handleCreate}
          disabled={isCreating}
        >
          {isCreating ? (
            <ActivityIndicator size="small" color="#FEFCF9" />
          ) : (
            <Text style={styles.createButtonText}>Create</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEFCF9',
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 8,
    borderRadius: 12,
    shadowColor: '#1C3A5B',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    backgroundColor: '#F9F7F4',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1C3A5B',
    marginBottom: 8,
  },
  errorText: {
    color: '#C4443C',
    fontSize: 14,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E8E6E3',
  },
  cancelButtonText: {
    color: '#1C3A5B',
    fontSize: 16,
    fontWeight: '600',
  },
  createButton: {
    backgroundColor: '#007AFF',
  },
  createButtonText: {
    color: '#FEFCF9',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
});
