import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

interface TodoItemProps {
  id: number;
  text: string;
  onDelete: (id: number) => void;
  onUpdate: (id: number, text: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ id, text, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = async () => {
    if (editText.trim() && editText !== text) {
      await onUpdate(id, editText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <View className="flex-row bg-white rounded-xl p-4 mb-3 items-center shadow-sm">
        <TextInput
          value={editText}
          onChangeText={setEditText}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 mr-2"
          autoFocus
        />
        <TouchableOpacity
          className="bg-green-500 rounded-lg px-3 py-1.5 mr-2"
          onPress={handleSave}
        >
          <Text className="text-white text-sm font-medium">保存</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray-500 rounded-lg px-3 py-1.5 mr-2"
          onPress={handleCancel}
        >
          <Text className="text-white text-sm font-medium">キャンセル</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-row bg-white rounded-xl p-4 mb-3 items-center shadow-sm">
      <View className="flex-1">
        <Text className="text-base text-gray-800 leading-6">{text}</Text>
      </View>
      <TouchableOpacity
        className="bg-blue-500 rounded-lg px-3 py-1.5 mr-2"
        onPress={() => setIsEditing(true)}
      >
        <Text className="text-white text-sm font-medium">編集</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-red-500 rounded-lg px-3 py-1.5"
        onPress={() => onDelete(id)}
      >
        <Text className="text-white text-sm font-medium">削除</Text>
      </TouchableOpacity>
    </View>
  );
};
