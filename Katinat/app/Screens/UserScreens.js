import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import HeaderLogin from '../components/HeaderLogin'
import { AntDesign, Entypo, EvilIcons, Feather, Foundation, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';



const UserScreens = () => {

    const navigation = useNavigation()
    const [mo, setMo] = useState(true);

    //để sử dụng Animated khai báo một biến useRef để lưu trữ giá trị cố đinh
    // Không sửa đổi trực tiếp giá trị hoạt hình. Bạn có thể sử dụng useRefHook để trả về đối tượng ref có thể thay đổi. 
    // currentThuộc tính của đối tượng ref này được khởi tạo dưới dạng đối số đã cho và tồn tại trong suốt vòng đời của thành phần.
    const animatedHeight = useRef(new Animated.Value(0)).current;

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
            outputRange: [260, 75],
        })
    const handleAbout = () => {
        navigation.navigate("AboutUs");

    }


    const handleWl = () => {
        navigation.navigate("WishListScreen");
    }
    const handleEdit = () => {
        navigation.navigate("EditProfileScreen");
    }
    return (
        <View>
            <View style={{}}>
                <HeaderLogin />
            </View>
            <Animated.View style={[
                {
                    height: doiHeight,
                    overflow: 'hidden',
                    marginHorizontal: 10,
                    borderRadius: "15%",
                    borderWidth: 1,
                    borderColor: "#DDDDDD",

                },

            ]}>
                <View style={{ padding: 25, backgroundColor: "white", borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ color: "#05291f", fontSize: 11, fontWeight: "600" }}>Thông tin tài khoản</Text>
                        <TouchableOpacity onPress={handleShow}
                        >
                            <Entypo name={mo ? "chevron-small-down" : "chevron-small-up"} size={24} color="#DDDDDD" />
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: "column", paddingTop: 30, }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                            <TouchableOpacity style={{
                                borderWidth: 1, borderStyle: "dashed", width: 78, height: 78, borderColor: "#DDDDDD"

                            }}
                                onPress={handleEdit}
                            >
                                <View style={{ justifyContent: "center", alignItems: "center", flex: 1, padding: 5 }}>
                                    <Feather name="edit" size={20} color="#05291f" style={{ padding: 10 }} />
                                    <Text style={{
                                        fontSize: 7,
                                        fontWeight: "800",
                                        textAlign: "center"
                                    }}>Chỉnh sửa trang cá nhân</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ borderWidth: 1, borderStyle: "dashed", width: 78, height: 78, marginLeft: -1, borderColor: "#DDDDDD" }}>
                                <View style={{ justifyContent: "center", alignItems: "center", flex: 1, padding: 5 }}>
                                    <EvilIcons name="like" size={25} color="#05291f" style={{ padding: 10 }} />
                                    <Text style={{
                                        fontSize: 7,
                                        fontWeight: "800",
                                        textAlign: "center"
                                    }}>Sở thích</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleWl}
                                style={{ borderWidth: 1, borderStyle: "dashed", width: 78, height: 78, marginLeft: -1, borderColor: "#DDDDDD" }}>
                                <View style={{ justifyContent: "center", alignItems: "center", flex: 1, padding: 5 }}>
                                    <Ionicons name="heart-circle-outline" size={25} color="#05291f" style={{ padding: 10 }} />
                                    <Text style={{
                                        fontSize: 7,
                                        fontWeight: "800",
                                        textAlign: "center"
                                    }}>Danh sách yêu thích</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ borderWidth: 1, borderStyle: "dashed", width: 78, height: 78, marginLeft: -1, borderColor: "#DDDDDD" }}>
                                <View style={{ justifyContent: "center", alignItems: "center", flex: 1, padding: 5 }}>
                                    <MaterialCommunityIcons name="crown-circle-outline" size={25} color="#05291f" style={{ padding: 10 }} />
                                    <Text style={{
                                        fontSize: 6,
                                        fontWeight: "800",
                                        textAlign: "center"
                                    }}>Đặc quyền hạng thành viên</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 2 }}>
                            <TouchableOpacity style={{ borderWidth: 1, borderStyle: "dashed", width: 78, height: 78, borderColor: "#DDDDDD" }}>
                                <View style={{ justifyContent: "center", alignItems: "center", flex: 1, padding: 5 }}>
                                    <Foundation name="burst-sale" size={30} color="#05291f" style={{ padding: 10 }} />
                                    <Text style={{
                                        fontSize: 6,
                                        fontWeight: "800",
                                        textAlign: "center"
                                    }}>Ưu đãi</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ borderWidth: 1, borderStyle: "dashed", width: 78, height: 78, marginLeft: -1, borderColor: "#DDDDDD" }}>
                                <View style={{ justifyContent: "center", alignItems: "center", flex: 1, padding: 5 }}>
                                    <MaterialCommunityIcons name="progress-clock" size={25} color="#05291f" style={{ padding: 10 }} />
                                    <Text style={{
                                        fontSize: 6,
                                        fontWeight: "800",
                                        textAlign: "center",

                                    }}>Lịch sử đặt hàng</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ borderWidth: 1, borderStyle: "dashed", width: 78, height: 78, marginLeft: -1, borderColor: "#DDDDDD" }}>
                                <View style={{ justifyContent: "center", alignItems: "center", flex: 1, padding: 5 }}>
                                    <AntDesign name="exception1" size={25} color="#05291f" style={{ padding: 10 }} />
                                    <Text style={{
                                        fontSize: 6,
                                        fontWeight: "800",
                                        textAlign: "center",

                                    }}>Đánh giá đơn hàng</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ borderWidth: 1, borderStyle: "dashed", width: 78, height: 78, marginLeft: -1, borderColor: "#DDDDDD" }}>
                                <View style={{ justifyContent: "center", alignItems: "center", flex: 1, padding: 5 }}>
                                    <Entypo name="slideshare" size={25} color="#05291f" style={{ padding: 10 }} />
                                    <Text style={{
                                        fontSize: 6,
                                        fontWeight: "800",
                                        textAlign: "center",
                                    }}>Giới thiệu bạn bè</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Animated.View >
            <View style={{
                marginHorizontal: 10,
                borderRadius: "15%",
                padding: 30,
                borderColor: "#DDDDDD",
                borderWidth: 1,
                backgroundColor: "white",
                marginTop: 10
            }}>
                <Text style={{ color: "#05291f", fontSize: 18, fontWeight: "700" }}>0 KAT</Text>
                <Text style={{ color: "#05291f", fontSize: 10, fontWeight: "300" }}>Cần thêm 100 KAT để lên SILVER</Text>
                <Text style={{ color: "#05291f", fontSize: 10, fontWeight: "500", marginTop: 5 }}>* Cần phát sinh tối thiểu 01 đơn hàng trong 03 tháng để giữ hạng</Text>
                <Text style={{ color: "#05291f", fontSize: 10, fontWeight: "500", marginTop: 5 }}>* 1 KAT =10.000VND</Text>

            </View>
            <TouchableOpacity style={{ backgroundColor: "white", margin: 10, borderRadius: 10 }}
                onPress={handleAbout}
            >
                <View style={{
                    flexDirection: "row",
                    paddingStart: 30,
                    paddingVertical: 15,
                    borderColor: "#DDDDDD",
                    borderWidth: 1,
                    borderRadius: "10%",
                }}>
                    <MaterialCommunityIcons name="home-modern" size={24} color="black" />
                    <View style={{ justifyContent: "center" }}>
                        <Text style={{ fontWeight: "500", fontSize: 12 }}>Về chúng tôi</Text>
                    </View>
                </View>
            </TouchableOpacity>

        </View >
    )
}

export default UserScreens

const styles = StyleSheet.create({})