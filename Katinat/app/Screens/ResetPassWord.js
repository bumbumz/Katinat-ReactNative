import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UpdateUser } from '../apiMe';
import { useNavigation } from 'expo-router';

const ResetPassWord = () => {
    const route = useRoute();
    const navigation = useNavigation()
    const { id } = route.params;
    console.log("id là", id)
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const toggleSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };
    const handleClick = async () => {
        try {
            const userData = {
                password
            };
            console.log("password", userData)
            await UpdateUser(id, userData)
            navigation.navigate('MyTab')

        }
        catch (error) {
            console.log(error);
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

                <Text style={styles.titleInput}>Mật khẩu</Text>
                <View style={styles.passwordContainerFrom}>
                    <TextInput
                        style={styles.inputFrom}
                        placeholder="Password..."
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={secureTextEntry}
                    //show pass
                    />
                    <TouchableOpacity onPress={toggleSecureTextEntry} style={styles.eyeIconFrom}>
                        <Ionicons name={secureTextEntry ? 'eye-off' : 'eye'} size={24} color="black" />
                    </TouchableOpacity>
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
        </View>
    )
}

export default ResetPassWord

const styles = StyleSheet.create({

    titleInput: {
        fontSize: 12,

        marginVertical: 10

    },
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
    },
    eyeIconFrom: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    inputFrom: {
        height: 40,
        backgroundColor: "#FFFFFF",
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 5,
        paddingLeft: 20
    },

})