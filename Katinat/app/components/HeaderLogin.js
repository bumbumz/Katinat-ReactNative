import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from 'expo-router'


const HeaderLogin = () => {
    const unavigate = useNavigation();
    const [name, setName] = useState('')
    const fetchName = async () => {
        setName(await AsyncStorage.getItem("username"));

    }
    useEffect(() => {
        fetchName();
    }, [name])
    console.log(name)
    const handleLogout = async () => {
        await AsyncStorage.removeItem("userId")
        console.log(await AsyncStorage.getItem("userId"))
        unavigate.replace("MyTab")
    }

    return (
        <View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 50, marginHorizontal: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center", }}>
                    <MaterialCommunityIcons
                        name="account-circle-outline"
                        size={35}
                        color="#05291f"
                        style={{ paddingRight: 10 }}
                    />
                    <Text style={{ fontWeight: "600", color: "#05291f" }}>
                        {name}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", }}>


                    <TouchableOpacity

                        onPress={() => handleLogout()}
                    >
                        <Text style={{ color: "#b48c68", fontSize: 8 }}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>






        </View>
    );
}

export default HeaderLogin;

const styles = StyleSheet.create({
    textHd: {
        fontSize: 10,
        color: "white"
    }
});
