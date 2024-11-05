import { Animated, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header';
import { Entypo, Foundation, Ionicons, Octicons } from '@expo/vector-icons';
import { GET_ALL, GET_IMG } from '../../apiMe';
import { Path, Svg } from 'react-native-svg';
import { useNavigation } from 'expo-router';

const OrderScreen = () => {
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [headerVisible, setHeaderVisible] = useState(true);
    const [category, setCategory] = useState([]);
    const [iscate, setIscat] = useState(1);
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

    useEffect(() => {
        const listener = scrollY.addListener(({ value }) => {
            setHeaderVisible(value <= 40);
        });

        return () => {
            scrollY.removeListener(listener);
        };
    }, []);


    useEffect(() => {
        GET_ALL("categories")
            .then((response) => {
                setCategory(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);


    const handleSearch = () => {
        navigation.navigate("SreachScreen")


    }
    const flatListRef = useRef(null);
    //useRef trong React là một hook cho phép bạn tạo một tham chiếu 
    //đến một DOM element hoặc một giá trị nào đó mà không cần phải render 
    //lại component khi giá trị của tham chiếu thay đổi
    const scrollToCategory = (id) => {
        const index = category.findIndex(cat => cat.id === id);
        if (index !== -1 && flatListRef.current) // Nếu tìm thấy index hợp lệ và FlatList đã được tham chiếu (ref không null)
        {
            flatListRef.current.scrollToIndex({ index, animated: true });  // Cuộn đến vị trí của item đó với hiệu ứng cuộn mượt (animated: true)

        }
        setIscat(index + 1);

    };
    console.log(iscate)

    const handleProduct = (item) => {
        navigation.navigate('DetailProduct', { product: item })
        console.log(item)

    }



    return (
        <View style={{ flex: 1 }}>
            <Animated.View
                style={{
                    zIndex: 1,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    height: headerHeight,
                    transform: [{ translateY: headerTranslate }],
                }}
            >
                <Header />
            </Animated.View>

            {headerVisible ? (
                <View style={{ backgroundColor: "white", height: 80, }}>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: "white",
                        height: 80,
                        paddingTop: 10,
                        paddingStart: 20,
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
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
                        <View style={{ flexDirection: 'row' }}>
                            <Foundation name="burst-sale" size={27} color="black" style={{ padding: 10 }} />
                            <Entypo name="bell" size={27} color="black" style={{ padding: 10 }} />
                        </View>
                    </View>
                </View>
            ) : (
                <View style={{ backgroundColor: "white" }}>

                    <TouchableOpacity style={{
                        backgroundColor: 'white',
                        width: 300,
                        height: 50,
                        marginHorizontal: 30,
                        borderRadius: 15,
                        borderColor: '#E8E8E8',
                        borderWidth: 1,
                        marginVertical: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                    }}
                        onPress={handleSearch}
                    >
                        <Octicons name="search" size={24} color="black" />
                        <TextInput style={{ marginLeft: 10 }} placeholder="Muốn uống gì ...." />
                    </TouchableOpacity>
                </View>
            )}

            <View style={{ flexDirection: "row", borderWidth: 1, borderColor: "#DDDDDD", backgroundColor: "white", paddingBottom: 150 }}>
                <FlatList

                    data={category}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (

                        <TouchableOpacity key={item.id || index} style={{ alignItems: "center", marginVertical: 20 }}
                            //onPress={() => handleCate(item.id)}
                            onPress={() => scrollToCategory(item.id)}
                        >
                            <Image source={{ uri: GET_IMG(item.img) }}
                                style={[{ width: 30, height: 30 },
                                (iscate == item.id ? { width: 40, height: 40 } : { width: 30, height: 30 })
                                ]} />
                            <Text style={[{ fontSize: 6, fontWeight: "600", textAlign: "center" }, (iscate == item.id ? { color: "#114459", fontWeight: "900", fontSize: 7, } : { color: "black", fontWeight: "600" })]}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>

                    )}
                    style={{ paddingTop: 10, borderWidth: 1, borderRightColor: "#DDDDDD", borderColor: "white" }}
                />
                <FlatList
                    ref={flatListRef}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                    data={category}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 30, marginTop: 10 }}>{item.name}</Text>
                            <FlatList
                                data={item.product}
                                numColumns={2}
                                keyExtractor={(product) => product.id.toString()}
                                renderItem={({ item: product }) => (
                                    <TouchableOpacity style={styles.productContainer}
                                        onPress={() => handleProduct(product)}
                                    >
                                        <Image
                                            source={{ uri: GET_IMG(product.thumbnail[0]) }}
                                            style={{
                                                width: '100%',
                                                height: 200,
                                                borderTopLeftRadius: 10,
                                                borderTopRightRadius: 10,
                                            }}
                                        />
                                        <View style={styles.overlay}>
                                            <Svg height="30" width="100%" style={styles.svgCurve}>
                                                <Path d="M 0 30 Q 80 0 170 30 Z" fill="#E8E8E8" />
                                            </Svg>
                                            <View style={{ backgroundColor: '#E8E8E8', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                                <Text style={styles.name}>{product.product_name}</Text>
                                                <View style={styles.priceContainer}>
                                                    <View style={{ marginTop: 20, margin: 5 }}>

                                                        <Text style={{
                                                            fontSize: 10,
                                                            color: 'black',
                                                            paddingLeft: 5,

                                                        }}>${product.pricebuy}</Text>
                                                    </View>
                                                    <Ionicons name="add-circle-outline" size={30} color="black" style={styles.icon} />
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}

                            />
                        </View>
                    )}

                />
            </View>

        </View>
    );
};

export default OrderScreen;

const styles = StyleSheet.create({
    productContainer: {
        borderRadius: 10,
        margin: 5,
        width: "47%",
        height: 250,
        backgroundColor: 'white',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 10,
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
    },
    price: {
        fontSize: 13,
        color: '#114459',
        fontWeight: "500",
        paddingLeft: 5,
        marginBottom: 5,
    },
    icon: {
        marginRight: 5,
    },
    svgCurve: {
        position: 'absolute',
        top: -30,
    },
});
