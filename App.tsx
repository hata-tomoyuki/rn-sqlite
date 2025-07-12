import React, { useState } from 'react';
import { View, StatusBar, ActivityIndicator, Image, Text } from 'react-native';
import { TodoInput } from './src/components/TodoInput';
import { TodoList } from './src/components/TodoList';
import { TodoSearch } from './src/components/TodoSearch';
import { useTodoDatabase } from './src/hooks/useTodoDatabase';
import "./global.css"

export default function App() {
  const [text, setText] = useState('');
  const [searchText, setSearchText] = useState('');
  const { todos, loading, addTodo, updateTodo, deleteTodo, searchTodos } = useTodoDatabase();

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

  const handleUpdateTodo = async (id: number, newText: string) => {
    await updateTodo(id, newText);
  };

  const handleSearchChange = (searchValue: string) => {
    setSearchText(searchValue);
    searchTodos(searchValue);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 ">
      <View className='flex-1 py-20 px-5'>

        <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

        <View className='flex-row justify-center items-center mb-10 gap-2'>
          <Image
            source={require('./assets/databaseparrot.gif')}
            className="w-20 h-20 mb-5 self-center"
            resizeMode="contain"
          />
          <Text className='text-xl font-bold'>＜ SQLiteを使用！</Text>
        </View>

        <View className="flex-1 gap-5">
          <TodoInput
            text={text}
            onTextChange={setText}
            onAdd={handleAddTodo}
          />

          <TodoSearch
            searchText={searchText}
            onSearchChange={handleSearchChange}
          />

          <TodoList
            todos={todos}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
          />
        </View>
      </View>
    </View>
  );
}
