import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import LoginScreen from '../LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import UserScreens from '../UserScreens';


const Profile = () => {
    const uni = useNavigation()
    const [user, setUser] = useState(null);
    useFocusEffect(
        useCallback(() => {
            const fetchUser = async () => {
                try {
                    const id = await AsyncStorage.getItem('userId');
                    setUser(id);
                    console.log("setUser", id);
                } catch (error) {
                    console.error('Failed to fetch userId:', error);
                }
            };

            fetchUser();
        }, []) // Hàm này không phụ thuộc vào user, nên mảng phụ thuộc là rỗng
    );


    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            {user ? (
                <View style={styles.loadingContainer}>
                    <UserScreens />
                </View>
            ) : (
                <LoginScreen />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,

    },
    loadingText: {
        fontSize: 18,
        color: 'gray',
    },
});
export default Profile;