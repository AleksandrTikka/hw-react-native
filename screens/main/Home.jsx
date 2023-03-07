import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

import { SimpleLineIcons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { View, TouchableOpacity, StyleSheet } from "react-native";
const MainTab = createBottomTabNavigator();
export default function Home() {
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingHorizontal: 70,
          paddingTop: 9,
          paddingBottom: 34,
          height: 83,
          borderTopWidth: 1,
          borderTopColor: "rgba(0, 0, 0, 0.3)",
        },

        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          color: "##212121",
          lineHeight: 22,
        },
        headerStyle: {
          //   height: 88,

          borderBottomWidth: 1,
          borderBottomColor: "rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <MainTab.Screen
        options={{
          //   headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                ...styles.iconWrapper,
                backgroundColor: focused ? "#FF6C00" : "#FFFFFF",
              }}
            >
              <SimpleLineIcons
                name="grid"
                size={24}
                color={focused ? "#FFFFFF" : "#212121"}
              />
            </View>
          ),

          title: "Публикации",
          //   headerStyle: {
          //     height: 88,
          //   },
          headerRight: () => (
            <TouchableOpacity style={{ paddingRight: 19 }}>
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                onPress={() => {
                  alert("нажата кнопка Logout");
                }}
              />
            </TouchableOpacity>
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          //   headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                ...styles.iconWrapper,
                backgroundColor: focused ? "#FF6C00" : "#FFFFFF",
              }}
            >
              <Feather
                name="plus"
                size={24}
                color={focused ? "#FFFFFF" : "#212121"}
              />
            </View>
          ),
          title: "Создать публикацию",
          //   headerStyle: {
          //     height: 88,
          //   },
          //   headerBackButtonMenuEnabled: true,
          //   headerBackVisible: true,
          //   headerBackTitleVisible: true,
          headerLeft: () => (
            <TouchableOpacity style={{ paddingLeft: 20 }}>
              <Feather
                name="arrow-left"
                size={24}
                color="#212121CC"
                onPress={() => {
                  alert("нажата кнопка назад");
                }}
              />
            </TouchableOpacity>
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                ...styles.iconWrapper,
                backgroundColor: focused ? "#FF6C00" : "#FFFFFF",
              }}
            >
              <Feather
                name="user"
                size={24}
                color={focused ? "#FFFFFF" : "#212121"}
              />
            </View>
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}
const styles = StyleSheet.create({
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    // backgroundColor: "#FF6C00",
    borderRadius: 20,
  },
});
