import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { TodoItem } from './TodoItem';

interface Todo {
  id: number;
  text: string;
}

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, text: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onUpdate }) => {
  const renderEmptyList = () => (
    <View className="justify-center items-center py-15">
      <Text className="text-lg font-semibold text-gray-600 mb-2">Todoがありません</Text>
      <Text className="text-sm text-gray-500 text-center">新しいTodoを追加してみましょう！</Text>
    </View>
  );

  return (
    <View className="flex-1">
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
