import { useEffect, useState } from "react";

interface ColorData {
    id: string;
    className: string;
    name: string;
    hanja: string;
    info: string;
}

interface Layout {
    colSpan: number;
    rowSpan: number;
}

interface PatchData {
    color: ColorData;
    layout: Layout;
}

const COLORS: ColorData[] = [
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
        info: "Balance",
    },
];

const LAYOUTS: Layout[] = [
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 2 },
    { colSpan: 2, rowSpan: 1 },
    { colSpan: 2, rowSpan: 2 },
    { colSpan: 2, rowSpan: 3 },
    { colSpan: 3, rowSpan: 1 },
    { colSpan: 3, rowSpan: 2 },
];

// function shuffle<T>(array: T[]): T[] {
//     const arr = [...array];

//     for (let i = arr.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));

//         [arr[i], arr[j]] = [arr[j], arr[i]];
//     }

//     return arr;
// }

// function randomColor(): ColorData {
//     return COLORS[Math.floor(Math.random() * COLORS.length)];
// }

function createRandomGrid(): PatchData[] {
    return Array.from({ length: 80 }, () => ({
        layout:
            LAYOUTS[
                Math.floor(Math.random() * LAYOUTS.length)
            ],
        color:
            COLORS[
                Math.floor(Math.random() * COLORS.length)
            ],
    }));
}

export default function JogakboGrid() {
    const [patches, setPatches] = useState<PatchData[]>(
        () => createRandomGrid()
    );

    const [selectedColor, setSelectedColor] =
        useState<ColorData | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setPatches((prev) => {
                const next = [...prev];

                const swapCount =
                    Math.floor(Math.random() * 3) + 2;

                for (let i = 0; i < swapCount; i++) {
                    const a = Math.floor(
                        Math.random() * next.length
                    );

                    let b = Math.floor(
                        Math.random() * next.length
                    );

                    while (a === b) {
                        b = Math.floor(
                            Math.random() * next.length
                        );
                    }

                    [next[a].color, next[b].color] = [
                        next[b].color,
                        next[a].color,
                    ];

                    [next[a].layout, next[b].layout] = [
                        next[b].layout,
                        next[a].layout,
                    ];
                }

                return [...next];
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const regenerateGrid = () => {
        setPatches(createRandomGrid());
    };

    return (
        <>
            <div className="fixed top-6 right-6 z-50">
                <button
                    onClick={regenerateGrid}
                    className="
                        px-4 py-2
                        bg-white
                        border
                        shadow-sm
                        hover:shadow-md
                        transition-all
                    "
                >
                    Regenerate
                </button>
            </div>

            <div
                className="
                    grid
                    grid-cols-16
                    auto-rows-[35px]
                    gap-[1px]
                    bg-neutral-300
                    min-h-screen
                    p-[1px]
                "
            >
                {patches.map((patch, index) => (
                    <div
                        key={index}
                        onClick={() =>
                            setSelectedColor(patch.color)
                        }
                        style={{
                            gridColumn: `span ${patch.layout.colSpan}`,
                            gridRow: `span ${patch.layout.rowSpan}`,
                        }}
                        className={`
                            group
                            ${patch.color.className}
                            relative
                            overflow-hidden
                            cursor-pointer
                            p-5
                            flex
                            items-end
                            transition-all
                            duration-500
                            hover:scale-[1.02]
                            hover:z-20
                        `}
                    >
                        <div
                            className="
                                absolute
                                inset-0
                                opacity-10
                                bg-[radial-gradient(circle_at_center,white,transparent)]
                            "
                        />

                        <div
                            className="
                                absolute
                                inset-0
                                bg-black/0
                                group-hover:bg-black/10
                                transition-colors
                                duration-300
                            "
                        />

                        <div
                            className="
                                opacity-0
                                translate-y-2
                                group-hover:opacity-100
                                group-hover:translate-y-0
                                transition-all
                                duration-300
                                z-10
                            "
                        >
                            <p className="text-[10px] uppercase opacity-70">
                                {patch.color.info}
                            </p>

                            <div className="flex items-center gap-2">
                                <span className="text-3xl">
                                    {patch.color.hanja}
                                </span>

                                <span className="text-sm">
                                    {patch.color.name}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedColor && (
                <div className="fixed inset-0 z-50 bg-[#fcf9f1] flex items-center justify-center">
                    <button
                        onClick={() =>
                            setSelectedColor(null)
                        }
                        className="absolute top-8 right-8 text-3xl"
                    >
                        ×
                    </button>

                    <div className="max-w-xl px-10">
                        <p className="uppercase tracking-[0.3em] text-gray-500 mb-4">
                            OBS-01
                        </p>

                        <h2 className="text-5xl mb-6">
                            {selectedColor.name}
                        </h2>

                        <div className="text-8xl mb-6">
                            {selectedColor.hanja}
                        </div>

                        <p className="text-lg text-gray-600">
                            {selectedColor.info}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}