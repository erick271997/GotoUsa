import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import { WebView } from 'react-native-webview';
import { Linking } from 'react-native';
export default function EOIRScreen({ route }) {
  const alienNumberFromHome = route?.params?.alienNumber || '';
  const [alienNumber, setAlienNumber] = useState(alienNumberFromHome);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
const openEOIR = () => {
  Linking.openURL('https://acis.eoir.justice.gov/en/');
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B4B' }}>

      {/* HEADER */}
      <View style={{ padding: 20 }}>
        <Text style={{
          color: 'white',
          fontSize: 20,
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          EOIR COURT STATUS ⚖️
        </Text>


      </View>

      {/* LOADING */}
      {loading && !error && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FFD700" />
          <Text style={{ color: 'white', marginTop: 10 }}>
            LOADING EOIR...
          </Text>
        </View>
      )}

      {/* ERROR UI PERSONALIZADO */}
      {error && (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20
        }}>
          

          <TouchableOpacity
            onPress={openEOIR}
            style={{
              backgroundColor: '#8B5CF6',
              padding: 15,
              borderRadius: 10,
              marginTop: 20
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              OPEN IN BROWSER
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* WEBVIEW */}
      {!error && (
        <WebView
          source={{ uri: 'https://acis.eoir.justice.gov/en/' }}
          style={{ flex: 1 }}

          onLoadStart={() => {
            setLoading(true);
            setError(false);
          }}

          onLoadEnd={() => {
            setLoading(false);
          }}

          onError={() => {
            setError(true);
            setLoading(false);
          }}

          onHttpError={() => {
            setError(true);
            setLoading(false);
          }}
        />
      )}

    </SafeAreaView>
  );
}