import React, { useState } from 'react';
import { Keyboard, StyleSheet, Platform, View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import Task from '/Users/jihanchen/todoapp/components/tasks.js'; // change to absolute path on local machine
import { TextInput } from 'react-native';

interface TaskItem {
  text: string;
  completed: boolean;
}

export default function HomeScreen() {
  const [task, setTask] = useState<string>(''); 
  const [taskItems, setTaskItems] = useState<TaskItem[]>([]);
  const [completedItems, setCompletedItems] = useState<TaskItem[]>([]); 

  const handleAddTask = () => {
    if (task.trim()) {
      setTaskItems(prevItems => [...prevItems, { text: task.trim(), completed: false }]);
      setTask(''); 
      Keyboard.dismiss();
    }
  };

  const completeTask = (index: number) => {
    const taskToComplete = taskItems[index];
    setTaskItems(prevItems => prevItems.filter((_, i) => i !== index));
    setCompletedItems(prevItems => [...prevItems, { ...taskToComplete, completed: true }]);
  };

  const removeTask = (index: number, fromCompleted: boolean = false) => {
    if (fromCompleted) {
      setCompletedItems(prevItems => prevItems.filter((_, i) => i !== index));
    } else {
      setTaskItems(prevItems => prevItems.filter((_, i) => i !== index));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>

        {/* Today's Tasks Section */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <View style={styles.items}>
            {taskItems.length > 0 ? (
              taskItems.map((item, index) => (
                <Task
                  key={index}
                  text={item.text}
                  completed={item.completed}
                  onComplete={() => completeTask(index)}
                  onDelete={() => removeTask(index)}
                />
              ))
            ) : (
              <Text style={styles.emptyText}>No tasks for today.</Text>
            )}
          </View>
        </View>

        {/* Completed Tasks Section */}
        <View style={styles.completedTasksWrapper}>
          <Text style={styles.sectionTitle}>Completed Tasks</Text>
          <View style={styles.items}>
            {completedItems.length > 0 ? (
              completedItems.map((item, index) => (
                <Task
                  key={index}
                  text={item.text}
                  completed={item.completed}
                  onComplete={() => {}}
                  onDelete={() => removeTask(index, true)}
                />
              ))
            ) : (
              <Text style={styles.emptyText}>No completed tasks.</Text>
            )}
          </View>
        </View>

      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          placeholderTextColor="#00000080"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  scrollContainer: {
    flex: 1,
  },
  tasksWrapper: {
    marginTop: 60,
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  completedTasksWrapper: {
    padding: 20,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  items: {
    marginTop: 10,
  },
  emptyText: {
    color: '#999',
    fontStyle: 'italic',
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 24,
    color: '#55BCF6',
  },
});