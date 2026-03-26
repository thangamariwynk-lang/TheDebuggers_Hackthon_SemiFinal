import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather as Icon } from "@expo/vector-icons";
import { useApp } from "./context/AppContext";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Signup() {
    const router = useRouter();
    const { signup, toggleTheme, theme } = useApp();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = () => {
        if (!username || !email || !password || !confirmPassword) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        signup({ username, email });
        router.push("/home");
    };

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: theme === "light" ? "#0a0a0a" : "#f5f5f5" },
            ]}
        >
            {/* Theme Toggle */}
            <TouchableOpacity style={styles.themeBtn} activeOpacity={0.7} onPress={toggleTheme}>
                <Icon
                    name={theme === "light" ? "sun" : "moon"}
                    size={20}
                    color={theme === "light" ? "yellow" : "blue"}
                />
            </TouchableOpacity>

            <Animated.View
                entering={FadeInDown}
                style={[
                    styles.card,
                    {
                        backgroundColor: theme === "light" ? "#141414" : "#ffffff",
                    },
                ]}
            >
                {/* Icon */}
                <View style={styles.iconBox}>
                    <Icon name="user-plus" size={30} color="#fff" />
                </View>

                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>
                    Join CallGuard to stay protected
                </Text>

                {/* Username */}
                <View style={styles.inputBox}>
                    <Icon name="user" size={18} color="#888" />
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#888"
                        style={styles.input}
                        onChangeText={setUsername}
                    />
                </View>

                {/* Email */}
                <View style={styles.inputBox}>
                    <Icon name="mail" size={18} color="#888" />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#888"
                        style={styles.input}
                        onChangeText={setEmail}
                    />
                </View>

                {/* Password */}
                <View style={styles.inputBox}>
                    <Icon name="lock" size={18} color="#888" />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#888"
                        secureTextEntry
                        style={styles.input}
                        onChangeText={setPassword}
                    />
                </View>

                {/* Confirm Password */}
                <View style={styles.inputBox}>
                    <Icon name="lock" size={18} color="#888" />
                    <TextInput
                        placeholder="Confirm Password"
                        placeholderTextColor="#888"
                        secureTextEntry
                        style={styles.input}
                        onChangeText={setConfirmPassword}
                    />
                </View>

                {/* Button */}
                <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                {/* Navigate */}
                <Text style={styles.footerText}>
                    Already have an account?{" "}
                    <Text style={styles.link} onPress={() => router.push("/login")}>
                        Sign In
                    </Text>
                </Text>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    themeBtn: {
        position: "absolute",
        top: 40,
        right: 20,
        padding: 10,
    },
    card: {
        backgroundColor: "#141414",
        padding: 25,
        borderRadius: 20,
    },
    iconBox: {
        width: 70,
        height: 70,
        backgroundColor: "#F27D26",
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
    subtitle: {
        color: "#aaa",
        textAlign: "center",
        marginBottom: 20,
    },
    inputBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0a0a0a",
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        color: "#fff",
        padding: 12,
        marginLeft: 8,
    },
    button: {
        backgroundColor: "#F27D26",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    footerText: {
        textAlign: "center",
        marginTop: 20,
        color: "#aaa",
    },
    link: {
        color: "#F27D26",
        fontWeight: "bold",
    },
});