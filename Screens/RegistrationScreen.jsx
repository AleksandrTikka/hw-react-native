import React, { useState, useCallback, useEffect } from "react";
import {
  TextInput,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  // TouchableHighlight,
  Image,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [isLoginFocus, setIsLoginFocus] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensionsWidth, setDimensionsWidth] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  const [dimensionsHeigth, setDimensionsHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensionsWidth(width);
      const height = Dimensions.get("window").height;
      setDimensionsHeight(height);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => {
      subscription.remove();
    };
  }, []);

  const showPassword = () => {
    setIsSecurePassword((isSecurePassword) => !isSecurePassword);
  };

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmitForm = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  const onLoginFocus = () => {
    setIsLoginFocus(true);
    setIsShowKeyboard(true);
  };

  const onLoginBlur = () => {
    setIsLoginFocus(false);
    setIsShowKeyboard(false);
  };

  const onEmailFocus = () => {
    setIsEmailFocus(true);
    setIsShowKeyboard(true);
  };

  const onEmailBlur = () => {
    setIsEmailFocus(false);
    setIsShowKeyboard(false);
  };

  const onPasswordFocus = () => {
    setIsPasswordFocus(true);
    setIsShowKeyboard(true);
  };

  const onPasswordBlur = () => {
    setIsPasswordFocus(false);
    setIsShowKeyboard(false);
  };

  const inputStyle = (isFocus) => {
    return isFocus ? { ...styles.input, ...styles.inputOnFocus } : styles.input;
  };

  const onAddImage = () => {
    Alert.alert("Functionality in development...");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          source={require("../assets/photo_bg.png")}
          resizeMode="cover"
          style={styles.background}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.formWrapper,
                // marginBottom: isShowKeyboard ? -160 : 78,
                // marginTop: dimensionsWidth > dimensionsHeigth ? 50 : 0,
                // paddingHorizontal: dimensions,
              }}
            >
              <View
                style={{
                  alignItems: "center",

                  position: "absolute",
                  top: -60,
                  zIndex: 10,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    width: 120,
                    height: 120,
                    backgroundColor: "#F6F6F6",
                    borderRadius: 16,

                    // left: "50%",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      zIndex: 20,
                      position: "absolute",
                      right: -12.5,
                      bottom: 14,
                    }}
                    // title="Pick an image from camera roll"
                    onPress={onAddImage}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        width: 25,
                        height: 25,
                      }}
                    >
                      {/* <Svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12.5"
                        cy="12.5"
                        r="12"
                        fill="white"
                        stroke="#FF6C00"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13 6H12V12H6V13H12V19H13V13H19V12H13V6Z"
                        fill="#FF6C00"
                      />
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
                    </Svg> */}

                      <Image
                        source={require("../assets/add.png")}
                        resizeMode="cover"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  ...styles.form,
                  width: dimensionsWidth,
                  marginBottom: isShowKeyboard ? -175 : 78,
                }}
              >
                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>Регистрация</Text>
                </View>
                <View>
                  <TextInput
                    style={inputStyle(isLoginFocus)}
                    autoCorrect={false}
                    autoComplete={"username"}
                    onFocus={onLoginFocus}
                    onBlur={onLoginBlur}
                    value={state.login}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, login: value }))
                    }
                    placeholder={"Логин"}
                    placeholderTextColor="#BDBDBD"
                  ></TextInput>
                </View>
                <View style={{ marginTop: 16 }}>
                  <TextInput
                    style={inputStyle(isEmailFocus)}
                    autoCorrect={false}
                    autoComplete={"email"}
                    onFocus={onEmailFocus}
                    onBlur={onEmailBlur}
                    value={state.email}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                    placeholder={"Адрес электронной почты"}
                    placeholderTextColor="#BDBDBD"
                  ></TextInput>
                </View>
                <View style={{ marginTop: 16 }}>
                  <TextInput
                    style={{
                      ...inputStyle(isPasswordFocus),
                      position: "relative",
                      paddingRight: 87,
                    }}
                    autoCorrect={false}
                    autoComplete={"off"}
                    input={state.password}
                    onFocus={onPasswordFocus}
                    onBlur={onPasswordBlur}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={isSecurePassword}
                  ></TextInput>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={showPassword}
                    style={styles.btnSecure}
                  >
                    <Text style={styles.btnSecureText}>
                      {isSecurePassword ? "Показать" : "Скрыть"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btn}
                  onPress={onSubmitForm}
                >
                  <Text style={styles.btnTitle}>Зарегистрироваться</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} style={styles.link}>
                  <Text style={styles.linkText}>Уже есть аккаунт? Войти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",

    position: "relative",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formWrapper: {
    alignItems: "center",

    backgroundColor: "#fff",

    borderTopLeftRadius: 35,
    borderTopRightRadius: 25,

    paddingTop: 92,
  },
  form: {
    // marginTop: 92,
    // PaddingBottom: 78,
  },
  titleWrapper: {
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",

    fontSize: 30,
    lineHeight: 35,

    color: "#212121",

    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",

    fontSize: 16,
    lineHeight: 19,

    height: 50,
    color: "#212121",
    paddingHorizontal: 16,
  },
  inputOnFocus: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FF6C00",
  },
  btnSecure: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  btnSecureText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  btn: {
    height: 50,
    borderRadius: 100,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 43,
  },
  btnTitle: {
    color: "#FFF",
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",

    fontSize: 16,
    lineHeight: 19,
  },
  link: {
    alignItems: "center",
    marginTop: 16,
  },
  linkText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",

    fontSize: 16,
    lineHeight: 19,

    color: "#1B4371",
  },
});

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ImageBackground,
//   TextInput,
//   TouchableOpacity,
//   Platform,
//   KeyboardAvoidingView,
//   Keyboard,
//   TouchableWithoutFeedback,
//   Dimensions,
// } from "react-native";

// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
// import * as ImagePicker from "expo-image-picker";

// import { AntDesign, Feather } from "@expo/vector-icons";

// const initialState = {
//   login: "",
//   email: "",
//   password: "",
// };

// export default function RegistrationScreen({ navigation }) {
//   const [isShowKeyboard, setIsShowKeyboard] = useState(false);
//   const [state, setState] = useState(initialState);
//   const [image, setImage] = useState(null);

//   const [dimensions, setDimensions] = useState(
//     Dimensions.get("window").width - 16 * 2
//   );
//   const [dimensionsHeigth, setDimensionsHeigth] = useState(
//     Dimensions.get("window").height
//   );

//   const [isSecurePassword, setIsSecurePassword] = useState(true);
//   const [emailFocus, setEmailFocus] = useState(false);
//   const [loginFocus, setLoginFocus] = useState(false);
//   const [passwordFocus, setPasswordFocus] = useState(false);

//   const focusInputStyle = (focus) => {
//     return focus ? { ...styles.input, ...styles.inputFocus } : styles.input;
//   };

//   useEffect(() => {
//     const onChange = () => {
//       const width = Dimensions.get("window").width - 16 * 2;
//       const height = Dimensions.get("window").height;

//       setDimensions(width);
//       setDimensionsHeigth(height);
//     };
//     const subscription = Dimensions.addEventListener("change", onChange);
//     return () => subscription.remove();
//   });

//   const keyboardHide = () => {
//     setIsShowKeyboard(false);
//     Keyboard.dismiss();
//   };

//   const formSubmit = () => {
//     setState(initialState);
//     setIsSecurePassword(true);
//     console.log(state);
//   };

//   const passwordShown = () => {
//     isSecurePassword === true
//       ? setIsSecurePassword(false)
//       : setIsSecurePassword(true);
//   };

//   const showPasswordBtn = isSecurePassword ? "Показать" : "Cкрыть";

//   //fonts
//   SplashScreen.preventAutoHideAsync();

//   const [fontsLoaded] = useFonts({
//     "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
//     "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
//   });

//   const onLayoutRootView = useCallback(async () => {
//     if (fontsLoaded) {
//       await SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded]);

//   if (!fontsLoaded) {
//     return null;
//   }

