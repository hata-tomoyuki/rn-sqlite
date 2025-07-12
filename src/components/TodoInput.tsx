import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

/**
 * TodoInputコンポーネントのProps型定義
 */
interface TodoInputProps {
  text: string;                    // 入力テキスト
  onTextChange: (text: string) => void;  // テキスト変更時のコールバック
  onAdd: () => void;              // 追加ボタンクリック時のコールバック
  onCancel?: () => void;          // キャンセルボタンクリック時のコールバック（オプション）
  showCancelButton?: boolean;     // キャンセルボタンの表示フラグ（オプション）
}

/**
 * Todo入力フォームコンポーネント
 * 新しいTodoの入力と追加機能を提供
 * モーダル内でも使用可能
 */
export const TodoInput: React.FC<TodoInputProps> = ({
  text,
  onTextChange,
  onAdd,
  onCancel,
  showCancelButton = false
}) => {
  return (
    <View className="gap-4">
      {/* テキスト入力フィールド */}
      <TextInput
        placeholder="新しいTodoを入力してください..."
        value={text}
        onChangeText={onTextChange}
        className="border-2 border-gray-200 rounded-xl p-4 text-base bg-white shadow-sm"
        placeholderTextColor="#999"
        multiline
        numberOfLines={3}
      />

      {/* ボタンエリア */}
      <View className="flex-row gap-3">
        {/* キャンセルボタン（条件付き表示） */}
        {showCancelButton && onCancel && (
          <TouchableOpacity
            className="flex-1 bg-gray-300 rounded-xl py-4 justify-center items-center"
            onPress={onCancel}
          >
            <Text className="text-gray-700 text-base font-semibold">キャンセル</Text>
          </TouchableOpacity>
        )}

        {/* 追加ボタン */}
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
