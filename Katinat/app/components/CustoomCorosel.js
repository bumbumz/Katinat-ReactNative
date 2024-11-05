import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    interpolate,
} from 'react-native-reanimated';
import { GET_IMG } from '../apiMe';
import { Path, Svg } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const CustoomCorosel = ({ data }) => {
    const navigation = useNavigation();

    const handleProduct = (item) => {
        navigation.navigate('DetailProduct', { product: item });
    };
    // console.log("data", data)
    const { width } = useWindowDimensions();
    const SIZE = width * 0.4; // Kích thước của mỗi phần tử
    const SPACER = (width - SIZE) / 1.5; // Khoảng cách để căn giữa các phần tử

    const x = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            x.value = event.contentOffset.x;
        },
    });

    const [newData] = useState([
        { key: 'spacer-left' },
        ...data,
        { key: 'spacer-right' },
    ]);

    return (
        <View>
            <Text style={styles.headerName}>BEST SELLER</Text>
            <Animated.ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollEventThrottle={10}
                snapToInterval={SIZE} // Kích thước của mỗi phần tử
                decelerationRate="fast"
                snapToAlignment="center" // Đảm bảo phần tử ở giữa
                onScroll={onScroll}
                nestedScrollEnabled={true}
            >

                {newData.map((item, index) => {
                    const hinh = item.thumbnail && item.thumbnail.length > 0 ? GET_IMG(item.thumbnail[0]) : null;
                    //console.log("item:", hinh)
                    const style = useAnimatedStyle(() => {
                        const scale = interpolate(
                            x.value,
                            [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
                            [0.7, 1, 0.85]
                        );
                        return {
                            transform: [{ scale }],
                        };
                    });
                    if (!item.thumbnail || item.thumbnail.length === 0) {
                        return <View style={{ width: SPACER }} key={index} />; // Đảm bảo khoảng cách spacer đúng
                    }
                    return (
                        <View key={index} style={[styles.imageContainer, { width: SIZE }]}>
                            <Animated.View style={style}>
                                <TouchableOpacity style={styles.productContainer}
                                    onPress={() => handleProduct(item)}
                                >
                                    <Image source={{ uri: hinh }} style={styles.image} />
                                    <View style={styles.overlay}>
                                        <Svg height="30" width="100%" style={styles.svgCurve}>
                                            <Path d="M 0 30 Q 80 0 170 30 Z" fill="#E8E8E8" />
                                        </Svg>
                                        <View style={{ backgroundColor: '#E8E8E8', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                            <Text style={styles.name}>{item.product_name}</Text>
                                            <View style={styles.priceContainer}>
                                                <View style={{ marginTop: 20, margin: 5 }}>
                                                    <Text style={styles.price}>${item.priceSale}</Text>
                                                    <Text style={{
                                                        fontSize: 10,
                                                        color: 'black',
                                                        paddingLeft: 5,
                                                        textDecorationLine: 'line-through'
                                                    }}>${item.pricebuy}</Text>
                                                </View>
                                                <Ionicons name="add-circle-outline" size={30} color="black" style={styles.icon} />
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    );
                })}
            </Animated.ScrollView>
        </View>
    );
};

export default CustoomCorosel;

const styles = StyleSheet.create({
    imageContainer: {

        alignItems: 'center',
        paddingBottom: 30,

    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    title: {
        marginTop: 5,
        fontSize: 16,
    },
    productContainer: {
        borderRadius: 10,  // Updated to round all corners
        margin: 5,
        width: 170,
        height: 250,
        backgroundColor: 'white',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 10,  // Updated to round all corners
    },
    name: {
        fontSize: 10,
        color: '#114459',
        fontWeight: "700",
        paddingLeft: 5,

    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,

    },
    price: {
        fontSize: 13,
        color: '#114459',
        fontWeight: "500",
        paddingLeft: 5,
        marginBottom: 5
    },
    icon: {
        marginRight: 5,
    },
    svgCurve: {
        position: 'absolute',
        top: -30,
    },
    categoryName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        paddingLeft: 5,
    },
    carousel: {

        width: 500,

    },
    headerName: {
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 10,
        paddingLeft: 5,
        marginLeft: 10,
        color: "#114459",
        fontFamily: "FjallaOne_400Regular", // Apply the custom font


    },
});
