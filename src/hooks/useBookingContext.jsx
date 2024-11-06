import { BookingContext } from "@/context/bookingContext"
import { useContext } from "react"


const useBookingContext=()=>{
  const context=useContext(BookingContext);
  if(!context)
    throw new Error('useExtensionContext must be used within an ExtensionProvider');

  return context;
}

export default useBookingContext;