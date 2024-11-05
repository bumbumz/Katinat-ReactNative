import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DELETE_ALL, GET_ALL, PostWishList } from '../apiMe'

const ButtomWishList = ({ product, rock, sugar }) => {
    const [userid, setUserid] = useState(0)
    const [status, setStatus] = useState(false)
    console.log("butomwwishlist", product)
    const fetchWishlisy = async () => {
        const idd = await AsyncStorage.getItem("userId");
        setUserid(idd || 0)
        console.log(`wishlist/${product}/${idd}`)
        GET_ALL(`wishlist/${product}/${idd}`)
            .then((response) => {
                setStatus(response.data.status)
                console.log("kết quả", status)
            }
            ).catch((er) => {
                console.log(er)
            }
            )
    }

    const handleBuy = async () => {
        if (status === false) {
            const cartDetail = {
                productid: product,
                userid: await AsyncStorage.getItem("userId"),
                quantity: 1,
                sugar: sugar,
                rock: rock,
                note: ""
            };
            console.log("cartDetail:", cartDetail);
            if (cartDetail.userid == null) {
                Alert.alert("Bạn cần đăng nhập để mua hàng");
            }
            else {
                console.log("a")
                PostWishList(cartDetail)
                    .then(response => {
                        console.log('Thêm vào giỏ hàng thành công:', response.data);
                        fetchWishlisy()

                    })
                    .catch(error => {
                        console.error('Có lỗi xảy ra khi thêm vào giỏ hàng:', error);

                    });


            }
        }
        else {
            const idd = await AsyncStorage.getItem("userId");
            console.log("xóa")
            await DELETE_ALL(`wishlist/destroy/${product}/${idd}`);
            fetchWishlisy()
        }


    };
    useEffect(() => {
        fetchWishlisy()
    }, [status])
    return (
        <View>
            <TouchableOpacity
                onPress={handleBuy}

            >
                {
                    status ?
                        (<View style={{ backgroundColor: "#bb946b", height: 25, width: 25, borderRadius: 50 }}>
                            <Image
                                source={require("../../assets/images/circleheatyellow.png")}
                                style={{ height: 25, width: 25 }}
                            />
                        </View>)
                        :

                        (<Image
                            source={require("../../assets/images/circleheatxanh.png")}
                            style={{ height: 25, width: 25 }}
                        />)
                }
            </TouchableOpacity>
        </View>
    )
}

export default ButtomWishList

const styles = StyleSheet.create({})