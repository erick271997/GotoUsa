import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A1F44' }}>
      <ScrollView contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20
      }}>

        {/* LOGO / TITULO */}
        <Text style={{
          color: '#FFD700',
          fontSize: width * 0.08, // adaptable
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          GoToUSA 🇺🇸
        </Text>

        <Text style={{
          color: '#fff',
          textAlign: 'center',
          marginTop: 10,
          marginBottom: 40,
          fontSize: width * 0.04
        }}>
          Check your immigration status easily
        </Text>

        {/* BOTÓN USCIS */}
        <TouchableOpacity
          style={{
            backgroundColor: '#FFD700',
            paddingVertical: 18,
            borderRadius: 12,
            marginBottom: 20
          }}
          onPress={() => navigation.navigate('USCIS')}
        >
          <Text style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: width * 0.045
          }}>
            Check USCIS Case
          </Text>
        </TouchableOpacity>

        {/* BOTÓN EOIR */}
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            paddingVertical: 18,
            borderRadius: 12
          }}
          onPress={() => navigation.navigate('EOIR')}
        >
          <Text style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: width * 0.045
          }}>
            Check EOIR Case
          </Text>
        </TouchableOpacity>

        {/* INFO GRATIS */}
        <Text style={{
          color: '#ccc',
          textAlign: 'center',
          marginTop: 40,
          fontSize: width * 0.035
        }}>
          Free access. AI assistance available with premium.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}