import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

interface Todo {
  id: number;
  text: string;
}

export const useTodoDatabase = () => {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // DB 初期化
  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = async () => {
    try {
      const database = await SQLite.openDatabaseAsync('todo.db');
      await database.execAsync(
        'CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT);'
      );
      setDb(database);
      await fetchTodos(database);
    } catch (error) {
      console.error('データベース初期化エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  // Todo 取得
  const fetchTodos = async (database = db) => {
    if (!database) return;
    try {
      const rows = await database.getAllAsync<Todo>('SELECT * FROM todos ORDER BY id DESC;');
      setTodos(rows);
    } catch (error) {
      console.error('Todo取得エラー:', error);
    }
  };

  // Todo 追加
  const addTodo = async (text: string) => {
    if (!text.trim() || !db) return false;
    try {
      await db.runAsync('INSERT INTO todos (text) VALUES (?);', text.trim());
      await fetchTodos();
      return true;
    } catch (error) {
      console.error('Todo追加エラー:', error);
      return false;
    }
  };

  // Todo 編集
  const updateTodo = async (id: number, text: string) => {
    if (!text.trim() || !db) return false;
    try {
      await db.runAsync('UPDATE todos SET text = ? WHERE id = ?;', text.trim(), id);
      await fetchTodos();
      return true;
    } catch (error) {
      console.error('Todo編集エラー:', error);
      return false;
    }
  };

  // Todo 削除
  const deleteTodo = async (id: number) => {
    if (!db) return false;
    try {
      await db.runAsync('DELETE FROM todos WHERE id = ?;', id);
      await fetchTodos();
      return true;
    } catch (error) {
      console.error('Todo削除エラー:', error);
      return false;
    }
  };

  // Todo 検索
  const searchTodos = async (searchText: string) => {
    if (!db) return;
    try {
      if (!searchText.trim()) {
        await fetchTodos();
        return;
      }
      const rows = await db.getAllAsync<Todo>(
        'SELECT * FROM todos WHERE text LIKE ? ORDER BY id DESC;',
        `%${searchText.trim()}%`
      );
      setTodos(rows);
    } catch (error) {
      console.error('Todo検索エラー:', error);
    }
  };

  return {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
    searchTodos,
  };
};
