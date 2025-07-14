import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import CustomInput from '../componentes/CustomImput';
import CustomButton from '../componentes/CustomButton';
import axios from 'axios';



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
}

  const handleAddTask = async () => {
  if (titulo.trim()) {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        titulo,
        completed: false,
      });
      addTask({ titulo, descricao, id: response.data.id.toString() });
      navigation.goBack();
    } catch (err) {
      Alert.alert('Erro', 'Falha ao salvar na API');
    }
  } else {
    Alert.alert('Erro', 'Por favor, insira o título da tarefa.');
  }
};


return (
  <View style={styles.container}>
    <Text style={styles.label}>Título da Tarefa</Text>
    <CustomInput
      value={title}
      onChangeText={(text) => setTitle(text.slice(0, 50))}
      placeholder="Digite o título da tarefa (máx. 50 caracteres)"
    />
    <CustomInput
      value={description}
      onChangeText={setDescription}
      placeholder="Digite a descrição (opcional)"
      multiline
    />

    <CustomButton title="Salvar Tarefa" onPress={handleAddTask} color="#007bff" />
    <CustomButton
      title="Cancelar"
      onPress={() => navigation.goBack()}
      color="#dc3545"
    />
  </View>
);


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
