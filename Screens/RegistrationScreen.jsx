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
  const [dimensionsHeight, setDimensionsHeight] = useState(
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
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View
              style={{
                ...styles.formWrapper,

                paddingBottom: dimensionsWidth > dimensionsHeight ? 0 : 78,
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
                  }}
                >
                  <TouchableOpacity
                    style={{
                      zIndex: 20,
                      position: "absolute",
                      right: -12.5,
                      bottom: 14,
                    }}
                    onPress={onAddImage}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        width: 25,
                        height: 25,
                      }}
                    >
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
                  marginBottom: isShowKeyboard ? -175 : 0,
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
  form: {},
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
