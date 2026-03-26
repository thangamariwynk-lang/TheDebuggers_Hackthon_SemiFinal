import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useApp } from "./context/AppContext";

export default function Home() {
    const router = useRouter();
    const { user, logout, toggleTheme, theme, setCallType } = useApp();
    const [showProfile, setShowProfile] = useState(false);

    const bg = theme === "light" ? "#0a0a0a" : "#f5f5f5";
    const card = theme === "light" ? "#141414" : "#fff";
    const text = theme === "light" ? "#fff" : "#000";

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>

            {/* HEADER */}
            <View style={[styles.header, { backgroundColor: bg }]}>
                <View style={styles.logoBox}>
                    <Icon name="shield" size={20} color={theme === "dark" ? "#000000" : "#ffffff"} />
                    <Text
                        style={[
                            styles.logoText,
                            { color: theme === "dark" ? "#000000" : "#ffffff" },
                        ]}>ScamShield</Text>
                </View>

                <View style={styles.headerRight}>
                    {/* Theme */}
                    <TouchableOpacity onPress={toggleTheme}>
                        <Icon
                            name={theme === "light" ? "sun" : "moon"}
                            size={20}
                            color={text}
                        />
                    </TouchableOpacity>

                    {/* Profile */}
                    <TouchableOpacity onPress={() => setShowProfile(!showProfile)}>
                        <Icon name="user" size={24} color={text} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* PROFILE DROPDOWN */}
            {showProfile && (
                <View style={[styles.profileBox, { backgroundColor: card }]}>
                    <Text style={{ color: text, fontWeight: "bold" }}>
                        {user?.username}
                    </Text>
                    <Text style={{ color: "#aaa", marginBottom: 10 }}>
                        {user?.email}
                    </Text>

                    <TouchableOpacity onPress={() => {
                        logout();
                        router.replace("/login");
                    }}>
                        <Text style={{ color: "red", fontWeight: "bold" }}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* MAIN */}
            <View style={styles.main}>
                <Text style={[styles.title, { color: text }]}>
                    Hello, <Text style={{ color: "#F27D26" }}>{user?.username}</Text>
                </Text>

                <Text style={{ color: "#aaa", marginBottom: 20 }}>
                    Your communication is secured.
                </Text>

                {/* STATS */}
                <View style={styles.statsRow}>
                    <View style={[styles.card, { backgroundColor: card }]}>
                        <Text style={[styles.statValue, { color: "blue" }]}>1284</Text>
                        <Text style={styles.statLabel}>Total</Text>
                    </View>

                    <View style={[styles.card, { backgroundColor: card }]}>
                        <Text style={[styles.statValue, { color: "green" }]}>1152</Text>
                        <Text style={styles.statLabel}>Genuine</Text>
                    </View>

                    <View style={[styles.card, { backgroundColor: card }]}>
                        <Text style={[styles.statValue, { color: "red" }]}>132</Text>
                        <Text style={styles.statLabel}>Fake</Text>
                    </View>
                </View>

                {/* ACTION BUTTONS */}
                <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: card }]}
                    activeOpacity={0.7}
                    onPress={() => {
                        setCallType("all");
                        router.push("/calls");
                    }}
                >
                    <Text style={{ color: text }}>All Calls</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: card }]}
                    activeOpacity={0.7}
                    onPress={() => {
                        setCallType("genuine");
                        router.push("/calls");
                    }}
                >
                    <Text style={{ color: text }}>Genuine Calls</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: card }]}
                    activeOpacity={0.7}
                    onPress={() => {
                        setCallType("fake");
                        router.push("/calls");
                    }}
                >
                    <Text style={{ color: text }}>Fake / Spam</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
    },

    logoBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    logoText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },

    headerRight: {
        flexDirection: "row",
        gap: 15,
    },

    profileBox: {
        position: "absolute",
        top: 70,
        right: 20,
        padding: 15,
        borderRadius: 10,
        zIndex: 10,
    },

    main: {
        padding: 20,
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
    },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
    },

    card: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: "center",
    },

    statValue: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },

    statLabel: {
        color: "#aaa",
    },

    actionBtn: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
});