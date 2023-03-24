import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

export default function DefaultPostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  console.log("route.params", route.params);
  console.log("posts", posts);
  useEffect(() => {
    if (route.params !== undefined) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  // const { image, title, localityName, location } = route;
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.state.image }}
              style={{ width: 250, height: 200 }}
            />
            <Text>{item.state.title}</Text>
            <Text>{item.state.localityName}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Comments");
              }}
            >
              <Text>Комментарі</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Map");
              }}
            >
              <Text>Мапа</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
});
