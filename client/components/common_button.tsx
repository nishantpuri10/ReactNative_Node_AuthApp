import { ActivityIndicator, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import styles from "@/style";

interface MyButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

const CommonButton: React.FC<MyButtonProps> = ({
  title,
  onPress,
  loading = false,
}) => {
  return (
    !loading ?
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.button, { flexDirection: "row", alignItems: "center", justifyContent: "center" }]} // Ensures alignment
      onPress={onPress}
      disabled={loading}
    >
       <Text style={{ color: "#fff", fontSize: 16 }}>{title}</Text>
    </TouchableOpacity>
    :<ActivityIndicator color="red" />
  );
};

export default CommonButton;
