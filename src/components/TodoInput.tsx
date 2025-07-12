import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

interface TodoInputProps {
  text: string;
  onTextChange: (text: string) => void;
  onAdd: () => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
}

export const TodoInput: React.FC<TodoInputProps> = ({
  text,
  onTextChange,
  onAdd,
  onCancel,
  showCancelButton = false
}) => {
  return (
    <View className="gap-4">
      <TextInput
        placeholder="新しいTodoを入力してください..."
        value={text}
        onChangeText={onTextChange}
        className="border-2 border-gray-200 rounded-xl p-4 text-base bg-white shadow-sm"
        placeholderTextColor="#999"
        multiline
        numberOfLines={3}
      />
      <View className="flex-row gap-3">
        {showCancelButton && onCancel && (
          <TouchableOpacity
            className="flex-1 bg-gray-300 rounded-xl py-4 justify-center items-center"
            onPress={onCancel}
          >
            <Text className="text-gray-700 text-base font-semibold">キャンセル</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className={`rounded-xl py-4 justify-center items-center ${
            showCancelButton ? 'flex-1' : 'w-full'
          } ${
            !text.trim()
              ? 'bg-gray-300'
              : 'bg-blue-500'
          }`}
          onPress={onAdd}
          disabled={!text.trim()}
        >
          <Text className={`text-base font-semibold ${
            !text.trim() ? 'text-gray-500' : 'text-white'
          }`}>
            追加
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
