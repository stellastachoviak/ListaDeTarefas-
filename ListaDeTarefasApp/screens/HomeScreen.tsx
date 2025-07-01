import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from 'react';



type Task = {
    id: string;
    title: string;
    description: string;
    done: boolean;
};

export default function HomeScreen({ navigation, route }: any) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showDone, setShowDone] = useState<'all' | 'done' | 'notdone'>('all');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  
  useEffect(() => {
  if (route?.params?.novaTarefa) {
    setTasks(prev => [...prev, route.params.novaTarefa]);
    navigation.setParams({ novaTarefa: null });
  }
}, [route?.params?.novaTarefa]);

    
    const addTask = () => {
        if (!newTitle.trim()) {
            Alert.alert('Erro', 'O título não pode ser vazio!');
            return;
        }
        setTasks(prev => [
            ...prev,
            {
                id: Date.now().toString(),
                title: newTitle,
                description: newDescription,
                done: false
            }
        ]);
        setNewTitle('');
        setNewDescription('');
    };

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const toggleDone = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  
  const filteredTasks = tasks.filter(task => {
    if (showDone === 'all') return true;
    if (showDone === 'done') return task.done;
    if (showDone === 'notdone') return !task.done;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>𝐋𝐢𝐬𝐭𝐚 𝐃𝐞 𝐓𝐚𝐫𝐞𝐟𝐚𝐬</Text>

      
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
        <TouchableOpacity
          style={[styles.counterButton, { backgroundColor: showDone === 'all' ? '#ff69b4' : '#fff', marginHorizontal: 2 }]}
          onPress={() => setShowDone('all')}
        >
          <Text style={styles.buttonText}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.counterButton, { backgroundColor: showDone === 'done' ? '#ff69b4' : '#fff', marginHorizontal: 2 }]}
          onPress={() => setShowDone('done')}
        >
          <Text style={styles.buttonText}>Concluídas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.counterButton, { backgroundColor: showDone === 'notdone' ? '#ff69b4' : '#fff', marginHorizontal: 2 }]}
          onPress={() => setShowDone('notdone')}
        >
          <Text style={styles.buttonText}>Pendentes</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.list}
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', { task: item })}
          >
            <View style={styles.card}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => toggleDone(item.id)}>
                  <Text style={{ fontSize: 15, marginRight: 8 }}>
                    {item.done ? '✅' : '⬜'}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={[
                    styles.cardTitle,
                    item.done && { textDecorationLine: 'line-through', color: '#aaa' }
                  ]}
                >
                  {item.title}
                </Text>
              </View>
              <Text
                style={[
                  styles.cardDescription,
                  item.done && { textDecorationLine: 'line-through', color: '#bbb' }
                ]}
              >
                
              </Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeTask(item.id)}
              >
                <Text style={[styles.removeButtonText, { fontSize: 18 }]}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={[styles.counterButton, { backgroundColor: '#ff69b4', width: '100%' }]}
          onPress={clearAllTasks}
        >
          <Text style={styles.buttonText}>Limpar toda Lista de tarefas</Text>
        </TouchableOpacity>

        <View style={styles.rowButtons}>
          <TouchableOpacity
            style={[styles.counterButton, { backgroundColor: '#9ACD32', flex: 1, marginLeft: 5 }]}
            onPress={() => navigation.navigate('AddTask', {
              onAddTask: (novaTarefa: any) => setTasks(prev => [...prev, novaTarefa])
            })}
          >
            <Text style={styles.buttonText}>Adicionar Nova Tarefa</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  list: {
    flex: 1,
  },
  card: {
    backgroundColor: 'pink',
    padding: 10,
    marginBottom: 6,
    borderWidth: 2,
    borderColor: '#ff69b4',
    borderRadius: 12,
    shadowColor: '#ff00cc', 
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
   
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  removeButton: {
    backgroundColor: 'transparent',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  removeButtonText: {
    color: '#dc3545',
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  counterContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  counterButton: {
    backgroundColor: '#ff69b4',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 8,
  },
  rowButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
