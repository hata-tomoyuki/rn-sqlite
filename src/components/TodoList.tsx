import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { TodoItem } from './TodoItem';

/**
 * Todoアイテムの型定義
 */
interface Todo {
  id: number;
  text: string;
}

/**
 * TodoListコンポーネントのProps型定義
 */
interface TodoListProps {
  todos: Todo[];                   // Todoリスト
  onDelete: (id: number) => void;  // 削除時のコールバック
  onUpdate: (id: number, text: string) => void;  // 更新時のコールバック
}

/**
 * Todoリスト表示コンポーネント
 * Todoアイテムの一覧表示と空の状態の表示を提供
 */
export const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onUpdate }) => {
  /**
   * 空のリスト状態の表示コンポーネント
   */
  const renderEmptyList = () => (
    <View className="justify-center items-center py-15">
      <Text className="text-lg font-semibold text-gray-600 mb-2">Todoがありません</Text>
      <Text className="text-sm text-gray-500 text-center">新しいTodoを追加してみましょう！</Text>
    </View>
  );

  return (
    <View className="flex-1">

      {/* Todoアイテムのリスト */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            id={item.id}
            text={item.text}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        )}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};
