import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function QuoteListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Söz Defteri (K30-c)</Text>
      <Text style={styles.subtitle}>
        Sözler 61–90 listesi burada görüntülenecek.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: '/detail',
            params: {
              id: '61',
              quote: 'Örnek söz metni',
              author: 'Örnek Yazar',
            },
          })
        }>
        <Text style={styles.buttonText}>Örnek Detay Ekranını Aç</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});
