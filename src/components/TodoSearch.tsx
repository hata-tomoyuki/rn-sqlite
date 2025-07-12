import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

/**
 * TodoSearchコンポーネントのProps型定義
 */
interface TodoSearchProps {
  searchText: string;              // 検索テキスト
  onSearchChange: (text: string) => void;  // 検索テキスト変更時のコールバック
  onCancel?: () => void;          // キャンセルボタンクリック時のコールバック（オプション）
  showCancelButton?: boolean;     // キャンセルボタンの表示フラグ（オプション）
}

/**
 * Todo検索フォームコンポーネント
 * リアルタイム検索機能を提供
 * モーダル内でも使用可能
 */
export const TodoSearch: React.FC<TodoSearchProps> = ({
  searchText,
  onSearchChange,
  onCancel,
  showCancelButton = false
}) => {
  return (
    <View className="gap-4">
      {/* 検索入力フィールド */}
      <TextInput
        placeholder="Todoを検索..."
        value={searchText}
        onChangeText={onSearchChange}
        className="border-2 border-gray-200 rounded-xl p-4 text-base bg-white shadow-sm"
        placeholderTextColor="#999"
      />

      {/* キャンセルボタン（条件付き表示） */}
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
