import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GET_ALL, GET_IMG } from '../apiMe';
import Carousel from 'react-native-reanimated-carousel';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';

const NewsEvent = () => {
    const [news, setNews] = useState([]);

    const fetchData = () => {
        GET_ALL("news-event")
            .then((reponse) => {
                setNews(reponse.data);
            }
            ).catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        fetchData();

    }, [])
    console.log("news", news)
    console.log("đã vào")
    const navigation = useNavigation()
    const handleNews = (data) => {
        navigation.navigate('NewsEventDetail', { product: data })

    }
    return (
        <View>
            <Text
                style={{
                    fontSize: 12,
                    fontWeight: '700',
                    marginVertical: 10,
                    paddingLeft: 5,
                    marginLeft: 10,
                    color: "#114459",

                }}
            >TIN TỨC - SỰ KIỆN</Text>
            <View>
                <Carousel
                    width={160}
                    height={250}
                    loop={true}
                    pagingEnabled={false}
                    style={styles.carousel}
                    index={0}
                    scrollAnimation={true}
                    data={news}
                    renderItem={({ item }) => (

                        <TouchableOpacity style={styles.item}
                            onPress={() => handleNews(item)}

                        >
                            <Image source={{ uri: GET_IMG(item.thumbnail) }} style={styles.image} />
                            <View style={{ marginVertical: 6 }}>
                                <View style={{
                                    backgroundColor: "#b48c68",
                                    width: "50%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: 3,
                                    borderRadius: 50
                                }}>
                                    <Text style={{ fontSize: 5, fontWeight: "800", color: "white" }}>TIN TỨC - SỰ KIỆN</Text>
                                </View>
                            </View>
                            <View style={{
                                width: "80%",
                                paddingHorizontal: 5,

                            }}>
                                <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )



}



export default NewsEvent

const styles = StyleSheet.create({
    carousel: {

        width: "100%",
        justifyContent: "center"

    },
    title: {
        fontSize: 9,
        fontWeight: "600"
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 20,
    },
    item: {
        borderRadius: 20,


    }
})