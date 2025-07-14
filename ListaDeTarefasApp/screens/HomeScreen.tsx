import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from 'react';
import CustomButton from '../componentes/CustomButton';
import CustomModal from '../componentes/CustomMosal';

type Task = {
  id: string;
  title: string;
  description: string;
  done: boolean;
};

export default function HomeScreen({ navigation, route }: any) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (route?.params?.novaTarefa) {
      setTasks(prev => [...prev, route.params.novaTarefa]);
      navigation.setParams({ novaTarefa: null });
    }
  }, [route?.params?.novaTarefa]);


  const deleteTask = () => {
    setTasks(prev => prev.filter(task => task.id !== taskToDelete));
    setModalVisible(false);
    setTaskToDelete(null);
  };


  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !task.done;
    if (filter === 'completed') return task.done;
  });

 
  const renderItem = ({ item }: any) => {
    const isLocal = typeof item.id === 'string';
    return (
      <>
        <Text style={styles.sourceText}>{!item.userId ? 'Local' : 'API'}</Text>

        <TaskCard
          title={item.title}
          completed={item.done}
          onPress={isLocal ? () => navigation.navigate('Details', { task: item }) : null}
          onToggle={isLocal ? () => toggleDone(item.id) : null}
          onDelete={() => {
            if (isLocal) {
              setTaskToDelete(item.id);
              setModalVisible(true);
            }
          }}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>𝐋𝐢𝐬𝐭𝐚 𝐃𝐞 𝐓𝐚𝐫𝐞𝐟𝐚𝐬</Text>

     
      <View style={styles.filterContainer}>
        <CustomButton
          title="Todas"
          onPress={() => setFilter('all')}
          color={filter === 'all' ? '#007bff' : '#ddd'}
          textStyle={{ color: filter === 'all' ? '#fff' : '#333' }}
          style={{ marginRight: 0 }}
        />
        <CustomButton
          title="Pendentes"
          onPress={() => setFilter('pending')}
          color={filter === 'pending' ? '#007bff' : '#ddd'}
          textStyle={{ color: filter === 'pending' ? '#fff' : '#333' }}
          style={{ marginRight: 0 }}
        />
        <CustomButton
          title="Concluídas"
          onPress={() => setFilter('completed')}
          color={filter === 'completed' ? '#007bff' : '#ddd'}
          textStyle={{ color: filter === 'completed' ? '#fff' : '#333' }}
          style={{ marginRight: 0 }}
        />
      </View>

   
      <FlatList
        style={styles.list}
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

    
      <CustomButton
        title="Adicionar Tarefa"
        onPress={() => navigation.navigate('AddTask')}
        color="#28a745"
      />

    
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Confirmar Exclusão"
        message="Deseja realmente excluir esta tarefa?"
        onConfirm={deleteTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4ed',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  sourceText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  
});
