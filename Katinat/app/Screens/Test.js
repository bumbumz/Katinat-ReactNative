import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

const Test = () => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['1%', '50%'], []);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [address, setAddress] = useState(null);

    const handleSheetChanges = useCallback((index) => {
        setIsSheetOpen(index !== -1);
    }, []);

    const toggleBottomSheet = () => {
        if (isSheetOpen) {
            bottomSheetRef.current?.close();
        } else {
            bottomSheetRef.current?.expand();
        }
    };

    const handleText = async () => {
      
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log('Tọa độ hiện tại:', location.coords);

        let reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });

        if (reverseGeocode.length > 0) {
            const { name, street, city, region, postalCode, country } = reverseGeocode[0];
            const fullAddress = `${name || ''} ${street || ''}, ${city || ''}, ${region || ''}, ${postalCode || ''}, ${country || ''}`.trim();
            setAddress(fullAddress);
            console.log('Địa chỉ hiện tại:', fullAddress);
        } 
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textheader}>Campaign</Text>
            </View>
            <Button title={isSheetOpen ? "Close Bottom Sheet" : "Open Bottom Sheet"} onPress={toggleBottomSheet} />
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <BottomSheetView style={styles.BottomSheetView}>
                    <TouchableOpacity onPress={handleText}>
                        <Text style={styles.sheetText}>Campaign</Text>
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        {address && <Text style={styles.addressText}>Địa chỉ: {address}</Text>}
                    </View>
                    <Text style={styles.sheetText}>Salads Now Available!</Text>
                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
};

export default Test;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#f7f7f7',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    textheader: {
        color: '#1D4D4F',
        fontSize: 20,
        fontWeight: 'bold',
    },
    BottomSheetView: {
        flex: 1,
        padding: 24,
    },
    sheetText: {
        marginLeft: 20,
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    addressText: {
        marginTop: 20,
        fontSize: 12,
        color: '#555',
    }
});
