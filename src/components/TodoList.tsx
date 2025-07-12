import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TodoItem } from './TodoItem';

interface Todo {
  id: number;
  text: string;
}

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => {
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Todoがありません</Text>
      <Text style={styles.emptySubtitle}>新しいTodoを追加してみましょう！</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todoリスト</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            id={item.id}
            text={item.text}
            onDelete={onDelete}
          />
        )}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
