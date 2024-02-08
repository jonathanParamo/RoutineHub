import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Task from './components/Task';
import Toast from 'react-native-toast-message';
import { Feather } from '@expo/vector-icons';
import { FontSizePanel } from './components/FontSizePanel';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { InputTask } from './components/InputTask';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [isFontSizePanelOpen, setIsFontSizePanelOpen] = useState(false);
  const [sizeText, setSizeText] = useState(15);

  useEffect(() => {
    fetchData();
    measureStatusBar();
  }, []);

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
    });
  };

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:8080/todos/1");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      showToast("error", "Error fetching data", error.message);
    }
  }

  const toggleFontSizePanel = () => {
    setIsFontSizePanelOpen(!isFontSizePanelOpen);
  };

  const increaseTextSize = () => {
    setSizeText((prevSize) => (prevSize < 17 ? prevSize + 1 : prevSize));
  };

  const decreaseTextSize = () => {
    setSizeText((prevSize) => (prevSize > 12 ? prevSize - 1 : prevSize));
  };

  function measureStatusBar() {
    setStatusBarHeight(StatusBar.currentHeight || 0);
  };

  function clearTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
        : todo
      )
    )
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[styles.container, { paddingTop: statusBarHeight + 20 }]}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Task
              {...item} sizeText={sizeText}
              increaseTextSize={increaseTextSize}
              decreaseTextSize={decreaseTextSize}
              clearTodo={clearTodo}
              toggleTodo={toggleTodo}
            />
          )}
          ListHeaderComponent={() => <Text style={styles.title}>Today</Text>}
          contentContainerStyle={styles.contentContainerStyle}
          stickyHeaderIndices={[0]}
        />
        <InputTask todos={todos} setTodos={setTodos} />
        <Toast />
        <TouchableOpacity onPress={toggleFontSizePanel} style={styles.fontSizeButton}>
          <Feather name={isFontSizePanelOpen ? "chevron-up" : "chevron-down"} size={30} color="#f5f5f5" />
        </TouchableOpacity>

        {isFontSizePanelOpen && (
          <FontSizePanel
            increaseTextSize={increaseTextSize}
            decreaseTextSize={decreaseTextSize}
          />
        )}
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  contentContainerStyle: {
    padding: 15,
  },
  title: {
    width: "100%",
    height: 45,
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 25,
    color: "#f5f5f5",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    borderBottomColor: "#f5f5f5",
    borderWidth: 1,
  },
  fontSizeButton: {
    width: 50,
    height: 50,
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: [{ translateY: -100 }],
    backgroundColor: '#f5f5f530',
    borderRadius: 50,
    padding: 10,
    margin: 10,
    elevation: 5,
    textAlign: "center",
    borderWidth: 1,
    borderColor: '#f5f5f5',
    borderStyle: 'solid'
  },
  fontSizePanel: {
    width: 50,
    height: 100,
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: [{ translateY: -45 }],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f530',
    borderRadius: 50,
    padding: 10,
    margin: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f5f5f5',
    borderStyle: 'solid'
  },

  fontSizePanelButton: {
    marginVertical: 5,
    padding: 3,
    borderRadius: 5,
  },
});
