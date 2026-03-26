import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    FlatList,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useApp } from "./context/AppContext";

const MOCK_CALLS = [
    { id: "1", name: "John Doe", number: "+1 555 123", type: "genuine", time: "2 min ago", duration: "4:12" },
    { id: "2", name: "Spam Caller", number: "+1 999 000", type: "fake", time: "10 min ago", duration: "0:10" },
    { id: "3", name: "Office", number: "+1 222 333", type: "genuine", time: "1 hour ago", duration: "10:00" },
    { id: "4", name: "Unknown", number: "+1 888 777", type: "fake", time: "Yesterday", duration: "0:05" },
];

export default function Calls() {
    const router = useRouter();
    const { selectedCallType, toggleTheme, theme } = useApp();

    const bg = theme === "light" ? "#0a0a0a" : "#f5f5f5";
    const card = theme === "light" ? "#141414" : "#fff";
    const text = theme === "light" ? "#fff" : "#000";

    const filteredCalls = MOCK_CALLS.filter((call) => {
        if (selectedCallType === "all") return true;
        return call.type === selectedCallType;
    });

    const getTitle = () => {
        if (selectedCallType === "genuine") return "Genuine Calls";
        if (selectedCallType === "fake") return "Fake / Spam";
        return "All Calls";
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>

            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => router.replace("/home")}>
                    <Icon name="arrow-left" size={24} color={text} />
                </TouchableOpacity>

                <Text style={[styles.headerText, { color: text }]}>
                    {getTitle()}
                </Text>

                <TouchableOpacity onPress={toggleTheme} activeOpacity={0.7}>
                    <Icon
                        name={theme === "light" ? "sun" : "moon"}
                        size={20}
                        color={text}
                    />
                </TouchableOpacity>
            </View>

            {/* LIST */}
            <FlatList
                data={filteredCalls}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 15 }}
                renderItem={({ item }) => (
                    <View style={[styles.card, { backgroundColor: card }]}>

                        {/* LEFT */}
                        <View style={styles.left}>
                            <View
                                style={[
                                    styles.iconCircle,
                                    {
                                        backgroundColor:
                                            item.type === "genuine" ? "#0f5132" : "#5a1a1a",
                                    },
                                ]}
                            >
                                <Icon
                                    name={item.type === "genuine" ? "shield" : "alert-triangle"}
                                    size={18}
                                    color={item.type === "genuine" ? "green" : "red"}
                                />
                            </View>

                            <View>
                                <Text style={{ color: text, fontWeight: "bold" }}>
                                    {item.name}
                                </Text>
                                <Text style={{ color: "#aaa", fontSize: 12 }}>
                                    {item.number}
                                </Text>
                            </View>
                        </View>

                        {/* RIGHT */}
                        <View style={{ alignItems: "flex-end" }}>
                            <Text style={{ color: "#aaa", fontSize: 12 }}>
                                {item.time}
                            </Text>
                            <Text style={{ color: "#aaa", fontSize: 10 }}>
                                {item.duration}
                            </Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
    },

    headerText: {
        fontSize: 18,
        fontWeight: "bold",
    },

    card: {
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
});