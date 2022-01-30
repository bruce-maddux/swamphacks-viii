import React, { useState } from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import Buttons from "./Buttons";
import { Feather } from '@expo/vector-icons';

const AddTodo = props => {
  const [text, setText] = useState("");

  const changeHandler = val => {
    setText(val);
  };

  const addTodoHandler = () => {
    props.onAddTodo(text);
    setText("");
  };

  return (
    <View style={styles.inputView}>
      <TextInput
        style={styles.textInput}
        placeholder="Add to your grocery list!"
        onChangeText={changeHandler}
        value={text}
      />
      <Pressable title="Add" onPress={addTodoHandler} style={styles.salsachBtn}>
        <Feather name = "plus-circle" color = "#58CD36" size = {35}/>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    display: "flex",
    width: "90%",
    padding: 10,
    marginVertical: 20,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center"
  },
  textInput: {
    width: "90%",
    borderWidth: 3,
    borderColor: "darkgray",
    paddingVertical: 10,
    padding: 5,
    marginRight: 5,
    borderRadius: 6
  },
  salsachBtn: {
    width: "10%",
    justifyContent:"center",
    alignItems:"center",
    borderColor: "darkgray",
    marginLeft: 5
  }
});

export default AddTodo;
