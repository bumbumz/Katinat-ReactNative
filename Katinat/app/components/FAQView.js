import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const FAQView = () => {
    const animatedHeight = useRef(new Animated.Value(0)).current;
    const [mo, setMo] = useState(false);
    const handleShow = () => {
        setMo(!mo);
        //Animated.timing()làm cho giá trị chuyển động theo thời gian 
        Animated.timing(animatedHeight,
            {
                toValue: mo ? 1 : 0, // Giá trị kết thúc
                duration: 300,
                useNativeDriver: false// Sử dụng native driver để tăng hiệu suất

            }).start();// Bắt đầu animation
    };
    const doiHeight = animatedHeight.interpolate
        ({
            inputRange: [0, 1],
            outputRange: [200, 89],
        })
    return (
        <View>
            <View style={{ alignItems: "center" }}>
                <Text style={{
                    color: "#bb946b",
                    fontSize: 18,
                    fontWeight: '900',
                }}>Câu hỏi thường gặp</Text>
            </View>
            <View style={{
                flexDirection: "row"
            }}>
                <View
                    style={{
                        width: "30%",
                        height: "100%"
                    }}
                >
                    <Text style={{
                        color: "#bb946b",
                        fontSize: 16,
                    }}>Câu hỏi 1</Text>

                </View>
                <View style={{ width: "78%" }}>
                    <Animated.View style={[
                        {
                            height: doiHeight,
                            overflow: 'hidden',
                            marginHorizontal: 10,
                            borderRadius: "15%",
                            borderWidth: 1,
                            borderColor: "#DDDDDD",
                            width: "90%"

                        },

                    ]}>
                        <TouchableOpacity
                            onPress={() => handleShow()}
                            style={{
                                backgroundColor: "#f5efe9",
                            }}
                        >
                            <View style={{
                                flexDirection: "row",
                                padding: 5,
                                alignItems: "center",
                                backgroundColor: "#f5efe9",
                            }}>
                                <View style={{
                                    width: "90%",
                                    overflow: 'hidden',

                                }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: "#bb946b",
                                        fontWeight: "700"

                                    }}>Làm thế nào nếu không nhập được  mã OTP khi đăng ký ứng dụng KATINAT?</Text>
                                </View>

                                <Entypo name={mo ? "chevron-small-down" : "chevron-small-up"} size={24} color="#DDDDDD" />
                            </View>

                        </TouchableOpacity>
                        <ScrollView
                            style={{
                                backgroundColor: "#f5efe9",
                                padding: 5, paddingBottom: 10
                            }}
                        >
                            <Text style={{
                                fontSize: 15,

                            }}>Bạn có thể kiểm tra lại SDT/Email để chắc chắn đã điền đúng thông tin cá nhân. Sau đó, nếu vẫn không thể đăng ký thành công, liên hệ hotline(028) 7300 1003 để tụi mình hỗ trỡ bạn nhé.</Text>

                        </ScrollView>

                    </Animated.View>

                </View>

            </View>
        </View>
    )
}

export default FAQView

const styles = StyleSheet.create({})