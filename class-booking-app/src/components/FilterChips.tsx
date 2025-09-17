import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ClassLevel } from "../types";

interface Props {
  selected: ClassLevel | null;
  onSelect: (level: ClassLevel | null) => void;
}

const levels: ClassLevel[] = ["Beginner", "Intermediate", "Advanced"];

export default function FilterChips({ selected, onSelect }: Props) {
  return (
    <View style={styles.row}>
      {levels.map((lvl) => (
        <TouchableOpacity
          key={lvl}
          style={[styles.chip, selected === lvl && styles.activeChip]}
          onPress={() => onSelect(selected === lvl ? null : lvl)}
        >
          <Text>{lvl}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", marginVertical: 10 },
  chip: {
    padding: 8,
    marginRight: 6,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: "#eee",
  },
  activeChip: {
    backgroundColor: "#cde",
  },
});
