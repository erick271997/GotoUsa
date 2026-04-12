import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CasesScreen() {
  const [cases, setCases] = useState([]);

  const loadCases = async () => {
    const data = await AsyncStorage.getItem('cases');
    setCases(data ? JSON.parse(data) : []);
  };

  useEffect(() => {
    loadCases();
  }, []);

  const deleteCase = async (index) => {
    const updated = cases.filter((_, i) => i !== index);
    await AsyncStorage.setItem('cases', JSON.stringify(updated));
    setCases(updated);
  };

  const copyCase = (number) => {
    Alert.alert('CASE COPIED', number);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A1F44', padding: 20 }}>

      <Text style={{
        color: '#FFD700',
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        SAVED CASES
      </Text>

      <FlatList
        data={cases}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{
            backgroundColor: '#1E3A5F',
            padding: 15,
            borderRadius: 10,
            marginTop: 10
          }}>

            <Text style={{ color: '#FFD700', fontWeight: 'bold' }}>
              {item.number}
            </Text>

            <Text style={{ color: 'white', marginTop: 5 }}>
              {item.status}
            </Text>

            <Text style={{ color: 'gray', marginTop: 5 }}>
              {item.createdAt}
            </Text>

            <View style={{ flexDirection: 'row', marginTop: 10 }}>

              <TouchableOpacity
                style={{
                  backgroundColor: '#2196F3',
                  flex: 1,
                  padding: 10,
                  marginRight: 5
                }}
                onPress={() => copyCase(item.number)}
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>
                  COPY
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: '#FF3B30',
                  flex: 1,
                  padding: 10,
                  marginLeft: 5
                }}
                onPress={() => deleteCase(index)}
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>
                  DELETE
                </Text>
              </TouchableOpacity>

            </View>

          </View>
        )}
      />

    </SafeAreaView>
  );
}