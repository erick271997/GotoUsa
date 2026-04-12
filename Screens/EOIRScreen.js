import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

export default function EOIRScreen() {

  const openEOIR = () => {
    Linking.openURL('https://acis.eoir.justice.gov/en/');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A1F44' }}>
      
      <Text style={{ color: '#FFD700', fontSize: 18, marginBottom: 20 }}>
        Check your court case
      </Text>

      <TouchableOpacity
        onPress={openEOIR}
        style={{
          backgroundColor: '#FFD700',
          padding: 15,
          borderRadius: 10
        }}
      >
        <Text style={{ color: '#0A1F44', fontWeight: 'bold' }}>
          Open EOIR
        </Text>
      </TouchableOpacity>

    </View>
  );
}