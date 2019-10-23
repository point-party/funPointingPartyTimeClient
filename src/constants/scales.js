export const SIMPLE = 'SIMPLE';
export const FIBONACCI = 'FIBONACCI';
export const T_SHIRT = 'T_SHIRT';

export const SCALES = {
  [SIMPLE]: {
    name: 'Simple (1, 2, 3)',
    values: ['0', '1', '2', '3'],
  },
  [FIBONACCI]: {
    name: 'Modified Fibonacci (1, 2, 3, 5 ... 100)',
    values: ['0', '1', '2', '3', '5', '8', '13', '20', '40', '100'],
  },
  [T_SHIRT]: {
    name: 'T-Shirt Sizes (XXS, XS ... XXL)',
    values: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
};
