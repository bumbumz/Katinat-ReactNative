import React, { useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import Banner from '../../components/Banner';
import BestSale from '../../components/BestSale';
import Header from '../../components/Header';
import { Octicons } from '@expo/vector-icons';
import Foundation from '@expo/vector-icons/Foundation';
import Entypo from '@expo/vector-icons/Entypo';
import MustTry from '../../components/MustTry';
import NewsEvent from '../../components/NewsEvent';

const HomeScreen = () => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [headerVisible, setHeaderVisible] = useState(true);

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 40],
        outputRange: [100, 0],
        extrapolate: 'clamp',
    });
    const headerTranslate = scrollY.interpolate({
        inputRange: [0, 40],
        outputRange: [0, -60],
        extrapolate: 'clamp',
    });


    return (
        <View style={{ flex: 1 }}>
            <Animated.View
                style={[
                    styles.header,
                    {
                        height: headerHeight,

                        transform: [{ translateY: headerTranslate }],
                    },

                ]}
            >
                <Header />
            </Animated.View>
            {headerVisible ? (
                <View style={{ backgroundColor: "white", height: 80 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: "white", height: 80, paddingTop: 10, paddingStart: 20, alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: 'row', alignItems: "center", }}>
                            <Image
                                source={require("../../../assets/images/user.jpg")}
                                style={{ height: 50, width: 50, borderRadius: 200 }}
                            />
                            <Text style={{
                                fontSize: 10,
                                color: '#114459',
                                fontWeight: "700",
                                paddingLeft: 5,
                                marginBottom: 5,
                                zIndex: 3,
                            }}>Phạm Công Vinh </Text>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <Foundation name="burst-sale" size={27} color="black"
                                style={{ padding: 10 }} />
                            <Entypo name="bell" size={27} color="black"
                                style={{ padding: 10 }}
                            />
                        </View>

                    </View>



                </View>
            ) : (
                <View style={{ flexDirection: 'row', backgroundColor: "blue", height: 80 }}>
                    <Text style={{
                        fontSize: 13,
                        color: '#114459',
                        fontWeight: "500",
                        paddingLeft: 5,
                        marginBottom: 5,
                        zIndex: 3, paddingTop: 30
                    }}>Phạm Công Vinh </Text>
                </View>

            )}
            <View style={{ backgroundColor: 'white' }}>
                <Animated.ScrollView
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                    style={{ marginBottom: 100 }}

                    scrollEventThrottle={16}
                >

                    <View style={{ zIndex: 3 }}>

                        <Banner />
                    </View>
                    <View style={{
                        paddingBottom: 100
                    }}>
                        <BestSale />
                        <MustTry />

                        <NewsEvent />
                    </View>
                </Animated.ScrollView>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    header: {
        zIndex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
});
