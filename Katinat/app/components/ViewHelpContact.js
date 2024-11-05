import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome5, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const ViewHelpContact = () => {

    //gọi điện
    const phoneNumber = '0928697598';

    const makeCall = (number) => {
        Linking.openURL(`tel:${number}`)
            .catch((err) =>
                Alert.alert('Error', 'Không thể thực hiện cuộc gọi')
            );
    };
    //emaill
    const email = 'vinhcph554@gmail.com';
    const subject = 'Tiêu đề email';
    const body = 'Nội dung email';

    const sendEmail = () => {
        const emailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        Linking.openURL(emailUrl).catch((err) =>
            Alert.alert('Error', 'Không thể mở ứng dụng email')
        );
    };
    //website
    const website = 'https://katinat.vn/';
    const openWebsite = () => {
        Linking.openURL(website).catch((err) =>
            Alert.alert('Error', 'Không thể mở trang web')
        );
    };
    //fabook
    const facebook = 'https://www.facebook.com/katinat.vn';
    const openFacebook = () => {
        Linking.openURL(facebook).catch((err) =>
            Alert.alert('Error', 'Không thể mở trang web')
        );
    };


    return (
        <View>
            <View style={{
                alignItems: "center"
            }}>
                <TouchableOpacity
                    onPress={() => makeCall(phoneNumber)}
                    style={{
                        marginVertical: 5,
                        width: "90%",

                        backgroundColor: "#f5efe9",
                        borderRadius: "10%",
                        justifyContent: "center",
                        paddingVertical: 20
                    }}
                >
                    <View style={{

                        alignItems: "center",
                        paddingHorizontal: 10,
                        flexDirection: "row",

                    }}>
                        <MaterialCommunityIcons name="phone-in-talk" size={24} color="black" />
                        <View style={{ width: "80%", paddingHorizontal: "5%" }}>
                            <Text style={{
                                fontSize: 9,
                                fontWeight: "700"
                            }}>Tổng đài</Text>
                            <Text
                                style={{
                                    fontSize: 9,
                                    fontWeight: "400"
                                }}
                            >(028) 7300 1009</Text>
                        </View>
                        <MaterialIcons name="navigate-next" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{
                alignItems: "center"
            }}>
                <TouchableOpacity
                    onPress={sendEmail}

                    style={{
                        marginVertical: 5,
                        width: "90%",

                        backgroundColor: "#f5efe9",
                        borderRadius: "10%",
                        justifyContent: "center",
                        paddingVertical: 20
                    }}
                >
                    <View style={{

                        alignItems: "center",
                        paddingHorizontal: 10,
                        flexDirection: "row",

                    }}>
                        <Fontisto name="email" size={24} color="black" />
                        <View style={{ width: "80%", paddingHorizontal: "5%" }}>
                            <Text style={{
                                fontSize: 9,
                                fontWeight: "700"
                            }}>Email</Text>
                            <Text
                                style={{
                                    fontSize: 9,
                                    fontWeight: "400"
                                }}
                            >{email}</Text>
                        </View>
                        <MaterialIcons name="navigate-next" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{
                alignItems: "center"
            }}>
                <TouchableOpacity
                    onPress={openWebsite}

                    style={{
                        marginVertical: 5,
                        width: "90%",

                        backgroundColor: "#f5efe9",
                        borderRadius: "10%",
                        justifyContent: "center",
                        paddingVertical: 20
                    }}
                >
                    <View style={{

                        alignItems: "center",
                        paddingHorizontal: 10,
                        flexDirection: "row",

                    }}>
                        <FontAwesome5 name="compass" size={24} color="black" />
                        <View style={{ width: "80%", paddingHorizontal: "5%" }}>
                            <Text style={{
                                fontSize: 9,
                                fontWeight: "700"
                            }}>Web</Text>
                            <Text
                                style={{
                                    fontSize: 9,
                                    fontWeight: "400"
                                }}
                            >{website}</Text>
                        </View>
                        <MaterialIcons name="navigate-next" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{
                alignItems: "center"
            }}>
                <TouchableOpacity
                    onPress={openFacebook}

                    style={{
                        marginVertical: 5,
                        width: "90%",

                        backgroundColor: "#f5efe9",
                        borderRadius: "10%",
                        justifyContent: "center",
                        paddingVertical: 20
                    }}
                >
                    <View style={{

                        alignItems: "center",
                        paddingHorizontal: 10,
                        flexDirection: "row",

                    }}>
                        <MaterialIcons name="next-plan" size={24} color="black" />
                        <View style={{ width: "80%", paddingHorizontal: "5%" }}>
                            <Text style={{
                                fontSize: 9,
                                fontWeight: "700"
                            }}>Facebook</Text>
                            <Text
                                style={{
                                    fontSize: 9,
                                    fontWeight: "400"
                                }}
                            >{facebook}</Text>
                        </View>
                        <MaterialIcons name="navigate-next" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            </View>






        </View>
    )
}

export default ViewHelpContact

const styles = StyleSheet.create({})