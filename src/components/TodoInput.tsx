import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TodoInputProps {
  text: string;
  onTextChange: (text: string) => void;
  onAdd: () => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ text, onTextChange, onAdd }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="新しいTodoを入力してください..."
        value={text}
        onChangeText={onTextChange}
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TouchableOpacity
        style={[styles.button, !text.trim() && styles.buttonDisabled]}
        onPress={onAdd}
        disabled={!text.trim()}
      >
        <Text style={styles.buttonText}>追加</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#e1e5e9',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
