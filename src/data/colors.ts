import type { ColorData } from "../types/color";


export const colors: ColorData[] = [
  {
    id: "black",
    className: "bg-[#1a1c1b] text-white",
    name: "Heuk (Black)",
    hanja: "黑",
    info: "North / Water / Winter",
  },
  {
    id: "red",
    className: "bg-[#9f3e47] text-white",
    name: "Jok (Red)",
    hanja: "赤",
    info: "South / Fire / Summer",
  },
  {
    id: "blue",
    className: "bg-[#2e5a88] text-white",
    name: "Cheong (Blue)",
    hanja: "靑",
    info: "East / Wood / Spring",
  },
  {
    id: "white",
    className: "bg-[#fcf9f1] text-black",
    name: "Baek (White)",
    hanja: "白",
    info: "West / Metal / Autumn",
  },
  {
    id: "yellow",
    className: "bg-[#d4af37] text-black",
    name: "Hwang (Yellow)",
    hanja: "黃",
    info: "Center / Earth / Seasons",
  },
  {
    id: "neutral",
    className: "bg-[#e5e2da] text-gray-700",
    name: "Neutral (Hanji)",
    hanja: "紙",
    info: "Empty Space / Balance",
  },
];