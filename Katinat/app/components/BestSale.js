import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustoomCorosel from './CustoomCorosel';
import { GET_ALL } from '../apiMe';

const BestSale = () => {
  const [coffeeData, setCoffeeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading

  useEffect(() => {
    GET_ALL("product-sale")
      .then((response) => {
        const responseData = response.data;

        setCoffeeData(responseData);

      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setIsLoading(false); // Đặt loading thành false sau khi kết thúc fetch
      });
  }, []);
  //console.log("data moi:", coffeeData)

  if (isLoading) {
    // Hiển thị loading indicator khi đang tải dữ liệu
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustoomCorosel data={coffeeData} />
    </View>
  );
}

export default BestSale;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
