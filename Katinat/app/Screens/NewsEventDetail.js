import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { GET_IMG } from '../apiMe';

const NewsEventDetail = () => {
    const route = useRoute();
    const { product } = route.params;

    const navitation = useNavigation();
    const handleBack = () => {
        navitation.goBack();
    }
    return (
        <View style={{
            flex: 1,
        }}>
            {/* header */}
            <View style={{ backgroundColor: "white" }}>
                <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                    <TouchableOpacity style={{ width: "10%" }}
                        onPress={() => handleBack()}
                    >
                        <View style={{
                            flexDirection: 'row',
                            height: 30, width: 30,
                            borderRadius: 50,
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Ionicons name="arrow-back-outline" size={20} color="white" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ alignItems: "center", justifyContent: "flex-start", width: "80%" }}>
                        <Text style={{ fontSize: 15, fontWeight: "600", color: "#114459" }} numberOfLines={1}>
                            {product.name}
                        </Text>
                    </View>
                    <View style={{ width: "10%" }}>
                        <Text> </Text>
                    </View>
                </View>
            </View>
            <ScrollView style={{ backgroundColor: "#f4ebe2", }}>
                <Image
                    source={{ uri: GET_IMG(product.thumbnail) }}
                    style={{ width: '100%', height: 400 }}
                />
                <View style={{ backgroundColor: "white", paddingBottom: 60 }}>

                    <View style={{
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: "800", color: "#114459", paddingTop: 10 }}>
                            KATINAT
                        </Text>
                    </View>
                    <Text style={{ textAlign: "center", fontSize: 13, fontWeight: "600", color: "#bb946b", paddingTop: 10 }}>
                        {product.name}
                    </Text>

                    <Svg height="30" width="100%" style={{
                        position: 'absolute',
                        bottom: 0

                    }}>
                        <Path d="M 0 30 Q 175 -30 390 30 Z" fill="#f4ebe2" />
                    </Svg>


                </View>
                <Text style={{
                    paddingBottom: 100,
                    padding: 20,
                    color: "#777777",
                    fontSize: 13,
                }}>
                    {product.content}
                </Text>
            </ScrollView>
            {/* footer */}
            <View style={{ justifyContent: "flex-end", backgroundColor: "#f4ebe2" }}>

                <View style={{ backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                    <View style={{ width: "100%" }}>
                        <Svg height="50" width="100%" style={{
                            position: 'absolute',
                            top: -30,

                        }}>
                            <Path d="M 0 30 Q 175 -30 390 30 Z" fill="white" />
                        </Svg>

                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#bb946b',
                            width: "60%",
                            height: 50,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{
                            color: "white",
                            fontWeight: "700",
                        }}>Xem them</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

export default NewsEventDetail

const styles = StyleSheet.create({})