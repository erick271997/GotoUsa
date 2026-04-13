import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  Linking
} from 'react-native';

import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [caseNumber, setCaseNumber] = useState('');
  const [cases, setCases] = useState([]);

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    const data = await AsyncStorage.getItem('cases');
    setCases(data ? JSON.parse(data) : []);
  };

  const saveCase = async () => {
    if (!caseNumber) return;

    const newCase = {
      number: caseNumber.toUpperCase(),
      createdAt: new Date().toLocaleString()
    };

    const updated = [...cases, newCase];
    await AsyncStorage.setItem('cases', JSON.stringify(updated));

    setCases(updated);
    setCaseNumber('');

    Alert.alert('SAVED', 'CASE ADDED');
  };

  const deleteCase = async (index) => {
    const updated = cases.filter((_, i) => i !== index);
    await AsyncStorage.setItem('cases', JSON.stringify(updated));
    setCases(updated);
  };

  const copyCase = async (number) => {
    await Clipboard.setStringAsync(number);
    Alert.alert('COPIED', number);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A1F44', padding: 20 }}>

      <Text style={{
        color: '#FFD700',
        fontSize: 26,
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        CASE MANAGER
      </Text>

      {/* INPUT */}
      <TextInput
        style={{
          backgroundColor: '#1E3A5F',
          color: 'white',
          padding: 15,
          borderRadius: 10,
          marginTop: 20
        }}
        placeholder="ENTER CASE NUMBER"
        placeholderTextColor="gray"
        value={caseNumber}
        onChangeText={setCaseNumber}
        autoCapitalize="characters"
      />

      {/* SAVE */}
      <TouchableOpacity
        onPress={saveCase}
        style={{
          backgroundColor: '#4CAF50',
          padding: 15,
          borderRadius: 10,
          marginTop: 15
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
          💾 SAVE CASE
        </Text>
      </TouchableOpacity>

      {/* OPEN USCIS SCREEN */}
      <TouchableOpacity
        onPress={() => navigation.navigate('USCIS')}
        style={{
          backgroundColor: '#5da5f1ff',
          padding: 15,
          borderRadius: 10,
          marginTop: 10
        }}
      >
        <Text style={{ color: '#0A1F44', textAlign: 'center', fontWeight: 'bold' }}>
          🛂 OPEN USCIS
        </Text>
      </TouchableOpacity>

      {/* OPEN EOIR (abre dentro de la app) */}
      <TouchableOpacity
        onPress={() => navigation.navigate('EOIR')}
        style={{
          backgroundColor: '#f4db61ff',
          padding: 15,
          borderRadius: 10,
          marginTop: 10
        }}
      >
        <Text style={{ color: '#0A1F44', textAlign: 'center', fontWeight: 'bold' }}>
          ⚖️ OPEN EOIR
        </Text>
      </TouchableOpacity>
        

      {/* LIST */}
      <FlatList
        data={cases}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginTop: 20 }}
        renderItem={({ item, index }) => (
          <View style={{
            backgroundColor: '#1E3A5F',
            padding: 15,
            borderRadius: 10,
            marginBottom: 10
          }}>

            <Text style={{ color: '#FFD700', fontWeight: 'bold' }}>
              {item.number}
            </Text>

            <Text style={{ color: 'white', marginTop: 5 }}>
              {item.createdAt}
            </Text>

            <View style={{ flexDirection: 'row', marginTop: 10 }}>

              <TouchableOpacity
                onPress={() => copyCase(item.number)}
                style={{
                  backgroundColor: '#2196F3',
                  padding: 8,
                  borderRadius: 6,
                  marginRight: 10
                }}
              >
                <Text style={{ color: 'white' }}>COPY</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteCase(index)}
                style={{
                  backgroundColor: '#E53935',
                  padding: 8,
                  borderRadius: 6
                }}
              >
                <Text style={{ color: 'white' }}>DELETE</Text>
              </TouchableOpacity>

            </View>
          </View>
        )}
      />

    </SafeAreaView>
  );
}