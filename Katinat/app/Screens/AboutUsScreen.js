import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

const AboutUs = () => {
    const navitation = useNavigation();
    const handleBack = () => {
        navitation.goBack();
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
                    <Text style={styles.header}>Về chúng tôi</Text>
                </View>
                <View style={{ width: "10%" }}>

                </View>
            </View>
            <View style={{ alignItems: "center" }}>
                <Text style={styles.title}>KATINAT COFFEE & TEA HOUSE</Text>
            </View>
            <Text style={styles.subtitle}>KATINAT – HÀNH TRÌNH CHINH PHỤC PHONG VỊ MỚI</Text>
            <Text style={styles.body}>
                KATINAT không ngừng theo đuổi sứ mệnh mang phong vị mới từ những vùng đất trứ danh tại Việt Nam và trên thế giới đến khách hàng.
                {'\n\n'}
                Từ niềm đam mê khám phá hương vị ở những vùng đất mới với độ cao, thổ nhưỡng, độ ẩm và khí hậu tuyệt vời mà thiên nhiên ban tặng, những nghệ nhân KATINAT bắt đầu hành trình chinh phục khai phá nguồn nguyên liệu tinh hoa. Từng búp trà, từng hạt cà phê là nguồn cảm hứng bất tận cho những công thức đột phá, những sản phẩm tâm huyết giúp KATINAT chinh phục vị giác của khách hàng.
                {'\n\n'}
                KATINAT tự hào mang đến những sản phẩm với hương vị đặc sắc và bạn chính là một phần đặc biệt của “Hành trình chinh phục phong vị mới”.
            </Text>
            <Text style={styles.company}>CÔNG TY CỔ PHẦN CAFÉ KATINAT</Text>
            <Text style={styles.footer}>
                Giấy chứng nhận đăng ký kinh doanh số 0316612746 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp lần đầu ngày 27/11/2020.
                {'\n'}
                Địa chỉ trụ sở: 91 Đồng Khởi, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh
                {'\n'}
                Điện thoại: cs@katinat.vn
                {'\n'}
                Email: 028 3825 6679
            </Text>

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
    title: {
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 8,
        color: "#020C10"
    },
    subtitle: {
        fontSize: 13,
        fontWeight: "700",
        marginBottom: 16,
        marginTop: 10,
        color: "#082830"
    },
    body: {
        fontSize: 12,

        marginBottom: 16,
        color: "#114459"
    },
    company: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    footer: {
        fontSize: 11,

        marginBottom: 16,
        color: "#114459",
        paddingBottom: "20%"
    },
});

export default AboutUs;