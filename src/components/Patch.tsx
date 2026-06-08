import type { ColorData } from "../types/color";


interface PatchProps {
  color: ColorData;
  onClick: () => void;
}

export default function Patch({ color, onClick }: PatchProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative
        overflow-hidden
        cursor-pointer
        p-6
        flex
        items-end
        transition-all
        duration-500
        hover:scale-[1.02]
        hover:z-10
        ${color.className}
      `}
    >
      <div className="absolute inset-0 opacity-10 bg-[url('/paper-texture.png')]" />

      <div className="opacity-0 hover:opacity-100 transition-opacity z-10">
        <span className="block text-[10px] uppercase opacity-60">
          {color.info}
        </span>

        <div className="flex items-center gap-2">
          <span className="text-2xl">{color.hanja}</span>
          <span>{color.name}</span>
        </div>
      </div>
    </div>
  );
}