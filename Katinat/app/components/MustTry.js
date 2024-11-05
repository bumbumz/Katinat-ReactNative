import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Path, Svg } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import { GET_ALL, GET_IMG } from './../apiMe';

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
                    <Text style={styles.price}>${item.priceSale}</Text>
                    <Ionicons name="add-circle-outline" size={25} color="black" style={styles.icon} />
                </View>

            </View>


        </TouchableOpacity>
    );
}

const MustTry = () => {

    const navigation = useNavigation();

    const handleProduct = (item) => {
        navigation.navigate('DetailProduct', { product: item });

    };

    const [coffeeData, setCoffeeData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        GET_ALL("must-try")
            .then((response) => {
                const responseData = response.data;
                setCoffeeData(responseData);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setIsLoading(false);
            });
    }, []);

    const renderProductItem = ({ item }) => (
        <ViewProduct
            item={item}
            onPress={() => handleProduct(item)}
        />
    );

    return (
        <View>
            <Text style={styles.categoryName}>MÓN NGON PHẢI THỬ</Text>
            <Carousel
                width={270}
                height={160}
                loop={true}
                autoPlay={false}
                autoPlayInterval={3000}
                data={coffeeData}
                renderItem={renderProductItem}
                scrollAnimationDuration={1000}
                style={styles.carousel}
                nestedScrollEnabled={true}
                itemWidth={20}
                customConfig={() => ({
                    type: 'default',

                    parallaxScrollingOffset: 20,
                })}
            />                                  
        </View>
    );
};

export default MustTry;

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "column",
    },
    listContainer: {
        paddingBottom: 10,
    },
    productContainer: {
        borderRadius: 10,

        marginRight: 20,
        width: 260,
        height: 110,
        backgroundColor: 'white',
        flexDirection: "row",
        backgroundColor: '#E8E8E8',
        marginBottom: 50

    },
    productImage: {
        width: "40%",
        height: "auto",
        borderTopLeftRadius: 10,
        borderBottomStartRadius: 10
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
        fontSize: 10,
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
    carousel: {

        width: "100%",



    },
});
