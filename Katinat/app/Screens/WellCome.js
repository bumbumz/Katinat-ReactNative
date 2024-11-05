import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated'
import LottieView from 'lottie-react-native';
const WellCome = ({ navigation }) => {
    const handleRoute = () => {
        navigation.replace("MyTab")
    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 2 }}>
                <LottieView
                    source={require('../../assets/json/logocaffe.json')}
                    autoPlay={true}
                    loop={false}
                    style={styles.animation}
                    onAnimationFinish={handleRoute} // thêm sự kiện onAnimationFinish
                />
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <Animated.Text
                    entering={FadeInDown.duration(1200)}
                    style={styles.textWc}
                >
                    K
                </Animated.Text>

                <Animated.Text
                    entering={FadeInDown.duration(1300)}
                    style={styles.textWc}
                >
                    o
                </Animated.Text>

                <Animated.Text
                    entering={FadeInDown.duration(1400)}
                    style={styles.textWc}
                >
                    p
                </Animated.Text>

                <Animated.Text
                    entering={FadeInDown.duration(1500)}
                    style={styles.textWc}
                >
                    i
                </Animated.Text>

                <Animated.Text
                    entering={FadeInDown.duration(1600)}
                    style={styles.textWc}
                >

                </Animated.Text>
                <Animated.Text
                    entering={FadeInDown.duration(1700)}
                    style={styles.textWc}
                >
                    K
                </Animated.Text>

                <Animated.Text
                    entering={FadeInDown.duration(1800)}
                    style={styles.textWc}
                >
                    a
                </Animated.Text>

                <Animated.Text
                    entering={FadeInDown.duration(1900)}
                    style={styles.textWc}
                >
                    p
                </Animated.Text>
            </View>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={handleRoute}
                >
                    <Text style={styles.textWc}>Click Me</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default WellCome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#1BAE76"
    },
    textWc: {
        fontSize: 20,
        color: "#fff",
        fontWeight: 'bold'
    },
    animation: {
        width: 300,
        height: 300,
    },
})