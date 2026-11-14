import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function QuoteDetailScreen() {
  const params = useLocalSearchParams<{
    id?: string;
    quote?: string;
    author?: string;
  }>();

  return (
    <View style={styles.container}>
      <Text style={styles.quote}>“{params.quote ?? 'Söz seçilmedi'}”</Text>
      <Text style={styles.author}>— {params.author ?? 'Bilinmiyor'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 24,
    justifyContent: 'center',
  },
  quote: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#0f172a',
    lineHeight: 30,
    marginBottom: 12,
  },
  author: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    textAlign: 'right',
  },
});
