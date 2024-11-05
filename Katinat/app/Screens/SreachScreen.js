import { FlatList, Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { Ionicons, Octicons } from '@expo/vector-icons'
import { GET_IMG, Sreach } from '../apiMe'
import Svg, { Path } from 'react-native-svg'
import { useNavigation } from 'expo-router'

const SreachScreen = () => {
    const [sreach, setSreach] = useState('');
    const [data, setData] = useState([]);
    const inputRef = useRef(null);
    const navigation = useNavigation();


    const fetchSreach = () => {
        Sreach(sreach)
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.error(err))
    }
    const handleItem = (item) => {
        navigation.navigate('DetailProduct', { product: item })
    }

    return (
        <View>
            <View style={{ backgroundColor: "white", flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                <TouchableOpacity
                    onPress={() => inputRef.current.focus()}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        width: 300,
                        height: 50,
                        marginHorizontal: 10,
                        borderRadius: 15,
                        borderColor: '#E8E8E8',
                        borderWidth: 1,
                        paddingHorizontal: 10,
                    }}
                >
                    <Octicons name="search" size={24} color="black" />
                    <TextInput
                        ref={inputRef}
                        style={{ flex: 1, marginLeft: 10 }}
                        placeholder="Muốn uống gì ...."
                        placeholderTextColor="#C5C5C5"
                        value={sreach}
                        onChangeText={(text) => setSreach(text)}
                        onSubmitEditing={fetchSreach} // Gọi fetchSreach khi nhấn nút "Tìm kiếm" trên bàn phím
                        returnKeyType="search" // Đặt kiểu nút là "search"
                    />
                </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: "white", height: "100%", paddingBottom: "30%" }}>
                {data.length === 0 ? (
                    <View style={{ padding: 20 }}>
                        <Text>Rất tiếc, không tìm thấy sản phẩm nào</Text>
                    </View>
                ) : (
                    <FlatList
                        data={data}
                        numColumns={2}

                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleItem(item)}
                                style={styles.productContainer}>
                                <Image
                                    source={{ uri: GET_IMG(item.thumbnail[0]) }}
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
                                        <Text style={styles.name}>{item.product_name}</Text>
                                        <View style={styles.priceContainer}>
                                            <View style={{ marginTop: 20, margin: 5 }}>
                                                <Text style={{ fontSize: 10, color: 'black', paddingLeft: 5 }}>${item.pricebuy}</Text>
                                            </View>
                                            <Ionicons name="add-circle-outline" size={30} color="black" style={styles.icon} />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
        </View>
    )
}

export default SreachScreen

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
})
