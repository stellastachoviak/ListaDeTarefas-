import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../componentes/CustomButton';

export default function TaskCard({ title, completed, onPress, onToggle,item, isLocal, onDelete }:any) {
  return (
    <View style={[styles.cardContainer, completed && styles.completedContainer]}>
      {onToggle && (
    <TouchableOpacity style={styles.toggleButton} onPress={onToggle}>
      <Text style={styles.toggleText}>{completed ? '✓' : 'o'}</Text>
    </TouchableOpacity>
  )}
  {isLocal && (
    <CustomButton
      title="Excluir"
      onPress={onDelete}
      color="#dc3545"
      style={styles.deleteButton}
      textStyle={styles.deleteButtonText}
    />
  )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  completedContainer: {
    backgroundColor: '#e6f3ff',
  },
  card: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  toggleButton: {
    padding: 10,
  },
  toggleText: {
    fontSize: 20,
    color: '#007bff',
  },
  sourceText: {
fontSize: 12,
color: '#999',
marginTop: 5,
},
actions: {
flexDirection: 'row',
alignItems: 'center',
},
deleteButton: {
paddingVertical: 8,
paddingHorizontal: 12,
},
deleteButtonText: {
fontSize: 14,
},
});