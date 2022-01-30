import React, { useState , useEffect} from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Header from "./Header";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

export default  function GroceryList(props) {
  const [todos, setTodos] = useState(props.todos);
  useEffect(()=> {
    updateParentState(todos);
}, [todos]);
  // const [addMode, setAddMode] = useState(false);
  const addTodoHandler = addTodos => {
    if (addTodos.length === 0) {
      return;
    }
    setTodos(prevTodos => [
      ...prevTodos,
      { key: todos.length, value: addTodos }
    ]);
   
    // setAddMode(false);
  };

  const handleDelete = todoKey => {
      setTodos(prevTodos => {
      return prevTodos.filter(todos => todos.key !== todoKey);
    });
  
  };
  const updateParentState = (data) =>{
    props.updateParentState(data);
}
  const handleEdit = (todoKey, newText) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(todos => todos.key === todoKey);
    newTodos[index] = Object.assign(newTodos[index], { value: newText});

    setTodos(newTodos);
  };
  

  return (
    <View style={styles.container} >
      <AddTodo
        onAddTodo={addTodoHandler}
         onPress={() => updateParentState(todos)}
        // onCancel={cancelTodoAddHandler}
      />
      <FlatList
        keyExtractor={(item, index) => item.key}
        data={todos}
        renderItem={({ item }) => (
          <TodoItem 
            key={item.key}
            todoKey={item.key}
            title={item.value}
            price = {props.submitted ? props.prices[item.key] : ""}
            location = {props.submitted ? props.location[item.key] : ""}
            editHandler={handleEdit}
            pressHandler={handleDelete}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
