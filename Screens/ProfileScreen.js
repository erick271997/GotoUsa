import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

export default function ProfileScreen({ navigation }) {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#0A1F44', justifyContent: 'center', alignItems: 'center' }}>
			<View>
				<Text style={{ color: '#FFD700', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Profile</Text>
				<Text style={{ color: 'white', marginTop: 12, textAlign: 'center' }}>Placeholder screen</Text>
				<TouchableOpacity onPress={() => navigation?.goBack?.()} style={{ marginTop: 20, padding: 10 }}>
					<Text style={{ color: '#FFD700', textAlign: 'center' }}>← Back</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
