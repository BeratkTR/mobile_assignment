import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function QuoteDetailScreen() {
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.quote}>"{params.quote}"</Text>
        <Text style={styles.author}>- {params.author}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#222',
    marginBottom: 12,
  },
  author: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'right',
  },
});
