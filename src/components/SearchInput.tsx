import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchInputProps extends Omit<TextInputProps, 'returnKeyType' | 'returnKeyLabel'> {
  placeholder?: string;
  onSubmitSearch?: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  onSubmitSearch,
  value,
  onChangeText,
  style,
  ...props
}) => {
  const handleSubmitEditing = () => {
    if (onSubmitSearch && value && typeof value === 'string' && value.trim()) {
      onSubmitSearch(value.trim());
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Icon 
        name="search" 
        size={20} 
        color="#666" 
        style={styles.icon} 
      />
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        clearButtonMode="while-editing"
        returnKeyType="search"
        returnKeyLabel="Search"
        onSubmitEditing={handleSubmitEditing}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
});