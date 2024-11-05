import { ImageBackground, StyleSheet, Text, View, Animated, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { GET_ALL, GET_IMG, PostWishList } from '../apiMe';
import { Path, Svg } from 'react-native-svg';
import { Entypo, Feather, Foundation, Octicons } from '@expo/vector-icons';

import Ionicons from '@expo/vector-icons/Ionicons';
import ViewButtomBuy from '../components/ViewButtomBuy';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtomWishList from '../components/ButtomWishList';
function ImageV({ imageSource, headerVisible }) {
    return (
        <View style={styles.imageContainer}>
            <ImageBackground source={{ uri: imageSource }} style={styles.image} >
                <Svg height="50" width="100%" style={{
                    position: 'absolute',
                    bottom: -20.3,
                }}>
                    <Path d="M 0 30 Q 175 -30 390 30 Z" fill="white" />
                </Svg>

            </ImageBackground>
        </View>
    );
}
const DetailProduct = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { product } = route.params;
    const [rock, setRock] = useState(null);
    const [sugar, setSugar] = useState(null);
    const [text, setText] = useState("");
    //console.log("dữ liệu", product)
    const imageUrl = GET_IMG(product.thumbnail);

    const [selectedRock, setSelectedRock] = useState(0);
    const [selectedSugar, setSelectedSugar] = useState(0);
    const [postRock, setPostRock] = useState("Đá bình thường")
    const [postSugar, setPostSugar] = useState("Ngọt bình thường")
    useEffect(() => {
        setRock(product.rocks);
        setSugar(product.sugar);
    }, [rock, sugar])
    // console.log("rock", rock);
    //console.log("sugar", sugar);
    const scrollY = useRef(new Animated.Value(0)).current;
    const [headerVisible, setHeaderVisible] = useState(true);

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 20],
        outputRange: [10, 0],
        extrapolate: 'clamp',
    });

    const headerTranslate = scrollY.interpolate({
        inputRange: [0, 20],
        outputRange: [0, -20],
        extrapolate: 'clamp',
    });
    useEffect(() => {
        const listener = scrollY.addListener(({ value }) => {
            setHeaderVisible(value <= 40);
        });

        return () => {
            scrollY.removeListener(listener);
        };
    }, []);
    //console.log(headerVisible)
    const headerBackgroundColor = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
        extrapolate: 'clamp',
    });
    //console.log("đang chọn đá :", selectedRock)
    const handeleRock = (index, item) => {
        setSelectedRock(index)
        setPostRock(item)

    }
    console.log("đang chọn :", postRock)

    const handelSugar = (index, item) => {
        setSelectedSugar(index)
        setPostSugar(item)

    }
    const handleCart = async () => {
        const idd = await AsyncStorage.getItem("userId");
        if (idd == null) {
            Alert.alert("Bạn chưa đăng nhập tài khoản")
        }
        else {
            navigation.navigate("CatDetail");
            // console.log("chuyển trang")
        }

    }




    return (

        <View style={{}}>
            {headerVisible ? (
                <View style={{ height: 80, position: "absolute", top: 0, width: '100%', zIndex: 10 }}>
                    <View style={{
                        flexDirection: 'row',

                        height: 80,
                        paddingTop: 10,
                        paddingStart: 20,
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginRight: 15
                    }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ flexDirection: 'row', height: 30, width: 30, borderRadius: 50, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: "center", alignItems: "center" }}>
                            <Ionicons name="arrow-back-outline" size={20} color="white" />

                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", }}
                            onPress={() => handleCart()}
                        >
                            <Image source={require("../../assets/images/bag.png")} style={{ height: 40, width: 40 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <Animated.View style={{ height: 80, position: "absolute", top: 0, width: '100%', zIndex: 10, backgroundColor: headerBackgroundColor }}>
                    <View style={{
                        flexDirection: 'row',

                        height: 80,
                        marginRight: 15,
                        paddingStart: 20,
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>

                        <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                                <Ionicons name="arrow-back-outline" size={20} color="#114459" />

                            </View>
                            <Text style={{
                                marginLeft: 10,
                                fontSize: 13,
                                color: '#114459',
                                fontWeight: "700",
                                paddingLeft: 5,
                            }}>{product.product_name}</Text>
                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", }}
                            onPress={() => handleCart()}

                        >
                            <Image source={require("../../assets/images/bag3.png")} style={{ height: 40, width: 40 }} />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}


            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}

                scrollEventThrottle={16}

            >
                <Animated.View
                    style={{
                        zIndex: 1,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        height: headerHeight,
                        transform: [{ translateY: headerTranslate }],
                    }}
                >

                </Animated.View>

                <View style={styles.imageSection}>
                    <ImageV imageSource={imageUrl} headerVisible={headerVisible} />

                </View>

                <View style={{ backgroundColor: "white", borderBottomRightRadius: 15, borderBottomLeftRadius: 15, paddingVertical: 15, marginBottom: 5 }}>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingRight: 20 }}>
                        <Text style={{
                            marginLeft: 10,
                            fontSize: 18,
                            color: '#114459',
                            fontWeight: "700",
                            paddingLeft: 5,
                        }}>{product.product_name}</Text>

                        <ButtomWishList product={product.id} rock={postRock} sugar={postSugar} />


                    </View>
                    <Text style={{
                        paddingTop: 5,
                        paddingHorizontal: 5,
                        marginLeft: 15,
                        fontSize: 10,
                        color: "#9C9C9C"
                    }}>{product.description}</Text>
                </View>

                {(rock && rock.length > 0) ?

                    (<>
                        <View style={{ backgroundColor: "white", borderRadius: 15, paddingVertical: 15, marginBottom: 5, paddingLeft: 15 }}>
                            <Text style={{

                                fontSize: 15,
                                color: '#114459',
                                fontWeight: "700",

                            }}>Chọn mức đá</Text>
                            {rock.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => handeleRock(index, item)} style={{ flexDirection: "row", margin: 5, alignItems: "center" }}>
                                        {selectedRock === index
                                            ? <Ionicons name="checkmark-circle" size={26} color="#114459" />
                                            :
                                            <Feather name="circle" size={26} color="black" />
                                        }
                                        <Text style={{ color: selectedRock === index ? '#114459' : '#9C9C9C', paddingLeft: 5 }}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>

                                )

                            })}
                        </View>
                    </>)

                    :
                    <View >

                    </View>
                }



                {(sugar && sugar.length > 0) ? (
                    <>
                        <View style={{ backgroundColor: "white", borderRadius: 15, paddingVertical: 15, marginBottom: 5, paddingLeft: 15, }}>
                            <Text style={{ fontSize: 15, color: '#114459', fontWeight: "700" }}>Chọn mức đường</Text>
                            {sugar.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => handelSugar(index, item)} style={{ flexDirection: "row", margin: 5, alignItems: "center" }}>
                                        {selectedSugar === index
                                            ? <Ionicons name="checkmark-circle" size={26} color="#114459" />
                                            : <Feather name="circle" size={26} color="black" />
                                        }
                                        <Text style={{ color: selectedSugar === index ? '#114459' : '#9C9C9C', paddingLeft: 5 }}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </>
                ) : (
                    <View >

                    </View>
                )}

                <View style={{ backgroundColor: "white", borderRadius: 15, paddingVertical: 15, marginBottom: 5, marginBottom: "35%" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{
                            marginLeft: 10,
                            fontSize: 10,
                            color: '#114459',
                            fontWeight: "700",
                            paddingLeft: 5,
                        }}>Thêm lưu ý cho quán</Text>
                        <Text style={{
                            marginLeft: 2,
                            fontSize: 8,
                            color: '#114459',
                        }}>(Không bắt buộc)</Text>

                    </View>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{ justifyContent: "center", alignItems: "center" }}
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={{ width: "100%", alignItems: "center" }}>
                                <TextInput
                                    style={{
                                        width: "85%",
                                        height: 45,
                                        borderColor: "#CCCCCC",
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        backgroundColor: "#F5F5F5"
                                    }}
                                    value={text}
                                    onChangeText={(input) => setText(input)}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>






            </Animated.ScrollView>
            <ViewButtomBuy product={product} rock={postRock} sugar={postSugar} />

        </View>
    )
}

export default DetailProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageSection: {

        justifyContent: 'center',
        alignItems: 'center',

    },
    imageContainer: {
        width: '100%',

    },
    image: {
        width: '100%',
        height: 350,
        resizeMode: 'contain',
    },
    detailsSection: {
        flex: 2,
        paddingLeft: 20,

    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#464646",
        paddingLeft: 10,
        marginTop: 120
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        fontWeight: "bold",
    },
    ratingCount: {
        color: "#808080",
    },
    icons: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginHorizontal: 10,
    },
    descriptionSection: {


        backgroundColor: "white",
        paddingBottom: 20

    },

});


