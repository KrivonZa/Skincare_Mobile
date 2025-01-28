import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Animated,
  Dimensions,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

export function Login() {
  const translateY = useRef(new Animated.Value(height)).current;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(translateY, {
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewPrimaryImage}>
        <Image
          style={styles.primaryImage}
          source={require("../../../assets/Skincare-Logo-Pink.png")}
        />
      </View>
      <Animated.View
        style={[styles.formLogin, { transform: [{ translateY }] }]}
      >
        <Text style={styles.title}>Đăng nhập</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#a1a1a1"
          keyboardType="email-address"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.input,
              { flex: 1, marginBottom: 0 },
            ]}
            placeholder="Mật khẩu"
            placeholderTextColor="#a1a1a1"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="#a1a1a1"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => navigation.navigate("ForgotPass")}>
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleLoginButton}>
          <Ionicons name="logo-google" size={20} color="#fff" />
          <Text style={styles.googleLoginText}>Đăng nhập bằng Google</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.registerLink}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff909a",
    flex: 1,
  },
  viewPrimaryImage: {
    paddingVertical: 20,
    alignItems: "center",
  },
  primaryImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 2,
    resizeMode: "contain",
    alignSelf: "center",
  },
  formLogin: {
    backgroundColor: "white",
    height: (2 * height) / 3,
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: "absolute",
    bottom: 0,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: "#333",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingRight: 15,
    marginBottom: 15,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#ff6f71",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#ff6f71",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  googleLoginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4285F4",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  googleLoginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    color: "#333",
  },
  registerLink: {
    color: "#ff6f71",
    fontWeight: "bold",
  },
});
