import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [todos, setTodos] = useState<{ id: number; text: string }[]>([]);
  const [text, setText] = useState('');

  // DB 初期化
  useEffect(() => {
    (async () => {
      const database = await SQLite.openDatabaseAsync('todo.db');
      await database.execAsync(
        'CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT);'
      );
      setDb(database);
      await fetchTodos(database);
    })();
  }, []);

  // Todo 取得
  const fetchTodos = async (database = db) => {
    if (!database) return;
    const rows = await database.getAllAsync<{ id: number; text: string }>('SELECT * FROM todos;');
    setTodos(rows);
  };

  // Todo 追加
  const addTodo = async () => {
    if (!text || !db) return;
    await db.runAsync('INSERT INTO todos (text) VALUES (?);', text);
    setText('');
    await fetchTodos();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="新しいTodoを入力"
        value={text}
        onChangeText={setText}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
      />
      <Button title="追加" onPress={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={{ padding: 10 }}>{item.text}</Text>}
      />
    </View>
  );
}
