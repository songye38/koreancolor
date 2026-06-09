import { useEffect, useState } from "react";
import type { TraditionalColor } from "../types/color";
import { blueColors } from "../data/blue";
import { redColors } from "../data/red";
import { yellowColors } from "../data/yellow";

interface Layout {
    colSpan: number;
    rowSpan: number;
}

interface PatchData {
    color: TraditionalColor;
    shadeHex: string;
    layout: Layout;
}

const palettes = [
    blueColors,
    redColors,
    yellowColors,
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

function randomFrom<T>(array: T[]): T {
    return array[
        Math.floor(Math.random() * array.length)
    ];
}

/**
 * 🎯 한 작품 생성 핵심
 * - palette 선택 (청/적/황)
 * - base color 선택
 * - base.shades 사용
 */
function createRandomGrid(): {
    patches: PatchData[];
    base: TraditionalColor;
} {
    // 1. 계열 선택
    const palette = randomFrom(palettes);

    // 2. 대표 색 선택
    const base = randomFrom(palette);

    // 3. 패치 생성
    const patches = Array.from(
        { length: 80 },
        () => {
            const layout = randomFrom(LAYOUTS);

            const shade = randomFrom(
                base.shades
            );

            return {
                color: base,
                shadeHex: shade.hex,
                layout,
            };
        }
    );

    return { patches, base };
}

export default function JogakboGrid() {
    const [selectedColor, setSelectedColor] =
        useState<TraditionalColor | null>(null);

    const [baseColor, setBaseColor] =
        useState<TraditionalColor>(() =>
            randomFrom(blueColors)
        );

    const [patches, setPatches] =
        useState<PatchData[]>([]);

    /**
     * 최초 생성
     */
    useEffect(() => {
        const { patches, base } =
            createRandomGrid();
        setBaseColor(base);
        setPatches(patches);
    }, []);

    /**
     * 5초마다 일부 섞기 (작품 유지 + 살아있는 느낌)
     */
    useEffect(() => {
        const interval = setInterval(() => {
            setPatches((prev) => {
                const next = [...prev];

                const swapCount =
                    Math.floor(Math.random() * 3) +
                    2;

                for (let i = 0; i < swapCount; i++) {
                    const a = Math.floor(
                        Math.random() *
                            next.length
                    );

                    let b = Math.floor(
                        Math.random() *
                            next.length
                    );

                    while (a === b) {
                        b = Math.floor(
                            Math.random() *
                                next.length
                        );
                    }

                    [
                        next[a].layout,
                        next[b].layout,
                    ] = [
                        next[b].layout,
                        next[a].layout,
                    ];
                }

                return next;
            });
        }, 5000);

        return () =>
            clearInterval(interval);
    }, []);

    /**
     * 새로운 작품 생성
     */
    const regenerateGrid = () => {
        const { patches, base } =
            createRandomGrid();

        setBaseColor(base);
        setPatches(patches);
    };

    return (
        <>
            <div className="fixed top-6 right-6 z-50">
                <button
                    onClick={regenerateGrid}
                    className="
                        mt-16
                        px-4 py-2
                        bg-white
                        border
                        hover:shadow-md
                        transition-all
                    "
                >
                다른 색상
                </button>
            </div>

            {/* 🎯 배경 = 작품의 가장 밝은 색 */}
            <div
                className="
                    grid
                    grid-cols-20
                    auto-rows-[100px]
                    gap-[3px]
                    min-h-screen
                    p-[12px]
                "
                style={{
                    backgroundColor:
                        baseColor.shades[1].hex,
                }}
            >
                {patches.map(
                    (patch, index) => (
                        <div
                            key={index}
                            onClick={() =>
                                setSelectedColor(
                                    patch.color
                                )
                            }
                            style={{
                                gridColumn: `span ${patch.layout.colSpan}`,
                                gridRow: `span ${patch.layout.rowSpan}`,
                                backgroundColor:
                                    patch.shadeHex,
                            }}
                            className="
                                group
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
                                // rounded-[1px]
                            "
                        >
                            <div className="
                                absolute inset-0
                                opacity-10
                                bg-[radial-gradient(circle_at_center,white,transparent)]
                            " />

                            <div className="
                                absolute inset-0
                                bg-black/0
                                group-hover:bg-black/10
                                transition-colors
                                duration-300
                            " />

                            <div className="
                                opacity-0
                                translate-y-2
                                group-hover:opacity-100
                                group-hover:translate-y-0
                                transition-all
                                duration-300
                                z-10
                            ">
                                <span className="text-sm">
                                    {patch.color.name}
                                </span>
                            </div>
                        </div>
                    )
                )}
            </div>

            {selectedColor && (
                <div className="fixed inset-0 z-50 bg-[#f5f1e8] flex items-center justify-center">
                    <button
                        onClick={() =>
                            setSelectedColor(null)
                        }
                        className="absolute top-8 right-8 text-3xl mt-15"
                    >
                        ×
                    </button>

                    <div className="max-w-xl px-10">
                        <p className="uppercase tracking-[0.3em] text-gray-500 mb-4">
                            {selectedColor.group} color
                        </p>

                        <h2 className="text-5xl mb-6">
                            {selectedColor?.name}
                        </h2>
                    </div>
                </div>
            )}
        </>
    );
}