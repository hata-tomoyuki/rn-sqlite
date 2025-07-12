import React, { useState } from 'react';
import { View, StatusBar, ActivityIndicator, Image, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TodoInput } from './src/components/TodoInput';
import { TodoList } from './src/components/TodoList';
import { TodoSearch } from './src/components/TodoSearch';
import { Modal } from './src/components/Modal';
import { useTodoDatabase } from './src/hooks/useTodoDatabase';
import "./global.css"

/**
 * メインアプリケーションコンポーネント
 * SQLiteを使用したTodo管理アプリ
 */
export default function App() {
  // 状態管理
  const [text, setText] = useState(''); // 新しいTodoの入力テキスト
  const [searchText, setSearchText] = useState(''); // 検索テキスト
  const [showAddModal, setShowAddModal] = useState(false); // 追加モーダルの表示状態

  // データベース操作フック
  const { todos, loading, addTodo, updateTodo, deleteTodo, searchTodos } = useTodoDatabase();

  /**
   * 新しいTodoを追加する処理
   */
  const handleAddTodo = async () => {
    if (text.trim()) {
      const success = await addTodo(text);
      if (success) {
        setText(''); // 入力フィールドをクリア
        setShowAddModal(false); // モーダルを閉じる
      }
    }
  };

  /**
   * Todoを削除する処理
   */
  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
  };

  /**
   * Todoを更新する処理
   */
  const handleUpdateTodo = async (id: number, newText: string) => {
    await updateTodo(id, newText);
  };

  /**
   * 検索テキストが変更された時の処理
   */
  const handleSearchChange = (searchValue: string) => {
    setSearchText(searchValue);
    searchTodos(searchValue); // リアルタイム検索を実行
  };

  /**
   * 追加モーダルを閉じる処理
   */
  const handleCloseAddModal = () => {
    setText(''); // 入力フィールドをクリア
    setShowAddModal(false);
  };

  /**
   * キーボードを閉じる処理
   */
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // ローディング状態の表示
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
          {/* ステータスバーの設定 */}
          <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

          {/* ヘッダー部分 */}
          <View className='flex-row justify-center items-center mb-2'>
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

          {/* 新しいTodo追加ボタン */}
          <View className="mb-4">
            <TouchableOpacity
              className="bg-blue-500 rounded-xl py-4 justify-center items-center"
              onPress={() => setShowAddModal(true)}
            >
              <Text className="text-white text-base font-semibold">新しいTodoを追加</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-1 gap-8">
          {/* 検索フォーム */}
          <TodoSearch
            searchText={searchText}
            onSearchChange={handleSearchChange}
          />

          {/* Todoリスト */}
          <TodoList
            todos={todos}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
          />
          </View>

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
