import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { GET_ALL, UpdateUser } from '../apiMe'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from 'expo-router'

const EditProfileScreen = () => {
    const navigate = useNavigation()
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const fetchUser = async () => {
        const idd = await AsyncStorage.getItem("userId");
        GET_ALL(`users/${idd}`)
            .then(response => {
                setUser(response.data);
                const userData = response.data;
                setFirstName(userData.firstName || '');
                setLastName(userData.lastName || '');
                setUsername(userData.username || '');
                setEmail(userData.email || '');

            })
            .catch(error => {
                console.error(error);
            });
    }
    useEffect(() => {
        fetchUser();
    }, [])

    const handleUpdate = async () => {
        try {
            const idd = await AsyncStorage.getItem("userId");

            const userData = {
                email,
                firstName,
                lastName,
                username,
                ...(password ? { password } : {}) // Chỉ thêm password nếu có giá trị
            };

            UpdateUser(idd, userData);

            await AsyncStorage.removeItem("userId");
            navigate.replace("MyTab");
        } catch (error) {
            console.error("Update failed", error);
        }
    };
    console.log("user", user)
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
                <InputField label="First Name" value={firstName} onChangeText={setFirstName} />
                <InputField label="Last Name" value={lastName} onChangeText={setLastName} />
                <InputField label="Username" value={username} onChangeText={setUsername} />
                <InputField label="Email" value={email} onChangeText={setEmail} />
                <InputField label="Password" value={password} onChangeText={setPassword} secureTextEntry />
            </View>

            <View style={{ flex: 0.1, justifyContent: "center", alignItems: "center" }}>
                <View style={{ width: "60%" }}>
                    <TouchableOpacity
                        onPress={handleUpdate}
                        style={styles.updateButton}
                    >
                        <Text style={styles.updateButtonText}>Cập nhật</Text>
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

const styles = StyleSheet.create({
    input: {
        height: 40,
        backgroundColor: "#FFFFFF",
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 8,
        borderRadius: 5,
        paddingLeft: 20
    },
    updateButton: {
        backgroundColor: '#bb946b',
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    updateButtonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 12
    }
});

export default EditProfileScreen;
