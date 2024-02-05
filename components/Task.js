import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { useState } from "react";
import { Feather } from '@expo/vector-icons';
import { CheckMark } from "./CheckMark";

export default function Task({
  id,
  title,
  shared_with_id,
  completed,
  clearTodo,
  toggleTodo,
  sizeText,
}) {
  const [isDeleteActive, setIsDeleteActive] = useState(false);

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2: text2 || null,
    });
  };

  async function deleteTodo() {
    try {
      const response = await fetch(`http://localhost:8080/todos/${id}`, {
        headers: {
          method: "DELETE",
        }});
        clearTodo(id);
        showToast("success", "Task Deleted successfully");
    } catch (error) {
      showToast("error", "Failed to delete task");
    };
  };

  return (
    <TouchableOpacity
      onLongPress={() => setIsDeleteActive(true)}
      onPress={() => setIsDeleteActive(false)}
      activeOpacity={0.8}
      style={styles.container}
    >
      <View style={styles.row}>
        <CheckMark id={id} completed={completed} toggleTodo={toggleTodo} />
        <Text style={{ ...styles.text, fontSize: sizeText }}>{title}</Text>
      </View>

      {shared_with_id !== null ? (
        <Feather name="users" size={15} style={styles.feather} />
      ) : (
        <Feather name="share" size={15} style={styles.feather} />
      )}

      {isDeleteActive && (
        <Pressable onPress={deleteTodo} style={styles.deleteButton}>
          <Text style={{ color: "white", fontWeight: "bold" }}>X</Text>
        </Pressable>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 21,
  },
  checkMark: {
    width: 24,
    height: 24,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  checkMarkText: {
    color: "white",
  },
  text: {
    width: "100%",
    alignSelf: "flex-start",
    fontSize: 15,
    color: "#f5f5f5",
    paddingLeft: 15,
  },
  contentContainer: {
    flex:  1,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "900",
    letterSpacing: 1,
    fontSize: 16,
  },
  subTitle: {
    color: "#101318",
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    color: "#56636f",
    fontSize: 13,
    fonstWeight: "normal",
    width: "100%",
  },
  feather: {
    color: "#f5f5f5",
  },
})
