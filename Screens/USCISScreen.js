import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function USCISScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER FIJO APP */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={styles.title}>
          USCIS STATUS
        </Text>
      </View>

      {/* WEBVIEW CONTROLADO */}
      <View style={styles.webContainer}>
        <WebView
          source={{ uri: 'https://egov.uscis.gov/casestatus/mycasestatus.do' }}
          style={styles.webview}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          originWhitelist={['*']}
          allowsBackForwardNavigationGestures
        />
      </View>
      
      {/* FOOTER DIFERENTE: fondo claro para que los botones del sistema sean visibles */}
      <View
        style={[
          {
            backgroundColor: '#1d1e65ff',
            paddingTop: 8,
            paddingBottom: insets.bottom || 9,
            borderTopWidth: 1,
            borderTopColor: '#1E3A5F',
            alignItems: 'center',
            justifyContent: 'center'
          }
        ]}
      >
        <View style={{ width: '90%', height :'1', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
         
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1F44'
  },

  header: {
    backgroundColor: '#0A1F44',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E3A5F',
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold'
  },

  webContainer: {
    flex: 1,
    backgroundColor: '#0A1F44'
  },

  webview: {
    flex: 1
  }
});