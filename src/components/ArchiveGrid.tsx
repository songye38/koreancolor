import { useEffect, useMemo, useState } from "react";
import type { TraditionalColor } from "../types/color";
import { blueColors } from "../data/blue";
import { redColors } from "../data/red";
import { yellowColors } from "../data/yellow";
import { whiteColors } from "../data/white";
import { blackColors } from "../data/black";
import ColorDetailPanel from "./ColorDetailPanel";

interface PatchData {
    color: TraditionalColor;
    shadeHex: string;
}

const colorMap: Record<string, TraditionalColor[]> = {
    blue: blueColors,
    red: redColors,
    yellow: yellowColors,
    white: whiteColors,
    black: blackColors,
};

const groups = [
    { key: "blue", label: "청색" },
    { key: "red", label: "적색" },
    { key: "yellow", label: "황색" },
    { key: "white", label: "백색" },
    { key: "black", label: "흑색" },
];

function getTextColor(hex: string) {
    // # 제거
    const c = hex.replace("#", "");

    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);

    // 밝기 계산 (가중치)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 120 ? "text-black" : "text-white/80";
}

function createArchiveGrid(palette: TraditionalColor[]): PatchData[] {
    return palette.flatMap((color) => {
        const mainShade = color.shades.find(
            (shade) => shade.no === "main"
        );

        if (!mainShade) return [];

        return [
            {
                color,
                shadeHex: mainShade.hex,
            },
        ];
    });
}


export default function ArchiveGrid() {
    const [activeGroup, setActiveGroup] =
        useState<string>("blue");

    const palette = useMemo(
        () => colorMap[activeGroup],
        [activeGroup]
    );

    const [items, setItems] = useState<PatchData[]>(
        () => createArchiveGrid(colorMap.blue)
    );

    const [selectedColor, setSelectedColor] = useState<TraditionalColor | null>(null);

    useEffect(() => {
        setItems(createArchiveGrid(palette));
    }, [palette]);

    return (
        <div className="min-h-screen">
            {/* HEADER / TABS */}
            <div className="sticky top-0 z-50 mt-4">
                <div className="flex justify-center gap-3 p-4">
                    {groups.map((g) => (
                        <button
                            key={g.key}
                            onClick={() => setActiveGroup(g.key)}
                            className="relative px-3 py-1 text-[20px] transition"
                        >
                            {/* 선택된 경우 점만 표시 */}
                            {activeGroup === g.key && (
                                <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black" />
                            )}

                            {g.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ARCHIVE GRID */}
            <div className="grid grid-cols-4 gap-4 p-6">
                {items.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedColor(item.color)}
                        className="
                h-[240px]
                rounded-sm
                flex
                items-end
                p-4
                transition-all
                duration-300
                hover:scale-[1.02]
                cursor-pointer
            "
                        style={{
                            backgroundColor: item.shadeHex,
                        }}
                    >
                        <div
                            className={`text-[4vw] font-[Diphylleia] ${getTextColor(item.shadeHex)}`}
                        >
                            {item.color.name}
                        </div>
                    </div>
                ))}
            </div>
            {selectedColor && (
                <div className="fixed bottom-0 left-0 w-full bg-white z-50 shadow-2xl overflow-y-auto pt-5">
                    {/* 닫기 버튼 */}
                    <button
                        onClick={() => setSelectedColor(null)}
                        className="absolute top-4 right-4 text-xl"
                    >
                        ✕
                    </button>

                    <ColorDetailPanel color={selectedColor} />
                </div>
            )}
        </div>
    );
}