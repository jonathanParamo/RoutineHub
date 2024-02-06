import { useState } from "react";
import { Keyboard, View, Text, StyleSheet, Button, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export function TodoModalContent({ id, title }) {
  const [email, setEmail] = useState("");
  const [focus, setFocus] = useState(false);

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8080/todos/shared_todos", {
      headers: {
        "Content-type": "aplication/json",
      },
      method: "POST",
      body: JSON.stringify({
        todo_id: id,
        user_id: 1,
        email: email,
      }),
    });
    const data = await response.json();
    Keyboard.dismiss();
    setEmail("")
    setFocus(false),
    Alert.alert(
      "congratulations",
      `You successfully shared ${title} with ${email}`
      [{ text: "Okay"}]
    );
  };

  return (
    <View style={styles.contentContainer}>
            <Text style={[style.title, { marginBottom: 20}]}>Share your task</Text>
      <Text style={[style.title, { marginBottom: 20}]}>"{title}"</Text>
      <Text style={styles.description }>
        Enter the email of the user you want to share your task with, share a
        task with someone and stay in sinc with your goals everyday.
      </Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text.toLocaleLowerCase())}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        keyboardType="email-address"
        style={[
          styles.input,
          focus && { borderWidth: 3, borderColor: "#000000" },
        ]}
        placeholder="Enter your contact email"
      />
      <Button
        onPress={handleSubmit}
        title="Share"
        disabled={email.length === 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
    textAlign: "center",
  },
  description: {
    color: "#56636F",
    fonSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
  input: {
    borderWidth: 2,
    borderColor: "#00000090",
    padding: 15,
    borderRadius: 15,
    maginVertical: 15,
  },
});