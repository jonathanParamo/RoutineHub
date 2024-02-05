import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export function FontSizePanel({
  increaseTextSize,
  decreaseTextSize
  }) {
  return (
    <View style={styles.fontSizePanel}>
      <TouchableOpacity onPress={increaseTextSize} style={styles.fontSizePanelButton}>
        <Feather name="plus" size={24} color="#f5f5f5" />
      </TouchableOpacity>
      <TouchableOpacity onPress={decreaseTextSize} style={styles.fontSizePanelButton}>
        <Feather name="minus" size={24} color="#f5f5f5" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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
    borderStyle: 'solid',
  },
  fontSizePanelButton: {
    marginVertical: 5,
    padding: 3,
    borderRadius: 5,
  },
})