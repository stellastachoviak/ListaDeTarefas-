import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import HomeScreen from './HomeScreen';


export default function AddTask({ navigation, route }: any) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  function handleSubmit() {
    if (!titulo.trim()) {
      Alert.alert('Erro', 'O título não pode estar vazio!');
      return;
    }

    const novaTarefa = {
      id: Date.now().toString(),
      title: titulo.trim(),
      description: descricao.trim(),
      done: false,
    };

    
    if (route.params?.onAddTask) {
      route.params.onAddTask(novaTarefa);
    }

    navigation.goBack();

    setTitulo('');
    setDescricao('');
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>𝐀𝐝𝐢𝐜𝐢𝐨𝐧𝐚𝐫 𝐍𝐨𝐯𝐚 𝐭𝐚𝐫𝐞𝐟𝐚</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffe4ed',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#9ACD32',
    padding: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