//   // img load
//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       // setState((prevState) => ({
//       //   ...prevState,
//       //   image: result.assets[0].uri,
//       // }));
//     }
//   };
//   const addImg = () => {
//     return (
//       <TouchableOpacity
//         title="Pick an image from camera roll"
//         onPress={pickImage}
//       >
//         <View style={{ backgroundColor: "#fff", borderRadius: 100 }}>
//           <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const delleteImg = () => {
//     return (
//       <TouchableOpacity
//         title="Pick an image from camera roll"
//         onPress={() => setImage(null)}
//       >
//         <View style={{ backgroundColor: "#fff", borderRadius: 100 }}>
//           <Feather name="x-circle" size={24} color="#E8E8E8" />
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const imgAddBtn = (image) => {
//     return image ? delleteImg() : addImg();
//   };

//   return (
//     <TouchableWithoutFeedback onPress={keyboardHide}>
//       <View
//         style={{
//           ...styles.container,
//         }}
//         onLayout={onLayoutRootView}
//       >
//         <ImageBackground
//           style={styles.image}
//           source={require("../assets/photo_bg.png")}
//         >
//           <KeyboardAvoidingView
//             behavior={Platform.OS == "ios" ? "padding" : "height"}
//           >
//             <View
//               style={{
//                 ...styles.formWrapper,
//                 width: dimensions + 16 * 2,
//                 marginTop: dimensions > dimensionsHeigth ? 200 : 0,
//               }}
//             >
//               <View style={styles.imgWrapper}>
//                 {image && <Image source={{ uri: image }} style={styles.img} />}
//                 <View style={styles.addImgBtnWrapper}>{imgAddBtn(image)}</View>
//               </View>

//               <View
//                 style={{
//                   marginBottom: isShowKeyboard ? -100 : 100,
//                   width: dimensions,
//                 }}
//               >
//                 <View style={styles.header}>
//                   <Text style={styles.headerTitle}>Регистрация</Text>
//                 </View>
//                 <View>
//                   <TextInput
//                     style={focusInputStyle(loginFocus)}
//                     textAlign={"flex-start"}
//                     placeholder="Логин"
//                     onFocus={() => {
//                       setIsShowKeyboard(true), setLoginFocus(true);
//                     }}
//                     onBlur={() => {
//                       setIsShowKeyboard(false), setLoginFocus(false);
//                     }}
//                     value={state.login}
//                     onChangeText={(value) =>
//                       setState((prevState) => ({
//                         ...prevState,
//                         login: value,
//                       }))
//                     }
//                   />
//                 </View>

//                 <View style={{ marginTop: 16 }}>
//                   <TextInput
//                     style={focusInputStyle(emailFocus)}
//                     textAlign={"flex-start"}
//                     placeholder="Адрес электронной почты"
//                     onFocus={() => {
//                       setIsShowKeyboard(true), setEmailFocus(true);
//                     }}
//                     onBlur={() => {
//                       setIsShowKeyboard(false), setEmailFocus(false);
//                     }}
//                     value={state.email}
//                     onChangeText={(value) =>
//                       setState((prevState) => ({
//                         ...prevState,
//                         email: value,
//                       }))
//                     }
//                   />
//                 </View>
//                 <View style={{ marginTop: 16 }}>
//                   <TextInput
//                     style={focusInputStyle(passwordFocus)}
//                     textAlign={"flex-start"}
//                     placeholder="Пароль"
//                     secureTextEntry={isSecurePassword}
//                     onFocus={() => {
//                       setIsShowKeyboard(true), setPasswordFocus(true);
//                     }}
//                     onBlur={() => {
//                       setIsShowKeyboard(false), setPasswordFocus(false);
//                     }}
//                     value={state.password}
//                     onChangeText={(value) =>
//                       setState((prevState) => ({
//                         ...prevState,
//                         password: value,
//                       }))
//                     }
//                   />
//                   <TouchableOpacity
//                     activeOpacity={0.8}
//                     style={styles.passwordShowBtn}
//                     onPress={passwordShown}
//                   >
//                     <Text style={styles.registerLinkTitle}>
//                       {showPasswordBtn}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//                 <TouchableOpacity
//                   activeOpacity={0.8}
//                   style={styles.btn}
//                   onPress={formSubmit}
//                 >
//                   <Text style={styles.btnTitle}>Зарегистрироваться</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   activeOpacity={0.8}
//                   style={styles.registerLink}
//                   onPress={() => navigation.navigate("LoginScreen")}
//                 >
//                   <Text style={styles.registerLinkTitle}>
//                     Уже есть аккаунт? Войти
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </KeyboardAvoidingView>
//         </ImageBackground>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   image: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   avatarWrapper: {
//     width: 120,
//     height: 120,
//     backgroundColor: "#F6F6F6",
//     borderRadius: 16,
//     position: "absolute",
//     top: -60,
//   },
//   addAvatarBtn: {
//     position: "absolute",
//     bottom: 20,
//     right: -12,
//     borderWidth: 1,
//     borderColor: "#FF6C00",
//     borderRadius: 100,
//     width: 25,
//     height: 25,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   addAvatarBtnTitle: {
//     color: "#FF6C00",
//   },
//   formWrapper: {
//     backgroundColor: "#fff",
//     alignItems: "center",
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//   },

//   input: {
//     fontFamily: "Roboto-Regular",

//     color: "#BDBDBD",
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: "#E8E8E8",
//     height: 50,
//     borderRadius: 8,
//     backgroundColor: "#F6F6F6",
//     padding: 16,
//     color: "#212121",
//   },
//   inputFocus: { backgroundColor: "#fff", borderColor: "#FF6C00" },
//   btn: {
//     borderRadius: 100,
//     borderWidth: 1,
//     height: 51,
//     marginTop: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FF6C00",
//     borderColor: "transparent",
//     paddingVertical: 16,
//     paddingHorizontal: 32,
//   },
//   btnTitle: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontFamily: "Roboto-Regular",
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 32,
//     marginTop: 92,
//   },
//   headerTitle: {
//     fontFamily: "Roboto-Medium",
//     fontSize: 30,
//     color: "#212121",
//   },
//   registerLink: {
//     alignItems: "center",
//     marginTop: 16,
//   },
//   registerLinkTitle: {
//     fontFamily: "Roboto-Regular",
//     fontSize: 16,
//     color: "#1B4371",
//     alignItems: "center",
//   },
//   passwordShowBtn: {
//     position: "absolute",
//     top: 16,
//     right: 16,
//   },
//   imgWrapper: {
//     alignItems: "center",
//     backgroundColor: "#F6F6F6",
//     height: 120,
//     width: 120,
//     borderRadius: 8,
//     borderColor: "#E8E8E8",
//     marginTop: -60,
//   },
//   img: { resizeMode: "cover", height: 120, width: 120, borderRadius: 8 },
//   addImgBtnWrapper: {
//     position: "absolute",
//     bottom: 14,
//     right: -12,
//   },
// });
