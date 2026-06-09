import type { TraditionalColor } from "../types/color";
import toast from "react-hot-toast";

function getTextColor(hex: string) {
    const c = hex.replace("#", "");

    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 120 ? "text-black" : "text-white/80";
}

export default function ColorDetailPanel({
    color,
}: {
    color: TraditionalColor | null;
}) {
    if (!color) return null;


    const copyHex = (hex: string) => {
        navigator.clipboard.writeText(hex);
        toast.success(`복사 성공! ${hex}`, {
            style: {
                background: "#111",
                color: "#fff",
                fontSize: "14px",
                fontFamily: "Pretendard",
            },
        });
    };

    return (
        <div className="px-6 pb-10">
            {/* TITLE */}
            <h2 className="text-3xl mb-6 font-[Diphylleia]">
                {color.name}
            </h2>
            <span
                className={"block mb-6 text-[1.1rem] opacity-70 font-[Pretendard]"}
            >
                각 컬러칩을 클릭하면 HEX 코드가 복사됩니다
            </span>

            {/* SHADES GRID */}
            <div className="grid grid-cols-9 gap-2">
                {color.shades.map((shade) => (
                    <div
                        key={shade.no}
                        onClick={() => copyHex(shade.hex)}
                        className="
                            cursor-pointer
                            p-3
                            h-[120px]
                            flex
                            items-end
                            text-[16px]
                            transition-all
                            duration-300
                            hover:scale-[1.03]
                            rounded-sm
                        "
                        style={{
                            backgroundColor: shade.hex,
                        }}
                    >
                        <span
                            className={`${getTextColor(
                                shade.hex
                            )}`}
                        >
                            {shade.hex}
                        </span>

                    </div>
                ))}
            </div>
        </div>
    );
}