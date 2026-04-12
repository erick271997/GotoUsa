import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';
import { WebView } from 'react-native-webview';

export default function USCISScreen({ navigation }) {
  const [caseNumber, setCaseNumber] = useState('');
  const [showWeb, setShowWeb] = useState(false);
  const webRef = useRef(null);

  const searchCase = () => {
    if (!caseNumber) {
      Alert.alert('ERROR', 'ENTER CASE NUMBER');
      return;
    }

    setShowWeb(true);

    setTimeout(() => {
      webRef.current?.injectJavaScript(`
        document.querySelector('input[name="appReceiptNum"]').value = "${caseNumber}";
        document.querySelector('form').submit();
        true;
      `);
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A1F44' }}>

      {/* BACK */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ padding: 10 }}
      >
        <Text style={{ color: '#FFD700', fontWeight: 'bold' }}>
          ← BACK
        </Text>
      </TouchableOpacity>

      {/* INPUT UI */}
      {!showWeb && (
        <View style={{ padding: 20 }}>

          <Text style={{
            color: '#FFD700',
            fontSize: 22,
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            USCIS TRACKER
          </Text>

          <TextInput
            style={{
              backgroundColor: '#1E3A5F',
              color: 'white',
              padding: 15,
              borderRadius: 10,
              marginTop: 20,
              textTransform: 'uppercase'
            }}
            placeholder="ENTER CASE NUMBER"
            placeholderTextColor="gray"
            value={caseNumber}
            onChangeText={(t) => setCaseNumber(t.toUpperCase())}
          />

          <TouchableOpacity
            onPress={searchCase}
            style={{
              backgroundColor: '#FFD700',
              padding: 15,
              borderRadius: 10,
              marginTop: 15
            }}
          >
            <Text style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#0A1F44'
            }}>
              🔍 SEARCH INSIDE APP
            </Text>
          </TouchableOpacity>

        </View>
      )}

      {/* WEBVIEW (NO SALES DE LA APP) */}
      {showWeb && (
        <WebView
          ref={webRef}
          source={{ uri: 'https://egov.uscis.gov/casestatus/mycasestatus.do' }}
          style={{ flex: 1 }}
        />
      )}

    </SafeAreaView>
  );
}