import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from 'expo-router'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import * as Location from 'expo-location';
import { DELETE_ALL, Email, GET_ALL, GET_IMG, POST, PostCart, PostOder } from '../apiMe'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Svg, { Path } from 'react-native-svg'

function ViewProduct({ item, onPress }) {
    const hinh = item.thumbnail && item.thumbnail.length > 0 ? GET_IMG(item.thumbnail[0]) : null;
    return (
        <TouchableOpacity onPress={onPress} style={styles.productContainer}>
            <Image source={{ uri: hinh }} style={styles.productImage} />
            <View >
                <Svg height="100%" width="25" style={styles.svgCurve}>
                    <Path d="M 25 0 Q 0 55 25 110 Z" fill="#E8E8E8" />
                </Svg>
            </View>
            <View style={{ padding: 10, width: "60%", justifyContent: "space-between" }}>


                <Text style={styles.name}>{item.product_name}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>${item.pricebuy}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const CheckOutScreen = () => {
    const [user, setUser] = useState("");
    const [sdt, setSdt] = useState("");
    const [email, setEmail] = useState("")

    const ftachUser = async () => {
        const id = await AsyncStorage.getItem("userId")
        GET_ALL(`users/${id}`)
            .then(response => {
                //console.log(response.data)
                const data = response.data;
                console.log("email", data.email)
                setEmail(data.email);
                setUser(data.firstName + " " + data.lastName)
            })
            .catch(error => {
                console.error(error);
            });

    }
    useEffect(() => {
        ftachUser()
    }, [])
    console.log("user", user)



    const navigation = useNavigation();
    const [order, setOrder] = useState([]);




    const bottomSheetRef = useRef(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const snapPoints = useMemo(() => ['1%', '95%'], []);
    const [address, setAddress] = useState(null);


    const handleSheetChanges = useCallback((index) => {
        setIsSheetOpen(index !== -1);
    }, []);

    const toggleBottomSheet = () => {
        if (isSheetOpen) {
            bottomSheetRef.current?.close();
        } else {
            bottomSheetRef.current?.expand();
        }
    };
    const handleText = async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            //   console.log('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        // console.log('Tọa độ hiện tại:', location.coords);

        let reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });

        if (reverseGeocode.length > 0) {
            const { name, street, city, region, country } = reverseGeocode[0];
            const fullAddress = `${name || ''} ${street || ''}, ${city || ''}, ${region || ''}, ${country || ''}`.trim();
            setAddress(fullAddress);
            //('Địa chỉ hiện tại:', fullAddress);
        }
    };


    const [cartDetail, setCartDetail] = useState([]);

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

    // console.log("cartDetail", cartDetail)

    const soluong = cartDetail.reduce((total, cart) => {
        return total + cart.quantity;
    }, 0);
    const tongtien = cartDetail.reduce((total, cart) => {
        return total + (cart.quantity * cart.pricebuy);
    }, 0);
    // console.log("soluong", address)
    const productIds = [];
    const quantityIds = [];
    const priceIds = [];
    // console.log("du lieu de push", cartDetail)
    cartDetail.map((cart) => {
        productIds.push(cart.product_id);
        quantityIds.push(cart.quantity);
        priceIds.push(cart.pricebuy);


    });




    const handleDathang = async () => {
        if (address == null || sdt.trim() === "") {
            Alert.alert("Hãy xác nhận địa chỉ và số điện thoại của bạn");
            return;
        }

        try {
            //  console.log("đặt hàng");
            const userId = await AsyncStorage.getItem("userId");

            const orderResponse = await POST(`orders/${userId}`);
            console.log("id đơn hàng", orderResponse.data);
            const totalAmount = cartDetail.reduce((total, cart) => total + (cart.quantity * cart.pricebuy), 0);
            const orderId = orderResponse.data.id; // lấy ID đơn hàng từ phản hồi
            console.log(productIds);
            const orderDetail = {
                oderId: orderId,
                productId: productIds,
                quantity: quantityIds,
                price: priceIds,
            };
            console.log("orderDetail", orderDetail)
            const emailData = {
                userEmail: email,
                orderCode: "SN-123456",
                total: totalAmount,
                customerName: user,
                customerAddress: address,
                customerPhone: sdt,
                orderDetails: [orderDetail]
            };


            console.log("Dữ liệu gửi đi:", JSON.stringify(emailData, null, 2));

            await PostOder(orderDetail);
            // console.log('Thêm vào giỏ hàng thành công:', oderDetailResponse.data);

            await DELETE_ALL(`cartdetail/deleteall/${userId}`);
            //console.log('Thêm vào giỏ hàng thành công:');
            navigation.replace("MyTab");
            Email(emailData);


            //Có thể thực hiện các thao tác khác sau khi đặt hàng thành công
        } catch (error) {
            console.error('Có lỗi xảy ra khi đặt hàng:', error);
            Alert.alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
        }
    };


    return (
        <View style={{ flex: 1, backgroundColor: "#EEEEEE", }}>
            <View
                style={{ backgroundColor: "#EEEEEE" }}
            >
                <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                    <View style={{ width: "10%" }}>
                        <Ionicons name="arrow-back-outline" size={24} color="black" />
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "flex-start", width: "80%" }}>
                        <Text style={{ fontSize: 15, fontWeight: "600", color: "#114459" }}>
                            Xác nhận đơn hàng
                        </Text>
                    </View>
                    <View style={{ width: "10%" }}>
                        <Text> </Text>
                    </View>
                </View>


            </View>
            <ScrollView
                style={{ flex: 1, }}
            >
                <View style={{ alignItems: "center" }}>
                    <View style={{ backgroundColor: "white", width: "95%", padding: 10, borderRadius: 10 }}>
                        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                            <Text style={{ fontSize: 10, fontWeight: "600", color: "#114459" }}>
                                Địa chỉ nhận hàng
                            </Text>


                            <TouchableOpacity
                                onPress={toggleBottomSheet}
                            >
                                <Text style={{ fontSize: 10, color: "#FFCC33" }}>
                                    Thay đổi
                                </Text>
                            </TouchableOpacity>


                        </View>
                        {address && <Text style={{
                            marginVertical: 5,
                            marginLeft: 5,
                            fontSize: 12,
                            color: '#555',
                        }}>Địa chỉ: {address}</Text>}

                        <Text style={{ fontSize: 10, fontWeight: "600", color: "#114459" }}>
                            Thông tin nhận hàng
                        </Text>
                        <Text style={{
                            marginVertical: 5,
                            marginLeft: 5,
                            fontSize: 12,
                            color: '#555',
                        }}> {user}</Text>
                        <View style={{
                            borderTopWidth: 1, width: "40%", borderColor: "#555",
                            marginLeft: 5,
                        }}>
                            <TextInput
                                style={{ fontSize: 9, color: '#555', marginLeft: 5, paddingTop: 5 }}
                                placeholder="Nhập số điện thoại liên lạc"
                                value={sdt}
                                onChangeText={(inputText) => setSdt(inputText)}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ alignItems: "center", marginVertical: 20 }}>
                    <View style={{ backgroundColor: "white", width: "95%", padding: 10, borderRadius: 10 }}>
                        <View style={{ justifyContent: "space-between", }}>
                            <Text style={{ fontSize: 12, fontWeight: "700", color: "#114459" }}>
                                Tóm tắt đơn hàng
                            </Text>
                            <View style={{ alignItems: "center", marginVertical: 10 }}>
                                {
                                    cartDetail.map((cart) => {

                                        return (
                                            <ViewProduct key={cart.id} item={cart} />
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ alignItems: "center", marginVertical: 20 }}>
                    <View style={{ backgroundColor: "white", width: "95%", padding: 10, borderRadius: 10 }}>
                        <View style={{ justifyContent: "space-between", }}>
                            <Text style={{ fontSize: 12, fontWeight: "700", color: "#114459" }}>
                                Tổng cộng ({soluong} món)
                            </Text>
                            <View style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                marginHorizontal: 10,
                                marginVertical: 5
                            }}>
                                <Text style={{ fontSize: 9, fontWeight: "500", color: "#696969" }}>Thành tiền</Text>
                                <Text style={{ fontSize: 9, fontWeight: "500", color: "#696969" }}>  {address == null ? "--" : (tongtien + "đ")}</Text>
                            </View>
                            <View style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                marginHorizontal: 10,

                            }}>
                                <Text style={{ fontSize: 9, fontWeight: "500", color: "#696969" }}>Phí vận chuyển</Text>
                                <Text style={{ fontSize: 9, fontWeight: "500", color: "#696969" }}>   {address == null ? "--" : ((soluong * 10000) + "đ")}</Text>
                            </View>
                            <View style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                marginHorizontal: 5,
                                marginVertical: 7,

                                alignItems: "center"

                            }}>
                                <Text style={{ fontSize: 10, fontWeight: "700", color: "#114459" }}>Thành tiền</Text>
                                <Text style={{ fontSize: 10, fontWeight: "500", color: "#114459" }}>   {address == null ? "--" : ((tongtien + soluong * 10000) + "đ")}</Text>
                            </View>
                        </View>
                    </View>
                </View>





            </ScrollView >
            <View
                style={{ flex: 0.2, backgroundColor: "#EEEEEE" }}
            >
                <View style={{ marginVertical: 10, marginHorizontal: 10, justifyContent: "space-between", flexDirection: "row" }}>
                    <Text style={{ fontWeight: "300", fontSize: 13, color: "#696969" }}>sản phẩm </Text>
                    <Text style={{ fontSize: 14, fontWeight: "800", color: "#114459" }}>
                        {address == null ? "--" : ((tongtien + soluong * 10000) + "đ")}
                    </Text>
                </View>
                <View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleDathang}


                        >
                            <Text style={styles.buttonText}>Đặt hàng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <BottomSheetView style={{}}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: 'center',
                        paddingVertical: 10,
                        paddingBottom: 15,
                        borderBottomWidth: 1,
                        borderColor: "#D3D3D3"
                    }}>
                        <View style={{ width: "10%", paddingLeft: 10 }}>
                            <Ionicons name="arrow-back" size={24} color="black" />

                        </View>

                        <View style={{ width: "80%", justifyContent: "center", alignItems: "center" }}>
                            <Text>Xác nhận địa chỉ</Text>

                        </View>
                        <View style={{ width: "10%" }}>

                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>

                        <View style={{
                            width: "90%",
                            backgroundColor: "#EEEEEE",
                            marginVertical: 10,
                            paddingHorizontal: 10,
                            paddingVertical: 20,
                            borderRadius: 500,
                            flexDirection: "row",

                            overflow: 'hidden'


                        }}>
                            <EvilIcons name="search" size={24} color="black" />
                            <TextInput
                                style={{ fontSize: 9 }}
                                placeholder="Nhập văn bản vào đây"
                                value={address}
                                onChangeText={(inputText) => setAddress(inputText)}


                            />
                        </View>
                        <TouchableOpacity
                            style={{
                                width: "90%", backgroundColor: "#EEEEEE", flexDirection: "row",
                                alignItems: "center",
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                                borderRadius: 20
                            }}
                            onPress={handleText}
                        >
                            <Image
                                source={require('../../assets/images/address.png')}
                                style={{ width: 30, height: 30, marginHorizontal: 10 }}
                            />
                            <Text style={{ fontSize: 13, fontWeight: "700", color: "#114459" }}>Địa chỉ của bạn </Text>
                        </TouchableOpacity>
                    </View>

                </BottomSheetView>
            </BottomSheet>
        </View >
    )
}

export default CheckOutScreen

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
