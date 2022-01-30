import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import Buttons from "./Buttons";
import { FontAwesome } from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons'
const TodoItem = props => {
  const [text, setText] = useState(props.title);
  const [isEditing, setEdit] = useState(false);

  const handleEdit = () => {
    props.editHandler(props.todoKey, text);
    setEdit(false);
  };

  let price = (props.price === "" ? "": String("$" + Number(props.price).toFixed(2)));
  let location = props.location === "" ? "" : props.location; 


  return (
    <View style={styles.items}>
      <View style={styles.itemContainer}>
        {isEditing ? (
          <View style = {{flexDirection:"row", display:"flex", alignItems :"center"}}>
            <TextInput
              autoFocus
                value={text}
                onChangeText={setText}
                style={styles.itemText}
              />
          </View>
          
        ) : (
          <Text style={styles.itemText}>{props.title}</Text>
        )}
        <View style={styles.btnContainer}>
          <View style = {{display:"flex", flexDirection:"row", alignItems:"center"}}>
               {(props.price !== 0) && <Text style = {{paddingRight: 10}}>{price}</Text>}
               {(props.location !== "")&& <Text>{location}</Text>}
          </View>
          {isEditing ? (
            <Pressable title="Save" onPress={handleEdit} style={styles.editBtn} >
              <FontAwesome name = "pencil" color = "black" size = {25}/>
            </Pressable>
          ) : (
            <Pressable
              title="Edit"
              onPress={() => setEdit(true)}
              style={styles.editBtn}
            >
              <FontAwesome name = "pencil" color = "#a9a9a9" size = {25}/>
            </Pressable>
          )}
          <Pressable
            onPress={() => props.pressHandler(props.todoKey)}
            style={styles.itemBtn}
            autoFocus

          >
            <AntDesign name = "closecircle" color = "#E44D2E" size = {25}/>

          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  items: {
    display: "flex",
    padding: 5,
    paddingHorizontal: 10,
    marginTop: 0,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center"
  },
  itemContainer: {
    flexDirection: "row",
    width: "90%",
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 6,
    margin: 0
  },
  itemText: {
    paddingVertical: 10,
    padding: 5,
    marginRight: 5,
    borderRadius: 6,
    paddingLeft: 20,
  },
  btnContainer: {
    position: "absolute",
    right: 10,
    flexDirection: "row"
  },
  itemBtn: {
    padding: 5,
    alignItems: "center"
  },
  editBtn: {
    paddingLeft: 15,
    padding: 5,
    alignItems: "center",
    
  },

  centerView: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default TodoItem;
