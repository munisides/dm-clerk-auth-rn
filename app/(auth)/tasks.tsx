import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// task definition
interface Task {
  id: string;
  name: string;
}

const Tasks: React.FC = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const addTaskHandler = () => {
    if (taskName.trim().length === 0) return;
    const newTask: Task = { id: Date.now().toString(), name: taskName };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskName("");
    Keyboard.dismiss();
  };

  const deleteTaskHandler = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setCompletedTasks((prevCompletedTasks) =>
      prevCompletedTasks.filter((task) => task.id !== taskId)
    );
  };

  const completeTaskHandler = (taskId: string) => {
    setTasks((prevTasks) => {
      const task = prevTasks.find((task) => task.id === taskId);
      if (task) {
        // Add the task to completed tasks
        setCompletedTasks((prevCompletedTasks) => [
          ...prevCompletedTasks,
          task,
        ]);
        // Remove the task from incomplete tasks
        return prevTasks.filter((task) => task.id !== taskId);
      }
      return prevTasks;
    });
  };

  // Use keyboard Enter key as add task
  const handleSubmitEditing = () => {
    addTaskHandler();
  };

  const renderTaskItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.name}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => completeTaskHandler(item.id)}>
          <MaterialIcons name="check-circle" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTaskHandler(item.id)}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={taskName}
            onChangeText={setTaskName}
            placeholder="Add a task"
            onSubmitEditing={handleSubmitEditing} // Handle Enter key
            returnKeyType="done" // Optional: Set the return key type to "done"
          />
          <Button title="Add" onPress={addTaskHandler} color={"#6c47ff"} />
        </View>
        <View style={styles.taskSection}>
          <Text style={styles.sectionTitle}>Incomplete Tasks</Text>
          <FlatList
            data={tasks}
            renderItem={renderTaskItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.taskSection}>
          <Text style={styles.sectionTitle}>Completed Tasks</Text>
          <FlatList
            data={completedTasks}
            renderItem={renderTaskItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  innerContainer: {
    width: "60%",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  taskSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  taskText: {
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
  },
});

export default Tasks;
