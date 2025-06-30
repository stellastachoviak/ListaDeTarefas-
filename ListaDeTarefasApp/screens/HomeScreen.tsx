import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, TextInput } from "react-native";
import { useEffect, useState } from 'react';
import AddTask from "./AddTask";
import React from "react";



export default function HomeScreen({ navigation }: any) {
    const [tasks, setTasks] = useState([
        { id: '1', title: 'Item 1', description: 'Descrição do item 1', done: false },
        { id: '2', title: 'Item 2', description: 'Descrição do item 2', done: false },
        { id: '3', title: 'Item 3', description: 'Descrição do item 3', done: false },
        { id: '4', title: 'Item 4', description: 'Descrição do item 4', done: false },
        { id: '5', title: 'Item 5', description: 'Descrição do item 5', done: false },
    ]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Tarefa</Text>
            <FlatList
                style={styles.list}
                data={tasks}
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
                                {item.description}
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
                        onPress={() => navigation.navigate('AddTask')}
                    >
                        <Text style={styles.buttonText}>Adicionar Nova Tarefa</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
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
    formContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    list: {
        flex: 1,
    },
    card: {
        backgroundColor: 'pink',
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
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
    button: {
        backgroundColor: 'p',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
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
    counterText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
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