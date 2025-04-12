import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import CommonButton from "../../components/common_button";
import styles from "@/style";
import { LoginUser } from "@/services/authentication_service";
import { Link } from "expo-router";

interface LoginRequestBody {
  email: string;
  password: string;
}

const Login = () => {
  const [loginReq, setLoginReq] = useState<LoginRequestBody>({
    email: "",
    password: "",
  });
  const [responseMessage, setResponseMessge] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof LoginRequestBody, value: string) => {
    setLoginReq((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const loginUser = async () => {
    setLoading(true);
    try {
      const resp = await LoginUser(loginReq);

      if (resp.jwtToken) {
        Alert.alert("Success", resp.message);
      } else {
        Alert.alert("Login Failed", resp.message);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TextInput
        style={styles.textinput}
        placeholder="Enter Email"
        onChangeText={(text) => {
          handleInputChange("email", text);
        }}
      />
      <TextInput
        style={styles.textinput}
        placeholder="Enter Password"
        onChangeText={(text) => {
          handleInputChange("password", text);
        }}
      />
      <View style={{ flexDirection: "column", alignItems: "center" ,gap : 10}}>
        <CommonButton title={"LOGIN"} onPress={loginUser} loading={loading} />
        <Text>Don't have an account ? <Link href= "/signup" style={{color : "blue"}}>Signup</Link></Text>
      </View> 
    </View>
  );
};

export default Login;
