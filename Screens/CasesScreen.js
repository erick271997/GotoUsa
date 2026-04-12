import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

export default function CasesScreen() {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    const data = await AsyncStorage.getItem('cases');
    if (data) {
      setCases(JSON.parse(data));
    }
  };

  const deleteCase = async (caseNumber) => {
    const updated = cases.filter(c => c !== caseNumber);
    setCases(updated);
    await AsyncStorage.setItem('cases', JSON.stringify(updated));
  };

  // 👉 SI SELECCIONA UN CASO → WEBVIEW
  if (selectedCase) {
    return (
      <View style={{ flex: 1 }}>
        
        <TouchableOpacity
          style={{ backgroundColor: '#0A1F44', padding: 15 }}
          onPress={() => setSelectedCase(null)}
        >
          <Text style={{ color: '#FFD700' }}>← Back</Text>
        </TouchableOpacity>

        <WebView
          source={{ uri: 'https://egov.uscis.gov/casestatus/mycasestatus.do' }}
          style={{ flex: 1 }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A1F44', padding: 20 }}>

      <Text style={{
        color: '#FFD700',
        fontSize: 22,
        marginBottom: 20
      }}>
        My Cases
      </Text>

      <FlatList
        data={cases}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{
            backgroundColor: '#fff',
            padding: 15,
            borderRadius: 12,
            marginBottom: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            
            {/* CLICK PARA VER */}
            <TouchableOpacity onPress={() => setSelectedCase(item)}>
              <Text style={{ fontWeight: 'bold' }}>{item}</Text>
            </TouchableOpacity>

            {/* BOTÓN ELIMINAR */}
            <TouchableOpacity onPress={() => deleteCase(item)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>

          </View>
        )}
      />

    </SafeAreaView>
  );
}