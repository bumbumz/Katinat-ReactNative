import { FlatList, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { DELETE_ALL, GET_ALL, GET_IMG } from '../apiMe';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';



function ViewProduct({ item, onPress }) {
    const hinh = item.thumbnail && item.thumbnail.length > 0 ? GET_IMG(item.thumbnail[0]) : null;

    return (
        <TouchableOpacity style={styles.productContainer}>
            <View style={{ overflow: 'hidden', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>


                <ImageBackground source={{ uri: hinh }} style={styles.image} >
                    <TouchableOpacity
                        onPress={onPress}

                    >
                        {
                            (<View style={{ backgroundColor: "#bb946b", height: 25, width: 25, borderRadius: 50, margin: 10 }}>
                                <Image
                                    source={require("../../assets/images/circleheatyellow.png")}
                                    style={{ height: 25, width: 25, }}
                                />
                            </View>)


                        }
                    </TouchableOpacity>
                    <Svg height="20" width="100%" style={styles.svgCurve}>
                        <Path d="M 0 20 Q 80 0 170 20 Z" fill="#E8E8E8" />
                    </Svg>
                </ImageBackground>
            </View>
            <View style={{ backgroundColor: "#E8E8E8", justifyContent: "space-between", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                <Text style={{
                    fontSize: 11,
                    color: '#114459',
                    fontWeight: "600",
                    paddingLeft: 5,
                }}>{item.product_name}</Text>
                <View style={{ height: 50 }}>

                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5, paddingBottom: 6, }}>
                    <Text style={{ color: '#114459', fontSize: 11, }}>
                        {item.pricebuy}đ
                    </Text>
                    <Ionicons name="add-circle-outline" size={25} color="black" style={{ marginRight: 5, }} />
                </View>
            </View>









        </TouchableOpacity>
    );
}

const WishListScreen = () => {
    const [wishlist, setWishlist] = useState();

    const fetchWishlist = async () => {
        const idd = await AsyncStorage.getItem("userId");
        GET_ALL(`wishlist/${idd}`)
            .then(response => {
                setWishlist(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }
    useEffect(() => {
        fetchWishlist();
    }, [])
    console.log("wishlist", wishlist);
    if (Array.isArray(wishlist) && wishlist.length === 0) {
        console.log("mảng rỗng");
    }


    const navitation = useNavigation();
    const handleBack = () => {
        navitation.goBack();
    }
    const handeDeleteAll = async () => {
        const id = await AsyncStorage.getItem("userId")
        await DELETE_ALL(`wishlist/detroyall/${id}`)

        console.log("đã ấn")
        fetchWishlist();
    }

    const onPress = async (productid) => {
        console.log("on press", productid)


        const idd = await AsyncStorage.getItem("userId");
        console.log("xóa", idd)

        await DELETE_ALL(`wishlist/destroy/${productid}/${idd}`);
        fetchWishlist();



    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ flex: 0.1, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 5 }}>
                <TouchableOpacity style={{
                    width: "10%", justifyContent: "center",
                    alignItems: "center"
                }}
                    onPress={() => handleBack()}
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
                    }}>Danh sách yêu thích của bạn</Text>


                </View>
                <View style={{ width: "10%" }}>

                </View>
            </View>
            {
                (Array.isArray(wishlist) && wishlist.length === 0)
                    ?

                    <View style={{ flex: 1 }}>
                        <Text>bạn chưa có dữ liệu</Text>
                    </View>
                    :
                    <View style={{ alignItems: "center", flex: 1 }}>
                        <FlatList
                            style={{ flex: 1, backgroundColor: "white", }}
                            data={wishlist}
                            numColumns={2}
                            keyExtractor={(wishlist) => wishlist.id.toString()}
                            renderItem={({ item }) => (
                                <ViewProduct item={item} onPress={() => onPress(item.product_id)} />
                            )}
                        />
                    </View>

            }

            <View style={{ flex: 0.1, justifyContent: "center", alignItems: "center" }}>
                <View style={{ width: "80%" }}>
                    <TouchableOpacity
                        onPress={handeDeleteAll}
                        style={{
                            backgroundColor: '#bb946b',
                            height: 50,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{
                            color: "white",
                            fontWeight: "700",
                            fontSize: 12
                        }}>Bỏ yêu thích tất cả</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}

export default WishListScreen

const styles = StyleSheet.create({
    productContainer: {
        borderRadius: 20,  // Updated to round all corners
        margin: 5,
        width: 170,


    },

    image: {
        width: '100%',
        height: 200,
        borderRadius: 20
    },

    svgCurve: {
        position: 'absolute',
        bottom: 0


    },

})