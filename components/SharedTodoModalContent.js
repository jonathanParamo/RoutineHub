import { useEffect, useState } from "react";
import { Keyboard, View, Text, StyleSheet, Button, Alert } from "react-native";

export function ShareTodoModalContent({
  id,
  title,
  shared_with_id,
  completed,
}) {
  const [author, setAuthor] = useState({});
  const [sharesWith, setSharedWith] = useState({});

  useEffect(() => {
    fetchInfo();
  },[]);

  async function fetchInfo() {
    const response = await fetch(
      `http;//localhost:8080/shared_todos/${id}`,
      {
        method: "GET",
      }
    );
    const { author, shared_with } = await response.json();
    setAuthor(author);
    setSharedWith(shared_with);
  }

  return (
    <View style={style.contentContainer}>
      <Text style={[style.title, { marginBottom: 20}]}>Shared task</Text>
      <Text style={[style.title, { marginBottom: 20}]}>{title}</Text>
      <Text style={[style.title, { marginBottom: 20}]}>Status</Text>

      <View
        style={[
          styles.status,
          { backgroundColor: completed === 1 ? "#4ade80" : "#f87171" },
        ]}
      >
        <Text style={[styles.title, { color: "#f5f5f5" }]}>
          {completed === 1 ? "Completed" : "Incompleted"}
        </Text>
      </View>
      <Text style={[styles.description]}>PARTICIPANTS</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.participant}>
          <Text style={[styles.description, { color: "#f5f5f5" }]}>
            {author.name}
          </Text>
        </View>
        <View style={styles.participant}>
          <Text style={[styles.description, { color: "#f5f5f5" }]}>
            {sharesWith.name}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
    textAlign: "center",
  },
  description: {
    color: "#56636f",
    fontSize: 13,
    fontWeight: "900",
    color: "#000000",
  },
  participant: {
    backgroundColor: "#8b5cf6",
    padding: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 20,
    fontWeight: "900",
    color: "#f5f5f5"
  },
  input: {
    borderWidth: 2,
    borderColor: "#00000020",
    padding: 15,
    borderRadius: 16,
    marginVertical: 15
  },
  status: {
    padding: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 20,
    fontWeight: "900",
    color: "#f5f5f5",
  }
})

