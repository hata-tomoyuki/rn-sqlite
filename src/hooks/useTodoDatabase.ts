import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

/**
 * Todoアイテムの型定義
 */
interface Todo {
  id: number;
  text: string;
}

/**
 * SQLiteデータベースを使用したTodo管理カスタムフック
 * CRUD操作（作成、読み取り、更新、削除）と検索機能を提供
 */
export const useTodoDatabase = () => {
  // 状態管理
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null); // データベースインスタンス
  const [todos, setTodos] = useState<Todo[]>([]); // Todoリスト
  const [loading, setLoading] = useState(true); // ローディング状態

  /**
   * データベースの初期化処理
   * アプリ起動時に一度だけ実行される
   */
  useEffect(() => {
    initializeDatabase();
  }, []);

  /**
   * データベースの初期化とテーブル作成
   */
  const initializeDatabase = async () => {
    try {
      // データベースを開く（存在しない場合は作成される）
      const database = await SQLite.openDatabaseAsync('todo.db');

      // todosテーブルを作成（存在しない場合のみ）
      await database.execAsync(
        'CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT);'
      );

      setDb(database);
      await fetchTodos(database); // 初期データを取得
    } catch (error) {
      console.error('データベース初期化エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 全Todoを取得する処理
   * @param database データベースインスタンス（省略時は現在のインスタンスを使用）
   */
  const fetchTodos = async (database = db) => {
    if (!database) return;
    try {
      // 最新のTodoが上に表示されるように降順で取得
      const rows = await database.getAllAsync<Todo>('SELECT * FROM todos ORDER BY id DESC;');
      setTodos(rows);
    } catch (error) {
      console.error('Todo取得エラー:', error);
    }
  };

  /**
   * 新しいTodoを追加する処理
   * @param text Todoのテキスト
   * @returns 成功時はtrue、失敗時はfalse
   */
  const addTodo = async (text: string) => {
    if (!text.trim() || !db) return false;
    try {
      await db.runAsync('INSERT INTO todos (text) VALUES (?);', text.trim());
      await fetchTodos(); // リストを更新
      return true;
    } catch (error) {
      console.error('Todo追加エラー:', error);
      return false;
    }
  };

  /**
   * Todoを更新する処理
   * @param id 更新するTodoのID
   * @param text 新しいテキスト
   * @returns 成功時はtrue、失敗時はfalse
   */
  const updateTodo = async (id: number, text: string) => {
    if (!text.trim() || !db) return false;
    try {
      await db.runAsync('UPDATE todos SET text = ? WHERE id = ?;', text.trim(), id);
      await fetchTodos(); // リストを更新
      return true;
    } catch (error) {
      console.error('Todo編集エラー:', error);
      return false;
    }
  };

  /**
   * Todoを削除する処理
   * @param id 削除するTodoのID
   * @returns 成功時はtrue、失敗時はfalse
   */
  const deleteTodo = async (id: number) => {
    if (!db) return false;
    try {
      await db.runAsync('DELETE FROM todos WHERE id = ?;', id);
      await fetchTodos(); // リストを更新
      return true;
    } catch (error) {
      console.error('Todo削除エラー:', error);
      return false;
    }
  };

  /**
   * Todoを検索する処理
   * @param searchText 検索テキスト
   */
  const searchTodos = async (searchText: string) => {
    if (!db) return;
    try {
      if (!searchText.trim()) {
        // 検索テキストが空の場合は全Todoを表示
        await fetchTodos();
        return;
      }

      // LIKE演算子を使用して部分一致検索を実行
      const rows = await db.getAllAsync<Todo>(
        'SELECT * FROM todos WHERE text LIKE ? ORDER BY id DESC;',
        `%${searchText.trim()}%`
      );
      setTodos(rows);
    } catch (error) {
      console.error('Todo検索エラー:', error);
    }
  };

  // フックから返す値と関数
  return {
    todos,        // Todoリスト
    loading,      // ローディング状態
    addTodo,      // Todo追加関数
    updateTodo,   // Todo更新関数
    deleteTodo,   // Todo削除関数
    searchTodos,  // Todo検索関数
  };
};
