import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { PostCart } from '../apiMe';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewButtomBuy = ({ product, rock, sugar }) => {
    const handleBuy = async () => {
        const cartDetail = {
            productid: product.id,
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
            PostCart(cartDetail)
                .then(response => {
                    console.log('Thêm vào giỏ hàng thành công:', response.data);

                })
                .catch(error => {
                    console.error('Có lỗi xảy ra khi thêm vào giỏ hàng:', error);

                });
        }

    };

    return (
        <View style={styles.container}>
            <Text style={styles.priceText}>
                {product.pricebuy}đ
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleBuy}
                >
                    <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
        marginTop: 10,
    },
    button: {
        backgroundColor: '#bb946b',
        width: 310,
        height: 60,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
    },
});

export default ViewButtomBuy;
