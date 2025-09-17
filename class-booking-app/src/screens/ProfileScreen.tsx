import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const [name, setName] = useState("Ram");
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(name);

  const handleSave = () => {
    setName(tempName);
    setEditing(false);
  };

  return (
    <View style={styles.container}>
      {/* Card */}
      <View style={styles.card}>
        {/* Avatar */}
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/9.jpg" }}
          style={styles.avatar}
          resizeMode="cover"
        />

        {/* Name + Edit */}
        <View style={styles.nameRow}>
          {editing ? (
            <TextInput
              value={tempName}
              onChangeText={setTempName}
              style={styles.input}
              autoFocus
            />
          ) : (
            <Text style={styles.name}>{name}</Text>
          )}

          {!editing ? (
            <TouchableOpacity onPress={() => setEditing(true)}>
              <Ionicons name="pencil" size={20} color="#555" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          ) : (
            <View style={styles.editActions}>
              <TouchableOpacity onPress={handleSave}>
                <Ionicons name="checkmark" size={22} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditing(false)} style={{ marginLeft: 12 }}>
                <Ionicons name="close" size={22} color="red" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* User Info */}
        <View style={styles.infoBox}>
          <Text style={styles.info}>📞 Mobile: 9876543210</Text>
          <Text style={styles.info}>💳 Credits: 8</Text>
          <Text style={styles.info}>📍 City: Hyderabad</Text>
          <Text style={styles.info}>📅 Joined: Sept 2025</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20, backgroundColor: "#f2f2f2" },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // for Android shadow
  },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 16, borderWidth: 2, borderColor: "#ddd" },
  nameRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  name: { fontSize: 22, fontWeight: "bold", color: "#333" },
  input: { borderBottomWidth: 1, borderColor: "#aaa", fontSize: 20, padding: 4, minWidth: 160, textAlign: "center" },
  editActions: { flexDirection: "row", marginLeft: 10 },
  infoBox: { marginTop: 20, alignItems: "center" },
  info: { fontSize: 16, marginVertical: 4, color: "#444" },
});
