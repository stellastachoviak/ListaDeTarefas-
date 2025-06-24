import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';

export default function AddTask({ navigation }:any) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  useEffect(()=>{
    console.log('AddTask montada!');
    return()=> {
      console.log('AddTask desmontada!')
    };
  },[])
  const handleSubmit = () => {
    if (nome.trim() && email.trim()) {
      navigation.navigate('Details',{
      mensagem: `Nome submetido: ${nome},Email:${email}`, 
    });
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Formulário</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      style={[styles.button, { backgroundColor: '#dc3545' }]} 
      onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Voltar para Home</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      style={[styles.button, { backgroundColor: '#dc3545' }]} 
      onPress={() => navigation.navigate('Scroll')}
      >
        <Text style={styles.buttonText}>Voltar para Scroll</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 16,
    borderRadius: 8,
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#28a745',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
