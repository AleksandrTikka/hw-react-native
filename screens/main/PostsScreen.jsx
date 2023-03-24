import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CommentsScreen from "../nested/CommentsScreen";
import MapScreen from "../nested/MapScreen";
import DefaultPostsScreen from "../nested/DefaultPostsScreen";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const NestedStack = createStackNavigator();
export default function PostsScreen({ navigation }) {
  return (
    <NestedStack.Navigator
      // initialRouteName="DefaultPosts"
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
      <NestedStack.Screen
        options={{
          title: "Публікації",
          headerRight: () => (
            <TouchableOpacity style={{ paddingRight: 19 }}>
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                onPress={() => {
                  alert("Натиснута кнопка Logout");
                }}
              />
            </TouchableOpacity>
          ),
        }}
        name="DefaultPosts"
        component={DefaultPostsScreen}
      />
      <NestedStack.Screen
        options={{ title: "Коментарі" }}
        name="Comments"
        component={CommentsScreen}
      />
      <NestedStack.Screen name="Map" component={MapScreen} />
    </NestedStack.Navigator>
  );
}
