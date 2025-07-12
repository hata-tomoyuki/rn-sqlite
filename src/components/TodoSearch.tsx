import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

interface TodoSearchProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
}

export const TodoSearch: React.FC<TodoSearchProps> = ({
  searchText,
  onSearchChange,
  onCancel,
  showCancelButton = false
}) => {
  return (
    <View className="gap-4 mb-6">
      <TextInput
        placeholder="Todoを検索..."
        value={searchText}
        onChangeText={onSearchChange}
        className="border-2 border-gray-200 rounded-xl p-4 text-base bg-white shadow-sm"
        placeholderTextColor="#999"
      />
      {showCancelButton && onCancel && (
        <TouchableOpacity
          className="bg-gray-300 rounded-xl py-4 justify-center items-center"
          onPress={onCancel}
        >
          <Text className="text-gray-700 text-base font-semibold">閉じる</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
