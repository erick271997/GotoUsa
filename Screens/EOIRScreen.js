import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';

import * as Clipboard from 'expo-clipboard';
import { Linking } from 'react-native';

export default function EOIRScreen() {
  const [alienNumber, setAlienNumber] = useState('');

  // 🔍 OPEN EOIR
  const openEOIR = () => {
    if (!alienNumber) {
      Alert.alert('ERROR', 'ENTER A-NUMBER');
      return;
    }

    Linking.openURL('https://acis.eoir.justice.gov/en/');
  };

  // 📋 COPY A NUMBER
  const copyA = async () => {
    if (!alienNumber) {
      Alert.alert('ERROR', 'ENTER A-NUMBER');
      return;
    }

    await Clipboard.setStringAsync(alienNumber);
    Alert.alert('COPIED', alienNumber);
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#1E1B4B',
      padding: 20
    }}>

      {/* TITLE */}
      <Text style={{
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        EOIR COURT STATUS ⚖️
      </Text>

      {/* INPUT */}
      <TextInput
        style={{
          backgroundColor: '#333',
          color: 'white',
          padding: 15,
          borderRadius: 10,
          marginTop: 20
        }}
        placeholder="ENTER A-NUMBER (A123456789)"
        placeholderTextColor="gray"
        value={alienNumber}
        onChangeText={setAlienNumber}
        autoCapitalize="characters"
      />

      {/* SEARCH */}
      <TouchableOpacity
        style={{
          backgroundColor: '#8B5CF6',
          padding: 15,
          borderRadius: 10,
          marginTop: 20
        }}
        onPress={openEOIR}
      >
        <Text style={{
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          🔍 SEARCH CASE
        </Text>
      </TouchableOpacity>

      {/* COPY */}
      <TouchableOpacity
        style={{
          backgroundColor: '#2196F3',
          padding: 15,
          borderRadius: 10,
          marginTop: 10
        }}
        onPress={copyA}
      >
        <Text style={{
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          📋 COPY A-NUMBER
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}