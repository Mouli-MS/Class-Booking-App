import { useState } from "react";
import { Class } from "../types";

export function useBooking() {
  const [bookings, setBookings] = useState<{ [key: string]: boolean }>({});
  const [lastBooking, setLastBooking] = useState<Class | null>(null);

  const bookClass = async (cls: Class): Promise<boolean> => {
    // Optimistic update
    setBookings((prev) => ({ ...prev, [cls.id]: true }));
    setLastBooking(cls);

    // Simulate API delay
    await new Promise((res) => setTimeout(res, 500));
 
   
    const isSuccess = Math.random() > 0.15;   // 15% failure chance
     
    //const isSuccess = false; //false - to check failure case
    if (!isSuccess) {
      setBookings((prev) => {
        const copy = { ...prev };
        delete copy[cls.id];
        return copy;
      });
      setLastBooking(null);
      return false;
    }
    return true;
  };

  const undoBooking = () => {
    if (lastBooking) {
      setBookings((prev) => {
        const copy = { ...prev };
        delete copy[lastBooking.id];
        return copy;
      });
      setLastBooking(null);
    }
  };

  return { bookings, bookClass, undoBooking, lastBooking };
}
