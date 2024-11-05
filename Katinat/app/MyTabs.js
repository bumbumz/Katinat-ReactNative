import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import HomeScreen from './Screens/Tab/HomeScreen';
import Header from './components/Header'; // Import Header
import OderScreen from './Screens/Tab/OderScreen';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
const { width: widthall } = Dimensions.get('window'); // Lấy chiều rộng của màn hình
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import LoginScreen from './Screens/LoginScreen';
import Profile from './Screens/Tab/Profile';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#b48c68',
                tabBarInactiveTintColor: 'white',
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#114459',
                    borderTopWidth: 0,
                },
                tabBarIconStyle: {
                    marginBottom: -10,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    marginBottom: -15,
                },
                tabBarBackground: () => (
                    <View style={{ width: '100%', height: '5%' }}>
                        <Svg height="30" width={widthall} style={{
                            position: 'absolute',
                            top: -30,
                        }}>
                            <Path d={`M 0 30 Q ${widthall * 0.45} 0 ${widthall} 30 Z`} fill="#114459" />
                        </Svg>
                    </View>
                ),
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,

                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: ({ color }) =>
                        <FontAwesome5 name="home" size={25} color={color} />
                }}
            />
            <Tab.Screen
                name="Đặt nước"
                component={OderScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Đặt nước',
                    tabBarIcon: ({ color }) =>
                        <FontAwesome6 name="glass-water" size={25} color={color} />
                }}
            />
            <Tab.Screen
                name="Tài khoản"
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Tài khoản',
                    tabBarIcon: ({ color }) =>
                        <FontAwesome5 name="user-alt" size={24} color={color} />
                }}
            />

        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
});
