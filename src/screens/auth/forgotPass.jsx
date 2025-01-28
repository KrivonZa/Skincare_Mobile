import {
    View,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Animated,
    Dimensions,
  } from "react-native";
  import { useState, useEffect, useRef } from "react";
  import { Ionicons } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  
  const { height } = Dimensions.get("window");
  
  export function ForgotPass() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const translateY = useRef(new Animated.Value(height)).current;
  
    useEffect(() => {
      Animated.timing(translateY, {
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, []);
  
    const handleEmailChange = (text) => {
      setEmail(text);
      // Kiểm tra định dạng email
      setEmailError(
        /.+@.+\..+/.test(text) ? "" : "Địa chỉ email không hợp lệ."
      );
    };
  
    const handleResetPassword = () => {
      // Kiểm tra email hợp lệ
      if (!emailError && email) {
        // Gửi yêu cầu reset mật khẩu
        console.log("Gửi yêu cầu reset mật khẩu cho email:", email);
        // Giả sử gửi email thành công, chuyển tới màn hình thông báo
        navigation.navigate("ResetSuccess");
      } else {
        setEmailError("Vui lòng nhập địa chỉ email hợp lệ.");
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.viewPrimaryImage}>
          <Ionicons name="lock-closed" size={80} color="#fff" />
        </View>
        <Animated.View
          style={[styles.formForgotPass, { transform: [{ translateY }] }]}
        >
          <Text style={styles.title}>Quên mật khẩu</Text>
  
          <TextInput
            style={[styles.input, emailError && { borderColor: "red" }]}
            placeholder="Nhập email của bạn"
            placeholderTextColor="#a1a1a1"
            value={email}
            onChangeText={handleEmailChange}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
  
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetPassword}
          >
            <Text style={styles.resetButtonText}>Gửi email</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>Trở lại</Text>
          </TouchableOpacity>
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
    formForgotPass: {
      backgroundColor: "white",
      height: (3 * height) / 4,
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
      borderWidth: 1,
      borderColor: "#ccc",
    },
    errorText: {
      color: "red",
      fontSize: 12,
      marginBottom: 15,
    },
    resetButton: {
      backgroundColor: "#ff6f71",
      borderRadius: 10,
      padding: 15,
      alignItems: "center",
      marginBottom: 15,
    },
    resetButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    backButton: {
      alignSelf: "center",
    },
    backText: {
      color: "#ff6f71",
      fontWeight: "bold",
    },
  });
  