import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ApiHealthResponse } from '@conectauce/contracts';
import { API_BASE_URL } from '../src/config/api';

export default function HomeScreen() {
  const [health, setHealth] = useState<ApiHealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE_URL}/api/v1/health`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`La API respondió ${response.status}`);
        return (await response.json()) as ApiHealthResponse;
      })
      .then(setHealth)
      .catch((cause: unknown) => {
        if (cause instanceof Error && cause.name === 'AbortError') return;
        setError(cause instanceof Error ? cause.message : 'No se pudo conectar con la API');
      });
    return () => controller.abort();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.brandRow}>
          <View style={styles.brandMark}><Text style={styles.brandLetter}>C</Text></View>
          <Text style={styles.brand}>Conecta<Text style={styles.brandAccent}>UCE</Text></Text>
        </View>
        <Text style={styles.eyebrow}>UNIVERSIDAD CENTRAL DEL ECUADOR</Text>
        <Text style={styles.title}>Tu comunidad.{'\n'}<Text style={styles.titleAccent}>Un solo lugar.</Text></Text>
        <Text style={styles.description}>Comparte información, resuelve dudas académicas y conecta con otros estudiantes de la UCE.</Text>
        <View style={styles.statusCard}>
          {health ? <View style={styles.dot} /> : error ? <View style={[styles.dot, styles.dotError]} /> : <ActivityIndicator size="small" />}
          <Text style={styles.statusText}>{health ? `API ${health.status}` : error ? 'API no disponible' : 'Conectando con la API…'}</Text>
        </View>
        {error ? <Text style={styles.errorText}>{error}{'\n'}Comprueba la URL de la API y que el backend esté activo.</Text> : null}
        <View style={styles.moduleCard}>
          <Text style={styles.moduleTitle}>Muro universitario</Text>
          <Text style={styles.moduleDescription}>Avisos, actividades y publicaciones de estudiantes.</Text>
        </View>
        <View style={styles.moduleCard}>
          <Text style={styles.moduleTitle}>Foros académicos</Text>
          <Text style={styles.moduleDescription}>Preguntas y respuestas organizadas por categorías.</Text>
        </View>
        <Text style={styles.footer}>Prototipo en construcción · ConectaUCE</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f7fb' },
  container: { flex: 1, width: '100%', maxWidth: 620, alignSelf: 'center', paddingHorizontal: 24, paddingTop: 20 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 58 },
  brandMark: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#182d4d', alignItems: 'center', justifyContent: 'center' },
  brandLetter: { color: '#fff', fontWeight: '800', fontSize: 19 },
  brand: { color: '#182d4d', fontWeight: '800', fontSize: 20 },
  brandAccent: { color: '#285ca8' },
  eyebrow: { color: '#285ca8', fontSize: 10, fontWeight: '800', letterSpacing: 1.4, marginBottom: 16 },
  title: { color: '#182d4d', fontSize: 43, lineHeight: 48, fontWeight: '800', letterSpacing: -1.5 },
  titleAccent: { color: '#285ca8' },
  description: { color: '#657187', fontSize: 16, lineHeight: 24, marginTop: 18, marginBottom: 24 },
  statusCard: { flexDirection: 'row', alignItems: 'center', gap: 9, backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 18 },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: '#269b70' },
  dotError: { backgroundColor: '#cb5555' },
  statusText: { color: '#637087', fontSize: 13 },
  errorText: { color: '#a33e3e', fontSize: 12, lineHeight: 18, marginBottom: 12 },
  moduleCard: { padding: 18, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e4e9f1', marginBottom: 12 },
  moduleTitle: { color: '#182d4d', fontSize: 17, fontWeight: '700', marginBottom: 6 },
  moduleDescription: { color: '#69768b', fontSize: 13, lineHeight: 19 },
  footer: { color: '#8a94a5', fontSize: 11, textAlign: 'center', marginTop: 22, marginBottom: 20 },
});
