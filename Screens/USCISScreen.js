import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function USCISScreen() {
  const [result, setResult] = useState(null);
  const [caseNumber, setCaseNumber] = useState('');
  const [showWeb, setShowWeb] = useState(false);
  const [loading, setLoading] = useState(true); // 👈 SOLO AQUÍ

  const handlePress = async () => {
    if (caseNumber.trim().length > 5) {
      try {
        const existing = await AsyncStorage.getItem('cases');
        const cases = existing ? JSON.parse(existing) : [];
        cases.push(caseNumber.trim());
        await AsyncStorage.setItem('cases', JSON.stringify(cases));
        setShowWeb(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (showWeb) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0A1F44' }}>

        <View style={{ padding: 15, flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => setShowWeb(false)}>
            <Text style={{ color: '#FFD700' }}>← Back</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <Text style={{ textAlign: 'center', color: '#fff' }}>
            Checking your case...
          </Text>
        )}

<WebView
  source={{ uri: 'https://egov.uscis.gov/' }}
  style={{ flex: 1 }}
  onLoadEnd={() => {
    setLoading(false);

    // SIMULACIÓN TEMPORAL (luego mejoramos)
    setResult({
      status: "Case Was Received",
      date: "April 2025"
    });

    setShowWeb(false);
  }}
/>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>USCIS Case Status</Text>

      <TextInput
        placeholder="Enter your case number"
        value={caseNumber}
        onChangeText={setCaseNumber}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Check Case</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1F44',
    padding: 20,
  },
  title: {
    color: '#FFD700',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0A1F44',
    fontWeight: 'bold',
  },
});