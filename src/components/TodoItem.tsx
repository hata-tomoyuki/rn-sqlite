import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface TodoItemProps {
  id: number;
  text: string;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ id, text, onDelete }) => {
  return (
    <View className="flex-row bg-white rounded-xl p-4 mb-3 items-center shadow-sm">
      <View className="flex-1">
        <Text className="text-base text-gray-800 leading-6">{text}</Text>
      </View>
      <TouchableOpacity
        className="bg-red-500 rounded-lg px-3 py-1.5 ml-3"
        onPress={() => onDelete(id)}
      >
        <Text className="text-white text-sm font-medium">削除</Text>
      </TouchableOpacity>
    </View>
  );
};
