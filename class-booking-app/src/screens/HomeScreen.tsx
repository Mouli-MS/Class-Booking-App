import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { classes as mockClasses } from "../data/mockClasses";
import { Class } from "../types";
import ClassCard from "../components/ClassCard";
import FilterChips from "../components/FilterChips";
import InstructorDropdown from "../components/InstructorDropdown";
import { useBooking } from "../hooks/useBooking";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState<Class["level"] | null>(null);
  const [instructor, setInstructor] = useState<string | null>(null);
  const [data, setData] = useState<Class[]>([]);
  const { bookings, bookClass, undoBooking, lastBooking } = useBooking();

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockClasses);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const filtered = data.filter(
    (c) =>
      (!level || c.level === level) &&
      (!instructor || c.instructor === instructor)
  );

 const handleBook = async (cls: Class) => {
    const success = await bookClass(cls);
    if (!success) {
      ToastAndroid.show("Booking failed. Try again.", ToastAndroid.SHORT);
    } else {
      setSnackbarVisible(true);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* 🔹 Attractive Clear Filters Button at Top */}
      {(level || instructor) && (
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => {
            setLevel(null);
            setInstructor(null);
          }}
        >
          <Text style={styles.clearBtnText}>✦ Clear Filters</Text>
        </TouchableOpacity>
      )}

      {/* Filters */}
      <FilterChips selected={level} onSelect={setLevel} />
      <InstructorDropdown
        instructors={[...new Set(data.map((c) => c.instructor))]}
        selected={instructor}
        onSelect={setInstructor}
      />

      {/* List */}
      {filtered.length === 0 ? (
        <View style={{ padding: 20 }}>
          <Text>No classes match filters.</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ClassCard
              cls={item}
              booked={!!bookings[item.id]}
              onBook={() => handleBook(item)}
            />
          )}
        />
      )}

      {/* Snackbar for Undo */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={4000}
        action={{
          label: "UNDO",
          onPress: () => {
            undoBooking();
          },
        }}
      >
        {lastBooking
          ? `Booked "${lastBooking.name}".`
          : "Booking successful."}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  clearBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#ff6b6b",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 12,
    elevation: 2,  
  },
  clearBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
