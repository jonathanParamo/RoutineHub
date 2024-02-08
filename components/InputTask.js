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
import Toast from "react-native-toast-message";

export function InputTask({todos, setTodos}) {
  const [showEmojies, setShowEmojies] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0.1));

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardWillShow", () => {
      setShowEmojies(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
    const hideSudcription = Keyboard.addListener("keyboardWillHide", () => {
      setShowEmojies(false);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
    return () => {
      showSubscription.remove();
      hideSudcription.remove();
    }
  }, []);

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
    });
  };

  const handleSubmit = async () => {
    try {
      if (messageBody !== "") {
        const response = await fetch("http://localhost:8080/todos", {
          headers: {
            "Content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            user_id: 1,
            title: messageBody,
          }),
        });

        if (!response.ok) {
          console.log(response);
          showToast("error", "error in the request:", response);
          return;
        }

        const newTodo = await response.json();
        setTodos([...todos, {...newTodo, shared_with_id: null }]);
        console.log(newTodo,"NEW", response);
        Keyboard.dismiss();
        setMessageBody("");
      };
    } catch (error) {
      showToast("error", "error in the request:", error);
    }
  };

  const RenderEmoji = ({ emoji }) => {
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={"transparent"}
        onPress={() => {
          setMessageBody(messageBody + emoji);
        }}
      >
        <Text style={styles.emoji}>{emoji}</Text>
      {/* // </TouchableHighlight>
      // <TouchableHighlight
      //   activeOpacity={1}
      //   underlayColor={"transparent"}
      //   onPress={() => {
      //     setMessageBody(messageBody + emoji);
      //   }}
      // >
      //   <Animated.View
      //     style={[
      //       styles.emojiContainer,
      //       {
      //         opacity: fadeAnim,
      //       },
      //     ]}
      //   >
      //     <Text style={styles.emoji}>{emoji}</Text>
      //   </Animated.View> */}
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
            <RenderEmoji emoji="🎧" />
            <RenderEmoji emoji="☕" />
            <RenderEmoji emoji="🚶‍♀️" />
            <RenderEmoji emoji="🍳" />
            <RenderEmoji emoji="📅" />
            <RenderEmoji emoji="🛒" />
            <RenderEmoji emoji="🚴‍♀️" />
          </Animated.View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.containerTextInput}
            placeholder="Write a new task"
            placeholderTextColor= "#f5f5f5"
            scrollEnabled={true}
            onChangeText={setMessageBody}
            defaultValue={messageBody}
            theme={{ colors: { primary: '#f5f5f5' } }}
          />
          <Pressable onPress={handleSubmit}>
            <AntDesign
              name={messageBody ? "checkcircle" : "closecircle"}
              size={40}
              color={messageBody ? "#90f1ef" : "#f35b0430"}
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
  inputContainer: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    color: "#f5f5f5",
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
    borderColor: "#f5f5f5",
    backgroundColor: "#ffffff50",
    marginBottom: 5,
    fontWeight: "600",
    alignItems: "center",
    color: "#f5f5f5"
  },
});

