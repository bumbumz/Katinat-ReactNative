import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import ViewHelpContact from '../components/ViewHelpContact';
import FAQView from '../components/FAQView';

const HelpAndContact = () => {
    const navitation = useNavigation();
    const handleBack = () => {
        navitation.goBack();
    }
    const data = [
        {
            "id": 1,
            "name": "Phản hồi và hỗ trợ",
        },
        {
            "id": 2,
            "name": "Câu hỏi thường gặp",
        }
    ]
    const [isSelect, setIsSelect] = useState(1)
    const handle = (id) => {
        setIsSelect(id)
    }


   
    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                <TouchableOpacity style={{ width: "10%" }}
                    onPress={() => handleBack()}
                >
                    <View style={{
                        flexDirection: 'row',
                        height: 30, width: 30,
                        borderRadius: 50,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Ionicons name="arrow-back-outline" size={20} color="white" />
                    </View>
                </TouchableOpacity>
                <View style={{ alignItems: "center", width: "80%" }}>
                    <Text style={styles.header}>Trợ giúp & Liên hệ</Text>
                </View>
                <View style={{ width: "10%" }}>

                </View>
            </View>
            <View style={{ flexDirection: "row" }}>

                {
                    data.map((item, index) => (


                        <TouchableOpacity key={item.id}
                            onPress={() => handle(item.id)}
                            style={[{
                                backgroundColor: "#DDDDDD",
                                width: "50%",
                                paddingHorizontal: 20,
                                paddingVertical: 15,
                                borderRadius: "10%",
                                marginRight: 5,
                                justifyContent: "center",
                                alignItems: "center"
                            },
                            (isSelect == item.id && { backgroundColor: "#bb946b" })
                            ]}>
                            <Text style={[{ fontSize: 10, fontWeight: "800", color: "#AAAAAA", }, (isSelect == item.id && { color: "white" })]}>{item.name}</Text>
                        </TouchableOpacity>
                    ))
                }

            </View>


            <View>
                {
                    isSelect == 1
                        ?
                        <ViewHelpContact />
                        :
                        <View>
                           <FAQView/>
                        </View>
                }
            </View>




        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {

        padding: 16,
        backgroundColor: '#fff',

    },
    header: {
        fontSize: 13,
        fontWeight: 'bold',

    },

});

export default HelpAndContact;