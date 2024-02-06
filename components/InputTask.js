import { useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableHighlight,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Animated,
  Platform
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { measure } from "react-native-reanimated";

export function InputTask({todos, setTodos}) {
  const [showEmojies, setShowEmojies] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0.1));

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardWillShow", () => {
      setShowEmojies(true);
      AnimatedText.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
    const hideSudcription = Keyboard.addListener("keyboardWillHide", () => {
      setShowEmojies(false);
      AnimatedText.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
    return () => {
      showSubscription.remove()
      hideSudcription.remove();
    }
  }, []);

  const handleSubmit = async () => {
    if (messageBody !== "") {
      const response = await fetch("http://localhost:8080/todos", {
        headers: {
          "Content-type": "aplication/json",
        },
        method: "POST",
        body: JSON.stringify({
          user_id: 1,
          title: messageBody,
        }),
      });
      const newTodo = await response.json();
      setTodos([...todos, {...newTodo, shared_with_id: null }]);
      Keyboard.dismiss();
      setMessageBody("");
    };
  };

  const RenderEmoji = ({ emoji }) => {
    return (
      // <TouchableHighlight
      //   activeOpacity={1}
      //   underlayColor={"transparent"}
      //   onPress={() => {
      //     setMessageBody(messageBody + emoji);
      //   }}
      // >
      //   <Text style={styles.emoji}>{emoji}</Text>
      // </TouchableHighlight>
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={"transparent"}
        onPress={() => {
          setMessageBody(messageBody + emoji);
        }}
      >
        <Animated.View
          style={[
            styles.emojiContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.emoji}>{emoji}</Text>
        </Animated.View>
      </TouchableHighlight>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {showEmojies && (
          <Animated.View
            style={[
              styles.emojiesContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <RenderEmoji emoji="🎥" />
            <RenderEmoji emoji="🏃‍♂️" />
            <RenderEmoji emoji="🏋️‍♂️" />
            <RenderEmoji emoji="🍽️" />
            {/* <RenderEmoji emoji="🛌" />
            <RenderEmoji emoji="🚿" />
            <RenderEmoji emoji="📚" />
            <RenderEmoji emoji="🚗" />
            <RenderEmoji emoji="💤" />
            <RenderEmoji emoji="🎧" />
            <RenderEmoji emoji="☕" />
            <RenderEmoji emoji="🍵" />
            <RenderEmoji emoji="📱" />
            <RenderEmoji emoji="🚶‍♀️" />
            <RenderEmoji emoji="🍳" />
            <RenderEmoji emoji="📅" />
            <RenderEmoji emoji="🛒" />
            <RenderEmoji emoji="📷" />
            <RenderEmoji emoji="💻" />
            <RenderEmoji emoji="🚴‍♀️" /> */}
          </Animated.View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.containerTextInput}
            placeholder="Write a new task"
            scrollEnabled={true}
            onChangeText={setMessageBody}
            defaultValue={messageBody}
          />
          <Pressable onPress={handleSubmit}>
            <AntDesign
              name="checkcircle"
              size={40}
              color={messageBody ? "#000000" : "#00000050"}
              style={{ paddingLeft: 5 }}
            />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const windowWidth = Dimensions.get("window").width;


const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.2,
    borderTopColor: "#00000030",
    alignItems: "baseline",
  },
  emojiesContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingLeft: 10,
    marginVertical: 10,
  },
  emoji: {
    fontSize: 25,
    padding: 5,
    marginRight: 10,
  },
  containerTextInput: {
    width: windowWidth - 100,
    borderWidth: 1,
    borderRadius: 30,
    minHeight: 45,
    paddingHorizontal: 15,
    paddingTop: 8,
    fontSize: 16,
    paddingVertical: 5,
    borderColor: "lightgray",
    backgroundColor: "#ffffff",
    marginBottom: 5,
    fontWeight: "600",
  },
});

