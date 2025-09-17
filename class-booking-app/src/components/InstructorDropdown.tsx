import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";

interface Props {
  instructors: string[];
  selected: string | null;
  onSelect: (instructor: string | null) => void;
}

export default function InstructorDropdown({
  instructors,
  selected,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleSelect = (instructor: string | null) => {
    onSelect(instructor);
    setOpen(false);
  };

  return (
    <View style={{ marginVertical: 10 }}>
      {/* Button */}
      <TouchableOpacity style={styles.dropdownBtn} onPress={() => setOpen(true)}>
        <Text style={styles.dropdownBtnText}>
          {selected ? `👨‍🏫 ${selected}` : "👨‍🏫 Select Instructor"}
        </Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={open} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Choose Instructor</Text>
            <FlatList
              data={instructors}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
              ListFooterComponent={
                <TouchableOpacity
                  style={[styles.option, { backgroundColor: "#eee" }]}
                  onPress={() => handleSelect(null)}
                >
                  <Text style={[styles.optionText, { color: "red" }]}>
                    ✦ Clear Selection
                  </Text>
                </TouchableOpacity>
              }
            />

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setOpen(false)}
            >
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownBtn: {
    backgroundColor: "#4dabf7",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
    elevation: 2,
  },
  dropdownBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 15,
  },
  closeBtn: {
    marginTop: 10,
    backgroundColor: "#ff6b6b",
    paddingVertical: 8,
    borderRadius: 8,
  },
  closeBtnText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
