import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import WellCome from "./Screens/WellCome";
import MyTabs from "./MyTabs";
import DetailProduct from "./Screens/DetailProduct";
import CatDetail from "./Screens/CatDetail";
import LoginScreen from "./Screens/LoginScreen";
import AboutUs from "./Screens/AboutUsScreen";
import HelpAndContact from "./Screens/HelpAndContact";
import NewsEventDetail from "./Screens/NewsEventDetail";
import WishListScreen from "./Screens/WishListScreen";
import CheckOutScreen from "./Screens/CheckOutScreen";
import Test from "./Screens/Test";
import RegisterScreen from "./Screens/RegisterScreen";
import SreachScreen from "./Screens/SreachScreen";
import EditProfileScreen from "./Screens/EditProfileScreen";
import ForgetPassword from "./Screens/ForgetPassword";
import ResetPassWord from "./Screens/ResetPassWord";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer independent={true} >
        <Stack.Navigator

        >
          <Stack.Screen name="WellCome"
            options={{ headerShown: false }}
            component={WellCome}
          />
          <Stack.Screen name="MyTab"
            options={{ headerShown: false }}
            component={MyTabs}
          />
          <Stack.Screen name="DetailProduct"
            options={{ headerShown: false }}
            component={DetailProduct}
          />
          <Stack.Screen name="CatDetail"
            options={{ headerShown: false }}
            component={CatDetail}
          />
          <Stack.Screen name="LoginScreen"
            options={{ headerShown: false }}
            component={LoginScreen}
          />
          <Stack.Screen name="AboutUs"
            options={{ headerShown: false }}
            component={AboutUs}
          />
          <Stack.Screen name="HelpAndContact"
            options={{ headerShown: false }}
            component={HelpAndContact}
          />
          <Stack.Screen name="NewsEventDetail"
            options={{ headerShown: false }}
            component={NewsEventDetail}
          />
          <Stack.Screen name="WishListScreen"
            options={{ headerShown: false }}
            component={WishListScreen}
          />
          <Stack.Screen name="CheckOutScreen"
            options={{ headerShown: false }}
            component={CheckOutScreen}
          />
          <Stack.Screen name="Test"
            options={{ headerShown: false }}
            component={Test}
          />

          <Stack.Screen name="RegisterScreen"
            options={{ headerShown: false }}
            component={RegisterScreen}
          />

          <Stack.Screen name="SreachScreen"
            options={{ headerShown: false }}
            component={SreachScreen}
          />

          <Stack.Screen name="EditProfileScreen"
            options={{ headerShown: false }}
            component={EditProfileScreen}
          />

          <Stack.Screen name="ForgetPassword"
            options={{ headerShown: false }}
            component={ForgetPassword}
          />

          <Stack.Screen name="ResetPassWord"
            options={{ headerShown: false }}
            component={ResetPassWord}
          />








        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppNavigator;
