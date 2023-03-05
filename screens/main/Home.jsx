import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

import { SimpleLineIcons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { View, Text, StyleSheet } from "react-native";
const MainTab = createBottomTabNavigator();
export default function Home() {
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          color: "##212121",
        },
        headerStyle: { height: 88, marginBottom: 11 },
      }}
    >
      <MainTab.Screen
        options={{
          //   headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <SimpleLineIcons name="grid" size={size} color={color} />
          ),

          title: "Публикации",
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          //   headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View style={styles.plus}>
              <Feather name="plus" size={20} color="#FFFFFF" />
            </View>
          ),
          title: "Создать публикацию",
          headerBackButtonMenuEnabled: true,
          headerBackVisible: true,
          headerBackTitleVisible: true,
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}
const styles = StyleSheet.create({
  plus: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },
});
