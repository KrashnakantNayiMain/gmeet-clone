import { atom } from "recoil";

export const controlsState = atom({
  key: "controlsState",
  default: {
    audio : true,
    video : true
  },
});