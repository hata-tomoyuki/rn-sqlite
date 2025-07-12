# Native SQLite Todo App

React Native + Expo + SQLite + NativeWindを使用したTodo管理アプリケーションです。

## 📱 機能

### ✅ 基本機能
- **Todoの追加**: モーダルで新しいTodoを追加
- **Todoの表示**: 最新のTodoが上に表示されるリスト表示
- **Todoの編集**: インライン編集機能（保存・キャンセル対応）
- **Todoの削除**: 個別のTodoを削除
- **リアルタイム検索**: 入力と同時に検索実行

### 🎨 UI/UX機能
- **モダンなデザイン**: NativeWind（Tailwind CSS）によるスタイリング
- **モーダル表示**: 追加フォームをモーダルで表示
- **キーボード制御**: 画面タップでキーボードを閉じる
- **レスポンシブ**: 様々な画面サイズに対応
- **ローディング状態**: データベース初期化中の表示

### 💾 データベース機能
- **SQLite**: ローカルデータベースでデータ永続化
- **CRUD操作**: 作成・読み取り・更新・削除の完全対応
- **検索機能**: LIKE演算子による部分一致検索
- **エラーハンドリング**: データベース操作のエラー処理

## 🛠 技術スタック

- **React Native**: 0.79.5
- **Expo**: ~53.0.17
- **TypeScript**: ~5.8.3
- **SQLite**: expo-sqlite ~15.2.14
- **NativeWind**: Tailwind CSS for React Native
- **React**: 19.0.0

## 📁 プロジェクト構造

```
native-sqlite/
├── App.tsx                    # メインアプリケーションコンポーネント
├── src/
│   ├── components/           # UIコンポーネント
│   │   ├── TodoInput.tsx     # Todo入力フォーム
│   │   ├── TodoList.tsx      # Todoリスト表示
│   │   ├── TodoItem.tsx      # 個別Todoアイテム
│   │   ├── TodoSearch.tsx    # 検索フォーム
│   │   └── Modal.tsx         # 再利用可能なモーダル
│   └── hooks/                # カスタムフック
│       └── useTodoDatabase.ts # SQLiteデータベース操作
├── assets/                   # 画像・アイコン
├── package.json
├── tailwind.config.js        # NativeWind設定
├── babel.config.js           # Babel設定
└── tsconfig.json             # TypeScript設定
```

## 🚀 セットアップ手順

### 1. 前提条件
- Node.js (v18以上)
- npm または yarn
- Expo CLI (`npm install -g @expo/cli`)

### 2. リポジトリのクローン
```bash
git clone <repository-url>
cd native-sqlite
```

### 3. 依存関係のインストール
```bash
npm install
```

### 4. 開発サーバーの起動
```bash
npm start
# または
npx expo start
```

### 5. アプリの実行
- **iOS**: `npm run ios` または Expo GoアプリでQRコードをスキャン
- **Android**: `npm run android` または Expo GoアプリでQRコードをスキャン
- **Web**: `npm run web`

## 🔧 設定ファイル

### NativeWind設定 (tailwind.config.js)
```javascript
module.exports = {
  content: ["./App.tsx", "./src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Babel設定 (babel.config.js)
```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```

## 📱 使用方法

### Todoの追加
1. 「新しいTodoを追加」ボタンをタップ
2. モーダルでTodoを入力
3. 「追加」ボタンで保存

### Todoの編集
1. Todoアイテムの「編集」ボタンをタップ
2. テキストを編集
3. 「保存」ボタンで更新、または「キャンセル」で取り消し

### Todoの削除
- Todoアイテムの「削除」ボタンをタップ

### Todoの検索
- 検索フォームにキーワードを入力
- リアルタイムで検索結果が表示される

## 🎨 デザインシステム

### カラーパレット
- **プライマリ**: `#3B82F6` (青)
- **セカンダリ**: `#10B981` (緑)
- **削除**: `#EF4444` (赤)
- **キャンセル**: `#6B7280` (グレー)
- **背景**: `#F9FAFB` (ライトグレー)

### コンポーネント
- **角丸**: `rounded-xl` (12px)
- **シャドウ**: `shadow-sm`
- **パディング**: `p-4` (16px)
- **マージン**: `mb-3` (12px)

## 🔍 開発者向け情報

### データベーススキーマ
```sql
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT
);
```

### 主要な関数
- `addTodo(text)`: Todo追加
- `updateTodo(id, text)`: Todo更新
- `deleteTodo(id)`: Todo削除
- `searchTodos(searchText)`: Todo検索

### カスタムフック
`useTodoDatabase`フックがSQLiteの全操作を管理します。

## 🐛 トラブルシューティング

### よくある問題

1. **NativeWindが動作しない**
   ```bash
   npx expo start --clear
   ```

2. **SQLiteエラー**
   - アプリを再起動
   - データベースファイルを削除して再作成

3. **TypeScriptエラー**
   ```bash
   npm run type-check
   ```

## 📄 ライセンス

MIT License

## 🤝 コントリビューション

1. フォークを作成
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📞 サポート

問題や質問がある場合は、Issueを作成してください。
