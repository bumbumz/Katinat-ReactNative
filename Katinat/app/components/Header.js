import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'
const { width: widthall } = Dimensions.get("window");
const Header = () => {
    return (
        <View style={{ backgroundColor: "#114459", height: 120 }}>
            <View style={{
                width: '100%', position: 'absolute',

                bottom: 0
            }}>
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={require('../../assets/images/logokn.png')}
                        style={{ width: 200, height: 50 }}
                    />
                </View>
                <Svg height="30" width={widthall} style={{

                }}>
                    {/* Sử dụng widthall cho giá trị động trong Path */}
                    <Path d={`M 0 30 Q ${widthall * 0.5} -10 ${widthall} 30 Z`} fill="white" />
                </Svg>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})