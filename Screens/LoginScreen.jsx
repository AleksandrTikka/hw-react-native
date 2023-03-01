import { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [state, setState] = useState(initialState);
  const [isShowkeyboard, setIsShowKeyboard] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const { width, height } = useWindowDimensions();
  const dimensions = width - 16 * 2;

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
    console.log(state);
    setState(initialState);
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

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.background}
          resizeMode="cover"
          source={require("../assets/photo_bg.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.formWrapper,
                paddingBottom: dimensions > height ? 0 : 144,
              }}
            >
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>Войти</Text>
              </View>

              <View
                style={{
                  ...styles.form,
                  width: dimensions,
                  // marginBottom: isShowkeyboard ? -105 : 144,
                  marginBottom: isShowkeyboard ? -100 : 0,
                }}
              >
                <View>
                  <TextInput
                    style={inputStyle(isEmailFocus)}
                    autoCorrect={false}
                    autoComplete={"email"}
                    input={state.email}
                    onFocus={onEmailFocus}
                    onBlur={onEmailBlur}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                    placeholder="Адрес электронной почты"
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
                  <Text style={styles.btnTitle}>Войти</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} style={styles.link}>
                  <Text style={styles.linkText}>
                    Нет аккаунта? Зарегистрироваться
                  </Text>
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
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formWrapper: {
    alignItems: "center",

    backgroundColor: "#fff",
    marginHorizontal: 0,

    paddingTop: 32,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 25,
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
