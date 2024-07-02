import { selector } from "recoil";
import { controlsState } from "../atoms/control";

export const controlsStateSelector = selector({
  key: "controlsStateSelector",
  get: ({ get }) => {
    return get(controlsState);
  },
});

export const audioControlStateSelector = selector({
  key: "audioControlState",
  get: ({ get }) => {
    let controls = get(controlsState);
    return controls.audio;
  },
});

export const videoControlStateSelector = selector({
    key: "videoControlState",
    get: ({ get }) => {
      let controls = get(controlsState);
      return controls.video;
    },
  });
