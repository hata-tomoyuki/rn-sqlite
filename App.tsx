import React, { useState } from 'react';
import { View, StatusBar, ActivityIndicator, Image, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TodoInput } from './src/components/TodoInput';
import { TodoList } from './src/components/TodoList';
import { TodoSearch } from './src/components/TodoSearch';
import { Modal } from './src/components/Modal';
import { useTodoDatabase } from './src/hooks/useTodoDatabase';
import "./global.css"

export default function App() {
  const [text, setText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const { todos, loading, addTodo, updateTodo, deleteTodo, searchTodos } = useTodoDatabase();

  const handleAddTodo = async () => {
    if (text.trim()) {
      const success = await addTodo(text);
      if (success) {
        setText('');
        setShowAddModal(false);
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

  const handleCloseAddModal = () => {
    setText('');
    setShowAddModal(false);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  if (loading) {
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View className="flex-1 justify-center items-center bg-gray-50">
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View className="flex-1 bg-gray-50">
        <View className='flex-1 py-12 px-5'>
          <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

          <View className='flex-row justify-center items-center mb-6'>
          <Text className="text-2xl font-bold text-gray-800 mb-4 text-center">Todoリスト</Text>
          <View className='flex-row justify-center items-center mb-4 gap-2'>
            <Image
              source={require('./assets/databaseparrot.gif')}
              className="w-8 h-8 self-center"
              resizeMode="contain"
            />
            <Text className='text-sm font-bold'>＜ SQLiteを使用！</Text>
          </View>
        </View>

          <View className="mb-6">
            <TouchableOpacity
              className="bg-blue-500 rounded-xl py-4 justify-center items-center"
              onPress={() => setShowAddModal(true)}
            >
              <Text className="text-white text-base font-semibold">新しいTodoを追加</Text>
            </TouchableOpacity>
          </View>

          <TodoSearch
            searchText={searchText}
            onSearchChange={handleSearchChange}
          />

          <TodoList
            todos={todos}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
          />

          {/* 追加モーダル */}
          <Modal
            visible={showAddModal}
            onClose={handleCloseAddModal}
            title="新しいTodoを追加"
          >
            <TodoInput
              text={text}
              onTextChange={setText}
              onAdd={handleAddTodo}
              onCancel={handleCloseAddModal}
              showCancelButton={true}
            />
          </Modal>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
