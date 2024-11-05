import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { GetUserIdByEmailAndUsername } from '../apiMe'

const ForgetPassword = () => {

    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');


    const handleClick = async () => {
        try {


            console.log("email", email)
            console.log("username", username)
            const request = await GetUserIdByEmailAndUsername(email, username)
            console.log("id", request.data)
            navigation.navigate('ResetPassWord', { id: request.data })


        } catch (error) {
            console.error("Update failed", error);
        }



    }
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ flex: 0.1, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 5 }}>
                <TouchableOpacity style={{
                    width: "10%", justifyContent: "center",
                    alignItems: "center"
                }}
                // onPress={() => handleBack()}
                >
                    <View style={{
                        flexDirection: 'row',
                        height: 30, width: 30,
                        borderRadius: 50,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Ionicons name="arrow-back-outline" size={20} color="white" />
                    </View>
                </TouchableOpacity>
                <View style={{
                    width: "80%", justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '700',
                    }}>Chỉnh sửa trang cá nhân</Text>
                </View>
                <View style={{ width: "10%" }} />
            </View>

            <View style={{ flex: 1, padding: 16 }}>

                <InputField label="Username" value={username} onChangeText={setUsername} />
                <InputField label="Email" value={email} onChangeText={setEmail} />
            </View>

            <View style={{ flex: 0.1, justifyContent: "center", alignItems: "center" }}>
                <View style={{ width: "60%" }}>
                    <TouchableOpacity
                        onPress={handleClick}
                        style={styles.updateButton}
                    >
                        <Text style={styles.updateButtonText}>Gửi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const InputField = ({ label, value, onChangeText, secureTextEntry }) => (
    <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 12, marginBottom: 5 }}>{label}</Text>
        <TextInput
            style={styles.input}
            placeholder={`${label}...`}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    </View>
);

export default ForgetPassword

const styles = StyleSheet.create({
   MyTabs
});