import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Buttons = props => {
  return (
    <TouchableOpacity {...props} style={{ ...styles.salsaBtn, ...props.style }}>
      <Text style={styles.salsaText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  salsaBtn: {
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6
  },
  salsaText: {}
});

export default Buttons;
