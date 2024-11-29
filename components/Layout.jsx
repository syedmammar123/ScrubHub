import { move } from "react-native-redash";

export const reorder = (input, from, to) => {
  "worklet";
  const offsets = input
    .filter((offset) => offset.order.value !== -1)
    .sort((a, b) => (a.order.value > b.order.value ? 1 : -1));
  const newOffset = move(offsets, from, to);
  newOffset.map((offset, index) => (offset.order.value = index));
};

export const remove = (input, index) => {
  "worklet";
  const offsets = input
    .filter((_, i) => i !== index)
    .filter((offset) => offset.order.value !== -1)
    .sort((a, b) => (a.order.value > b.order.value ? 1 : -1));
  offsets.map((offset, i) => (offset.order.value = i));
};

export const lastOrder = (input) => {
  "worklet";
  return input.filter((offset) => offset.order.value !== -1).length;
};

export const calculateLayout = (input, containerWidth) => {
  "worklet";
  const offsets = input
    .filter((offset) => offset.order.value !== -1)
    .sort((a, b) => (a.order.value > b.order.value ? 1 : -1));
  if (offsets.length === 0) {
    return;
  }
  let height = offsets[0].height.value;
  let lineNumber = 0;
  let lineBreak = 0;

  offsets.forEach((offset, index) => {
    const total = offsets
      .slice(lineBreak, index)
      .reduce((acc, o) => acc + o.width.value, 0);
    if (total + offset.width.value > containerWidth) {
      lineNumber += 1;
      lineBreak = index;
      offset.x.value = 0;
    } else {
      offset.x.value = total;
    }
    offset.y.value = lineNumber * height;
  });
};
