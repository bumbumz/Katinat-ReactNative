import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { RegisterUser } from '../apiMe'

const RegisterScreen = ({ onPress }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setName] = useState('')
    const [show, setShow] = useState(false)
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };
    const handleNext = () => {
        setShow(!show);
    }
    const handleRegister = async () => {
        //console.log(email, password, name)
        try {
            //console.log('Attempting to log in with:', { email, password }); // Log the request payload
            const role = "USER"
            const response = await RegisterUser(username, email, password, role);
            if (response != null) {
                console.log("thanh cong", response.data);
                onPress()
                // await AsyncStorage.setItem('userId', response.data.userDto.userId.toString());
                // await AsyncStorage.setItem('username', response.data.userDto.username);
                // console.log("Stored userId:", await AsyncStorage.getItem('userId'));
            }
        } catch (error) {
            Alert.alert('Login Error', ' Lỗi  tài khoản hoặc mặt khẩu');
        }
    }


    return (
        <View>
            {
                show ?
                    <View style={styles.containerFrom}>
                        <Text style={styles.titleInput}>Tên đăng ký </Text>
                        <TextInput
                            style={styles.inputFrom}
                            placeholder="Username..."
                            value={username}
                            onChangeText={setName}
                        />
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
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={handleRegister}
                                style={styles.startButon}>
                                <Text
                                    style={styles.textButton}
                                >
                                    Đăng ký
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    : <View>
                        <View style={styles.containerFrom}>
                            <Text style={styles.titleInput}>Email đăng ký </Text>
                            <TextInput
                                style={styles.inputFrom}
                                placeholder="Email..."
                                keyboardType="email-address"
                                autoCapitalize="none"//tắt viết hoa
                                autoCorrect={false}//tắt sửa lỗi
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={handleNext}
                                style={styles.startButon}>
                                <Text
                                    style={styles.textButton}
                                >
                                    Tiếp tục
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

            }

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 5 }}>
                <Text style={{ fontWeight: "300" }}>Bạn đã có tài khoản?</Text>
                <TouchableOpacity
                    style={{}}
                    onPress={onPress}
                >
                    <Text style={{ textDecorationLine: 'underline', fontWeight: "500" }}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: "white"

    },
    iconContainer: {


    },
    icon: {
        position: "absolute",
        top: 10,
        left: 10,
    },
    wellcome: {

        justifyContent: "center",
        alignItems: "center"
    },
    textWc: {
        fontSize: 30,
    },
    from: {


    },
    button: {



    },
    startButon:
    {
        backgroundColor: "rgba(153, 102, 0,0.3)",
        padding: 15,
        borderRadius: 10,
        borderCurve: 'continuous',
        alignItems: 'center',
        position: 'bottom',
        marginLeft: 10,
        marginRight: 10



    },
    containerFrom: {


        justifyContent: 'center',
        padding: 16,
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

    eyeIconFrom: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    titleInput: {
        fontSize: 12,

        marginVertical: 10

    },
    forgetPassContainer: {
        alignItems: 'flex-start',
    },
    forgetPassText: {
        color: '#CC9966',
        textDecorationLine: 'underline',
    },
    textButton: {
        color: "white",
        fontSize: 15,
        fontWeight: 'bold',
    },
    thickLine: {
        width: '90%',  // Độ dài của đường kẻ (có thể thay đổi theo ý muốn)
        height: 1.5,     // Độ dày của đường kẻ
        backgroundColor: '#EEEEEE',  // Màu của đường kẻ
        marginVertical: 10,  // Khoảng cách trên dưới

    }


})
