import { StyleSheet, Text, View } from 'react-native';

export default function SavedQuotesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kaydedilen Sözler</Text>
      <Text style={styles.subtitle}>
        Kaydettiğiniz sözler burada listelenecek.
      </Text>
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
  },
});

