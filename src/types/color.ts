export interface ColorData {
  id: string;
  className: string;
  name: string;
  hanja: string;
  info: string;
}


// 새로 추가된 타입
export interface ColorShade {
  no: "main" | number;

  rgb: {
    r: number;
    g: number;
    b: number;
  };

  cmyk: {
    c: number;
    m: number;
    y: number;
    k: number;
  };

  hex: string;
}

export interface TraditionalColor {
  id: number;

  name: string;

  group: ColorGroup;

  shades: ColorShade[];
}

export type ColorGroup =
  | "red"
  | "blue"
  | "yellow"
  | "white"
  | "black";