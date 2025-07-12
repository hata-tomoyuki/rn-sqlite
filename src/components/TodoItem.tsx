import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

/**
 * TodoItemコンポーネントのProps型定義
 */
interface TodoItemProps {
  id: number;                      // TodoのID
  text: string;                    // Todoのテキスト
  onDelete: (id: number) => void;  // 削除ボタンクリック時のコールバック
  onUpdate: (id: number, text: string) => void;  // 更新時のコールバック
}

/**
 * 個別のTodoアイテムコンポーネント
 * 表示、編集、削除機能を提供
 * インライン編集機能付き
 */
export const TodoItem: React.FC<TodoItemProps> = ({ id, text, onDelete, onUpdate }) => {
  // ローカル状態管理
  const [isEditing, setIsEditing] = useState(false);  // 編集モードの状態
  const [editText, setEditText] = useState(text);     // 編集用テキスト

  /**
   * 編集内容を保存する処理
   */
  const handleSave = async () => {
    if (editText.trim() && editText !== text) {
      await onUpdate(id, editText);
    }
    setIsEditing(false);
  };

  /**
   * 編集をキャンセルする処理
   */
  const handleCancel = () => {
    setEditText(text);  // 元のテキストに戻す
    setIsEditing(false);
  };

  // 編集モードの表示
  if (isEditing) {
    return (
      <View className="flex-row bg-white rounded-xl p-4 mb-3 items-center shadow-sm">
        {/* 編集用テキスト入力フィールド */}
        <TextInput
          value={editText}
          onChangeText={setEditText}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 mr-2"
          autoFocus
        />

        {/* 保存ボタン */}
        <TouchableOpacity
          className="bg-green-500 rounded-lg px-3 py-1.5 mr-2"
          onPress={handleSave}
        >
          <Text className="text-white text-sm font-medium">保存</Text>
        </TouchableOpacity>

        {/* キャンセルボタン */}
        <TouchableOpacity
          className="bg-gray-500 rounded-lg px-3 py-1.5 mr-2"
          onPress={handleCancel}
        >
          <Text className="text-white text-sm font-medium">キャンセル</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 通常表示モード
  return (
    <View className="flex-row bg-white rounded-xl p-4 mb-3 items-center shadow-sm">
      {/* Todoテキスト */}
      <View className="flex-1">
        <Text className="text-base text-gray-800 leading-6">{text}</Text>
      </View>

      {/* 編集ボタン */}
      <TouchableOpacity
        className="bg-blue-500 rounded-lg px-3 py-1.5 mr-2"
        onPress={() => setIsEditing(true)}
      >
        <Text className="text-white text-sm font-medium">編集</Text>
      </TouchableOpacity>

      {/* 削除ボタン */}
      <TouchableOpacity
        className="bg-red-500 rounded-lg px-3 py-1.5"
        onPress={() => onDelete(id)}
      >
        <Text className="text-white text-sm font-medium">削除</Text>
      </TouchableOpacity>
    </View>
  );
};
