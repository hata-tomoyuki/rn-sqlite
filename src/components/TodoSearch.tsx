import React from 'react';
import { View, TextInput } from 'react-native';

interface TodoSearchProps {
  searchText: string;
  onSearchChange: (text: string) => void;
}

export const TodoSearch: React.FC<TodoSearchProps> = ({ searchText, onSearchChange }) => {
  return (
    <View className="mb-4">
      <TextInput
        placeholder="Todoを検索..."
        value={searchText}
        onChangeText={onSearchChange}
        className="border-2 border-gray-200 rounded-xl p-4 text-base bg-white shadow-sm"
        placeholderTextColor="#999"
      />
    </View>
  );
};
