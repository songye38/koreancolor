import type { ColorData } from "../types/color";


interface Props {
  color: ColorData | null;
  onClose: () => void;
}

export default function CompassModal({
  color,
  onClose,
}: Props) {
  if (!color) return null;

  return (
    <div className="fixed inset-0 bg-[#fcf9f1] z-50 flex items-center justify-center">
      <button
        className="absolute top-10 right-10"
        onClick={onClose}
      >
        CLOSE
      </button>

      <div className="max-w-4xl p-10">
        <h2 className="text-5xl mb-4">
          {color.name} Archive
        </h2>

        <p className="text-lg opacity-70">
          {color.info}
        </p>
      </div>
    </div>
  );
}