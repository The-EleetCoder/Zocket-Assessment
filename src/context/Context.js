import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [caption, setCaption] = useState(
    "1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs"
  );
  const [cta, setCta] = useState("Shop Now");
  const [backgroundColor, setBackgroundColor] = useState("#0369A1");
  const [userImage, setUserImage] = useState(null);
  const [pickedColors, setPickedColors] = useState([]);

  const addPickedColor = (color) => {
    setPickedColors((prevColors) => {
      const newColors = [color, ...prevColors];
      if (newColors.length > 5) {
        newColors.pop();
      }
      return newColors;
    });
  };

  const value = {
    caption,
    setCaption,
    backgroundColor,
    setBackgroundColor,
    cta,
    setCta,
    userImage,
    setUserImage,
    pickedColors,
    addPickedColor
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
