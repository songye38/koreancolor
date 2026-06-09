import { useState } from "react";
import { blueColors } from "../data/blue";
import { redColors } from "../data/red";
import { yellowColors } from "../data/yellow";
import { whiteColors } from "../data/white";
import { blackColors } from "../data/black";
import type { TraditionalColor } from "../types/color";
import ColorDetailPanel from "./ColorDetailPanel";

const allColors = [
    ...blueColors,
    ...redColors,
    ...yellowColors,
    ...whiteColors,
    ...blackColors,
];

// hex → rgb
function hexToRgb(hex: string) {
    const c = hex.replace("#", "");
    return {
        r: parseInt(c.substring(0, 2), 16),
        g: parseInt(c.substring(2, 4), 16),
        b: parseInt(c.substring(4, 6), 16),
    };
}

// 색 거리 계산
function colorDistance(a: string, b: string) {
    const c1 = hexToRgb(a);
    const c2 = hexToRgb(b);

    return (
        (c1.r - c2.r) ** 2 +
        (c1.g - c2.g) ** 2 +
        (c1.b - c2.b) ** 2
    );
}

// 가장 가까운 전통색 찾기
function findClosestColor(hex: string, colors: TraditionalColor[]) {
    let closest: TraditionalColor | null = null;
    let min = Infinity;

    for (const color of colors) {
        const main = color.shades.find(
            (s) => s.no === "main"
        );

        if (!main) continue;

        const d = colorDistance(hex, main.hex);

        if (d < min) {
            min = d;
            closest = color;
        }
    }

    return closest;
}

export default function Search() {
    const [color, setColor] = useState("#000000");
    const [result, setResult] = useState<TraditionalColor | null>(null);

    const handleChange = (hex: string) => {
        setColor(hex);

        const match = findClosestColor(hex, allColors);
        setResult(match);
    };

    return (
        <div className="min-h-screen p-10">
            {/* 컬러픽커 */}
            <input
                type="color"
                value={color}
                onChange={(e) => handleChange(e.target.value)}
                className="w-20 h-20 cursor-pointer"
            />
            <span className="ml-4 text-lg font-[Pretendard]">
                색상을 선택하면 가장 가까운 전통색이 아래에 표시됩니다
            </span>

            {/* 선택된 색 미리보기 */}
            {/* <div
                className="w-full h-[120px] mt-6"
                style={{ backgroundColor: color }}
            /> */}

            {/* 결과 */}
            {/* {result && (
                <div className="mt-10">
                    <h2 className="text-2xl mb-4 font-[Diphylleia]">
                        가장 가까운 전통색
                    </h2>

                    <div
                        className="h-[200px] flex items-end p-6"
                        style={{
                            backgroundColor: result.shades.find(
                                (s) => s.no === "main"
                            )?.hex,
                        }}
                    >
                        <div className="text-white text-3xl font-[Diphylleia]">
                            {result.name}
                        </div>
                    </div>
                </div>
            )} */}

            {/* 🔥 하단 상세 패널 (result 기반) */}
            {result && (
                <div className="fixed bottom-0 left-0 w-full bg-white z-50 shadow-2xl overflow-y-auto pt-5">
                    {/* 닫기 버튼 */}
                    <button
                        onClick={() => setResult(null)}
                        className="absolute top-4 right-4 text-xl"
                    >
                        ✕
                    </button>

                    <ColorDetailPanel color={result} />
                </div>
            )}
        </div>
    );
}