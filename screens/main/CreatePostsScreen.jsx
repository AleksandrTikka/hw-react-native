import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

const initialState = {
  image: "",
  title: "",
  localityName: "",
  location: "null",
  comments: [],
};

export default function CreatePostsScreen({ navigation }) {
  const [cameraRef, setCameraRef] = useState(null);

  const [hasCamPermission, setHasCamPermission] = useState(null);
  // const [image, setImage] = useState("");
  // const [title, setTitle] = useState("");
  // const [localityName, setLocalityName] = useState("");
  // const [location, setLocation] = useState(null);
  const [state, setState] = useState(initialState);
  const [isShowkeyboard, setIsShowKeyboard] = useState(false);
  const [isTitleFocus, setIsTitleFocus] = useState(false);
  const [isLocalityNameFocus, setIsLocalityNameFocus] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasCamPermission(status === "granted");
    })();
  }, []);

  if (hasCamPermission === false) {
    return <Text>No access to camera</Text>;
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return <Text>"Permission to access location was denied"</Text>;
      }
    })();
  }, []);

  const isFormCompleted = state.image && state.title && state.localityName;

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const takePhoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      let location = await Location.getCurrentPositionAsync();

      console.log("camera--->", photo);
      console.log("latitude", location.coords.latitude);
      console.log("longitude", location.coords.longitude);
      setState((prevState) => ({
        ...prevState,
        image: photo.uri,
        location,
      }));
    }
  };
  const resetForm = () => {
    setState(initialState);
  };

  const pickImage = async () => {
    await MediaLibrary.requestPermissionsAsync();
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setState((prevState) => ({ ...prevState, image: result.assets[0].uri }));
    }
  };

  const sendPost = () => {
    console.log("navigation", navigation);
    resetForm();
    navigation.navigate("DefaultPosts", { state });
  };

  console.log(state);

  const uploadPhoto = () => {
    alert("Функція завантаження фото");
  };

  const editPhoto = () => {
    setState((prevState) => ({ ...prevState, image: "" }));
    // alert("Функція редагування фото");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
          <View>
            <View style={styles.photoWrapper}>
              {state.image ? (
                <View style={styles.takePhotoContainer}>
                  <Image
                    resizeMode="cover"
                    source={{ uri: state.image }}
                    style={{ height: 240, borderRadius: 8 }}
                  />
                </View>
              ) : (
                <Camera
                  style={styles.camera}
                  ref={(ref) => {
                    setCameraRef(ref);
                  }}
                >
                  <TouchableOpacity
                    onPress={takePhoto}
                    style={styles.iconCameraWrapper}
                  >
                    <View>
                      <MaterialIcons
                        name="camera-alt"
                        size={24}
                        color="#BDBDBD"
                      />
                    </View>
                  </TouchableOpacity>
                </Camera>
              )}
            </View>
            <View>
              <TouchableOpacity onPress={state.image ? editPhoto : pickImage}>
                <Text style={styles.btnImageTitle}>
                  {state.image ? "Редагувати фото" : "Завантажте фото"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.input, marginTop: 48 }}>
              <TextInput
                placeholder="Назва..."
                placeholderTextColor={"#BDBDBD"}
                input={state.title}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, title: value }))
                }
                // onFocus={setIsShowKeyboard(true)}
                // onBlur={setIsShowKeyboard(false)}
              ></TextInput>
            </View>
            <View style={{ ...styles.input, marginTop: 32 }}>
              <Feather
                style={styles.inputIcon}
                name="map-pin"
                size={24}
                color="#BDBDBD"
              />
              <TextInput
                style={{ marginLeft: 28 }}
                placeholder="Місцевість..."
                // placeholderTextColor={"#BDBDBD"}
                placeholderStyle={{
                  color: "#red",
                  fontFamily: "Roboto-Regular",
                  fontStyle: "normal",
                  fontSize: 16,
                  lineHeight: 19,
                }}
                input={state.localityName}
                onChangeText={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    localityName: value,
                  }))
                }
              ></TextInput>
            </View>
            <TouchableOpacity
              style={
                !isFormCompleted
                  ? { ...styles.btn, ...styles.btnDisable }
                  : { ...styles.btn }
              }
              onPress={sendPost}
              disabled={!isFormCompleted}
            >
              <Text
                style={
                  !isFormCompleted
                    ? { ...styles.btnTitle, ...styles.btnTitleDisable }
                    : { ...styles.btnTitle }
                }
              >
                Опублікувати
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    //
    paddingHorizontal: 16,
  },
  photoWrapper: {
    marginTop: 32,

    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "#e8e8e8",
    borderWidth: 1,
  },
  takePhotoContainer: {
    height: 240,
    position: "relative",

    borderWidth: 1,
    borderColor: "#fff",
  },
  iconCameraWrapper: {
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    borderRadius: 30,

    justifyContent: "center",
    alignItems: "center",
  },
  btnImageTitle: {
    color: "#BDBDBD",
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    justifyContent: "flex-start",
    paddingBottom: 15,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    // placeholder: {
    //   color: "#red",
    //   fontFamily: "Roboto-Regular",
    //   fontStyle: "normal",
    //   fontSize: 16,
    //   lineHeight: 19,
    // },
  },
  inputIcon: {
    position: "absolute",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 32,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
  },
  btnDisable: { backgroundColor: "#F6F6F6" },

  btnTitle: {
    color: "#FFF",
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",

    fontSize: 16,
    lineHeight: 19,
  },
  btnTitleDisable: { color: "#BDBDBD" },
});
