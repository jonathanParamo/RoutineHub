import { StyleSheet, Pressable, Text } from "react-native";
import { Feather } from '@expo/vector-icons';

export function CheckMark({ id, completed, toggleTodo }) {
  return (
    <Pressable
      // onPress={() => toggleTodo(id)} // Maneja el evento de clic
      style={[
        styles.checkMark,
        {
          backgroundColor: completed ? "#e0e1dd" : "#f5f5f580",
          borderWidth: completed ? 0 : 2,
          borderColor: "#4d4d4d",
        },
      ]}
    >
      {completed ?
        <Feather name="check" size={15} color="white" />
        :
        <Text style={{ color: 'red' }}>X</Text>
      }
    </Pressable>
  )
}


const styles = StyleSheet.create({
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
})