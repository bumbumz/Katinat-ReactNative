import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { LoginUser } from '../apiMe';
import RegisterScreen from './RegisterScreen';
const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };



    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            console.log('Attempting to log in with:', { email, password });
            const response = await LoginUser(email, password);
            if (response != null) {
                setUser(response.data);
                await Promise.all([
                    AsyncStorage.setItem('userId', response.data.userDto.userId.toString()),
                    AsyncStorage.setItem('username', response.data.userDto.username)
                ]);
                console.log("Stored userId:", response.data.userDto.userId.toString());
            }
        } catch (error) {
            Alert.alert('Login Error', 'Lỗi tài khoản hoặc mặt khẩu');
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect to handle side effects after a successful login
    useEffect(() => {
        if (user) {

            navigation.replace("MyTab")
            // Redirect or update user status here
        }
    }, [user]); // This effect will run whenever the user state changes
    console.log("data gom ", user);
    const handleAboutUs = () => {

        navigation.navigate("AboutUs")
    }
    const handleHelpAndContact = () => {
        navigation.navigate("HelpAndContact")
    }

    const [openlogin, setOpenLogin] = useState(true);

    const handeleRegister = () => {
        setOpenLogin(!openlogin);
    }

    const handleForgetPassword = () => {
        navigation.navigate("ForgetPassword")
    }


    return (
        <SafeAreaView style={styles.container}

        >



            <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", color: "#002200", }}>Đăng nhập</Text>
            </View>
            {
                openlogin ?

                    <View>
                        {isLoading &&
                            <ActivityIndicator size="large" color="#0000ff" />}

                        <View style={styles.containerFrom}>
                            <Text style={styles.titleInput}>Tên đăng nhập </Text>
                            <TextInput
                                style={styles.inputFrom}
                                placeholder="Username..."
                                value={email}
                                onChangeText={setEmail}
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
                            <TouchableOpacity style={styles.forgetPassContainer}
                                onPress={handleForgetPassword}>

                                <Text style={styles.forgetPassText}>Quên mật khẩu</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={handleLogin}
                                style={styles.startButon}>
                                <Text
                                    style={styles.textButton}
                                >
                                    Đăng nhập
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 5 }}>
                            <Text style={{ fontWeight: "300" }}>Bạn chưa có tài khoản?</Text>
                            <TouchableOpacity
                                style={{}}
                                onPress={handeleRegister}
                            >
                                <Text style={{ textDecorationLine: 'underline', fontWeight: "500" }}>Đăng ký</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    :
                    <RegisterScreen onPress={handeleRegister} />

            }
            <TouchableOpacity
                onPress={handleAboutUs}
            >
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.thickLine} />
                </View>
                <View style={{ flexDirection: "row", paddingStart: 30, paddingVertical: 15 }}>
                    <MaterialCommunityIcons name="home-modern" size={24} color="black" />
                    <View style={{ justifyContent: "center" }}>
                        <Text style={{ fontWeight: "500", fontSize: 12 }}>Về chúng tôi</Text>
                    </View>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.thickLine} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleHelpAndContact}

            >

                <View style={{ flexDirection: "row", paddingStart: 30, paddingVertical: 15 }}>
                    <MaterialCommunityIcons name="home-modern" size={24} color="black" />
                    <View style={{ justifyContent: "center" }}>
                        <Text style={{ fontWeight: "500", fontSize: 12 }}>Trợ giúp & Liên hệ</Text>
                    </View>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.thickLine} />
                </View>
            </TouchableOpacity>

        </SafeAreaView>
    )
};

export default LoginScreen;


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
