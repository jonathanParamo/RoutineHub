import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:8080/todos/1");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
    <Text>Hola mundo</Text>
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>{item.title}</Text>
        </View>
      )}
      ListHeaderComponent={() => <Text style={styles.title}>Today</Text>}
      contentContainerStyle={styles.contentContainerStyle}
    />
    <StatusBar style="auto" />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainerStyle: {
    padding: 15,
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 15,
  }
});
