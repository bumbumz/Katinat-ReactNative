import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { TouchableOpacity } from 'react-native';

import { Path, Svg } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GET_IMG, GET_ALL, DELETE_ALL, POST } from '../apiMe';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';




function ViewProduct({ item, onPress, refreshCart }) {
    const [quantitys, setQuantity] = useState(item.quantity);
    const handleTru = async (id) => {
        if (quantitys > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
            await POST(`cartdetail/tru/${id}`)
            refreshCart();
        }
        else {

            await DELETE_ALL(`cartdetail/destroy/${id}`)
            refreshCart();


        }
    };


    const handleCong = async (id) => {
        setQuantity(prevQuantity => prevQuantity + 1);
        await POST(`cartdetail/cong/${id}`)
        refreshCart();
    };

    const hinh = item.thumbnail && item.thumbnail.length > 0 ? GET_IMG(item.thumbnail[0]) : null;
    return (
        <TouchableOpacity onPress={onPress} style={styles.productContainer}>
            <View style={styles.productImage}>
                <Image source={{ uri: hinh }} style={{
                    width: "100%", height: "100%", borderTopLeftRadius: 10,
                    borderBottomStartRadius: 10,
                }} />
            </View>
            <View >
                <Svg height="100%" width="25" style={styles.svgCurve}>
                    <Path d="M 25 0 Q 0 55 25 110 Z" fill="#E8E8E8" />
                </Svg>
            </View>
            <View style={{ padding: 10, width: "60%", justifyContent: "space-between" }}>


                <Text style={styles.name}>{item.product_name}</Text>

                <View style={styles.priceContainer}>
                    <Text style={styles.price}>${item.pricebuy}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity
                            onPress={() => handleTru(item.id)}>
                            <AntDesign name="minuscircleo" size={20} color="black" style={styles.icon} />


                        </TouchableOpacity>


                        <Text style={styles.quantity}>{quantitys}</Text>
                        <TouchableOpacity
                            onPress={() => handleCong(item.id)}
                        >
                            <Ionicons name="add-circle-outline" size={25} color="black" style={styles.icon} />
                        </TouchableOpacity>

                    </View>
                </View>

            </View>


        </TouchableOpacity>
    );
}

const CatDetail = () => {
    const [cartDetail, setCartDetail] = useState([]);
    const navigation = useNavigation()
    const getCartDetails = async () => {
        const user = await AsyncStorage.getItem("userId");
        try {
            const response = await GET_ALL(`cartdetail/${user}`);
            setCartDetail(response.data);
        } catch (error) {
            console.error("Error fetching cart details: ", error);
        }
    };
    useEffect(() => {
        getCartDetails();
    }, []);
    console.log("cartDetail", cartDetail)

    const handleProduct = () => {
        console.log("đã chọn ")
    }
    const totalQuantity = cartDetail.reduce((total, cart) => {
        return total + cart.quantity;
    }, 0);
    //console.log(totalQuantity)
    const handleCheckout = () => {
        if (cartDetail.length === 0) {
            console.log("Giỏ hàng của bạn đang rõng toách")
            Alert.alert("Giỏ hàng của bạn đang rõng toách")

        }

        else {
            console.log("checkout")
            navigation.navigate("CheckOutScreen")

        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", }}>
            <View
                style={{ flex: 0.25 }}
            >
                <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                    <View style={{ width: "10%" }}>
                        <Ionicons name="arrow-back-outline" size={24} color="black" />
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "flex-start", width: "80%" }}>
                        <Text style={{ fontSize: 15, fontWeight: "600", color: "#114459" }}>
                            Giỏ hàng
                        </Text>
                    </View>
                    <View style={{ width: "10%" }}>
                        <Text> </Text>
                    </View>
                </View>
                <View style={{ alignItems: "center" }}>
                    <View style={{ width: "70%", backgroundColor: "#11445966", borderRadius: 50 }}>
                        <Text style={{ marginVertical: 5, marginHorizontal: 10, color: "white", fontSize: 10, fontWeight: "600" }}>Bạn có {totalQuantity} sản phẩm trong giỏ hàng</Text>

                    </View>
                </View>
                <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                    <Text style={{ fontWeight: "600", fontSize: 13 }}>Sản phẩm đã chọn</Text>
                </View>
            </View>
            <ScrollView
                style={{ flex: 1, }}
            >


                {
                    cartDetail.map((cart) => {
                        return (
                            <View key={cart.id} style={{ justifyContent: "center", alignItems: "center" }}>
                                <ViewProduct item={cart}
                                    onPress={() => handleProduct()}
                                    refreshCart={getCartDetails}
                                />
                            </View>
                        )
                    })
                }


            </ScrollView>
            <View
                style={{ flex: 0.2 }}
            >
                <View style={{ marginVertical: 10, marginHorizontal: 10, justifyContent: "space-between", flexDirection: "row" }}>
                    <Text style={{ fontWeight: "300", fontSize: 13, color: "#696969" }}>sản phẩm </Text>
                    <Text style={{ fontSize: 14, fontWeight: "800", color: "#114459" }}>
                        Giỏ hàng
                    </Text>
                </View>
                <View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleCheckout()}

                        >
                            <Text style={styles.buttonText}>Tiếp tục</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default CatDetail

const styles = StyleSheet.create({
    container: {
        height: 120,
        position: "absolute",
        bottom: 0,
        width: '100%',
        zIndex: 10,
        backgroundColor: "white",
        paddingHorizontal: 10,
    },
    priceText: {
        fontSize: 15,
        color: '#114459',
        fontWeight: "700",
        paddingLeft: 5,
    },
    buttonContainer: {
        alignItems: "center",

    },
    button: {
        backgroundColor: '#bb946b',
        width: "90%",
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
    },
    carousel: {
        marginBottom: 20,
        width: "100%",
    },
    wrapper: {
        flexDirection: "column",
    },
    listContainer: {
        paddingBottom: 20,
    },
    productContainer: {
        borderRadius: 10,
        width: "80%",
        height: 110,
        flexDirection: "row",
        backgroundColor: '#E8E8E8',
        marginBottom: 5,
        justifyContent: "center",



    },
    productImage: {
        width: 125,
        height: 110,
        borderTopLeftRadius: 10,
        borderBottomStartRadius: 10,

    },
    overlay: {
        backgroundColor: '#E8E8E8',
    },
    name: {
        fontSize: 12,
        color: '#114459',
        fontWeight: "400",
        paddingLeft: 5,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginTop: 10
    },
    price: {
        fontSize: 11,
        color: '#114459',
        fontWeight: "600",
        paddingLeft: 5,

    },

    svgCurve: {
        position: 'absolute',
        top: 0,
        left: -25
    },
    categoryName: {
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 10,
        paddingLeft: 5,
        marginLeft: 10,
        color: "#114459",
        fontFamily: "FjallaOne_400Regular", // Apply the custom font
    },
    quantity: {
        paddingHorizontal: 5

    }
})
