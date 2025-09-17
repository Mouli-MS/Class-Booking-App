import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Class } from "../types";

interface Props {
  cls: Class;
  booked: boolean;
  onBook: () => void;
}

export default function ClassCard({ cls, booked, onBook }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{cls.name}</Text>
      <Text>{cls.level} · {cls.instructor} · {cls.center}</Text>
      <Button
        title={booked ? "Booked" : "Quick Book"}
        onPress={onBook}
        disabled={booked}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
});
