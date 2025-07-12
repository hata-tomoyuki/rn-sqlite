import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TodoItemProps {
  id: number;
  text: string;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ id, text, onDelete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(id)}
      >
        <Text style={styles.deleteText}>削除</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 12,
  },
  deleteText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
