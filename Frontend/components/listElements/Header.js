import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FF6666",
    width: "100%",
    height: 60,
    paddingTop: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    fontSize: 17,
    color: "white"
  }
});

export default Header;
