import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

interface TodoInputProps {
  text: string;
  onTextChange: (text: string) => void;
  onAdd: () => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ text, onTextChange, onAdd }) => {
  return (
    <View className="flex-row mb-5 gap-2.5">
      <TextInput
        placeholder="新しいTodoを入力してください..."
        value={text}
        onChangeText={onTextChange}
        className="flex-1 border-2 border-gray-200 rounded-xl p-4 text-base bg-white shadow-sm"
        placeholderTextColor="#999"
      />
      <TouchableOpacity
        className={`rounded-xl px-6 py-4 justify-center items-center shadow-sm ${
          !text.trim()
            ? 'bg-gray-300'
            : 'bg-blue-500 shadow-blue-500/30'
        }`}
        onPress={onAdd}
        disabled={!text.trim()}
      >
        <Text className="text-white text-base font-semibold">追加</Text>
      </TouchableOpacity>
    </View>
  );
};
