import React from 'react';
import { View, Text, TouchableOpacity, Modal as RNModal } from 'react-native';

/**
 * ModalコンポーネントのProps型定義
 */
interface ModalProps {
  visible: boolean;                // モーダルの表示状態
  onClose: () => void;            // モーダルを閉じる時のコールバック
  title: string;                  // モーダルのタイトル
  children: React.ReactNode;      // モーダル内に表示するコンテンツ
}

/**
 * 再利用可能なモーダルコンポーネント
 * 半透明の背景オーバーレイとフェードアニメーション付き
 */
export const Modal: React.FC<ModalProps> = ({ visible, onClose, title, children }) => {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* 半透明の背景オーバーレイ */}
      <View className="flex-1 bg-black/50 justify-center items-center p-5">
        {/* モーダルコンテンツ */}
        <View className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
          {/* ヘッダー部分（タイトルと閉じるボタン） */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">{title}</Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 justify-center items-center"
            >
              <Text className="text-gray-600 text-lg font-bold">×</Text>
            </TouchableOpacity>
          </View>

          {/* モーダル内のコンテンツ */}
          {children}
        </View>
      </View>
    </RNModal>
  );
};
