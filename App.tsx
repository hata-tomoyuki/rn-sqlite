import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { TodoInput } from './src/components/TodoInput';
import { TodoList } from './src/components/TodoList';
import { useTodoDatabase } from './src/hooks/useTodoDatabase';

export default function App() {
  const [text, setText] = useState('');
  const { todos, loading, addTodo, deleteTodo } = useTodoDatabase();

  const handleAddTodo = async () => {
    if (text.trim()) {
      const success = await addTodo(text);
      if (success) {
        setText('');
      }
    }
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={styles.content}>
        <TodoInput
          text={text}
          onTextChange={setText}
          onAdd={handleAddTodo}
        />
        <TodoList
          todos={todos}
          onDelete={handleDeleteTodo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
});
