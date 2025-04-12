import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import CommonButton from "../../components/common_button";
import styles from "@/style";
import { SignupUser } from "@/services/authentication_service";
import { useRouter } from "expo-router";

interface SingupRequestBody {
  userName: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [requestBody, setRequestBody] = useState<SingupRequestBody>({
    userName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const updateData = (key: keyof SingupRequestBody, value: string) => {
    setRequestBody((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const sendSignUpData = async () => {
    try {
      setLoading(true);
      const response = await SignupUser(requestBody);

      console.log(response);
      if (response.success == true) {
        Alert.alert("Success", response.message);
        router.replace("/");

        
      } else {
        Alert.alert("Signup failed", response.message);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert("error", error);
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TextInput
        style={styles.textinput}
        placeholder="Your Name"
        onChangeText={(value) => {
          updateData("userName", value);
        }}
      />
      <TextInput
        style={styles.textinput}
        placeholder="Enter Email"
        onChangeText={(value) => {
          updateData("email", value);
        }}
      />
      <TextInput
        style={styles.textinput}
        placeholder="Enter Password"
        onChangeText={(value) => {
          updateData("password", value);
        }}
      />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <CommonButton title={"SIGNUP"} onPress={sendSignUpData} loading = {loading} />
      </View>
    </View>
  );
};

export default Signup;
