// 1. 오방색 에센스 팔레트 원천 데이터 정의
// interface ColorData {
//   id: string;
//   bgClass: string;
//   textClass: string;
//   name: string;
//   hanja: string;
//   info: string;
//   code: string;
//   desc: string;
// }

import { useEffect, useState } from "react";

// const colors: ColorData[] = [
//   { id: 'black', bgClass: 'bg-[#1a1c1b]', textClass: 'text-[#fcf9f1]', name: 'Heuk (Black)', hanja: '黑', info: 'North / Water / Winter', code: 'OBS-05', desc: '북방을 상징하는 숙연한 현색(玄色)으로 만물의 저장을 의미하며 궁궐 내 전각의 기둥이나 뒤안의 그늘진 기와선에 스며든 깊은 밤의 색감입니다.' },
//   { id: 'red', bgClass: 'bg-[#9f3e47]', textClass: 'text-[#fcf9f1]', name: 'Jok (Red)', hanja: '赤', info: 'South / Fire / Summer', code: 'OBS-01', desc: '남방을 지키는 주색(朱色)으로 태양의 강렬한 생명력과 벽사의 기운을 품고 있어 조선 왕실의 정복(正服)인 단령과 주칠 가구의 뼈대를 이룹니다.' },
//   { id: 'blue', bgClass: 'bg-[#2e5a88]', textClass: 'text-[#fcf9f1]', name: 'Cheong (Blue)', hanja: '靑', info: 'East / Wood / Spring', code: 'OBS-03', desc: '동방을 생동하는 청색으로 만물의 시작과 청춘의 에너지를 뜻하며 도화서 의궤 속 직물의 천연 쪽빛 염색 기법을 원형으로 복각했습니다.' },
//   { id: 'white', bgClass: 'bg-[#fcf9f1]', textClass: 'text-[#1a1c1b]', name: 'Baek (White)', hanja: '白', info: 'West / Metal / Autumn', code: 'OBS-02', desc: '서방을 기리는 소박한 백색으로 순결과 선비의 절개를 대변하며 조선백자의 투명하고 은은한 미색과 한지의 자연 섬유질 빛깔을 동시에 담아냅니다.' },
//   { id: 'yellow', bgClass: 'bg-[#d4af37]', textClass: 'text-[#1a1c1b]', name: 'Hwang (Yellow)', hanja: '黃', info: 'Center / Earth / Seasons', code: 'OBS-04', desc: '우주의 중심인 토(土)를 관장하는 황색으로 고귀함의 극치를 상징하며 고종 황제의 황룡포나 경복궁 근정전 천장의 어좌 장식에서 추출된 중앙의 빛입니다.' },
//   { id: 'neutral', bgClass: 'bg-[#e5e2da]', textClass: 'text-[#444845]', name: 'Neutral (Hanji)', hanja: '紙', info: 'Empty Space / Balance', code: 'OBS-00', desc: '오방의 원색들이 격렬하게 충돌하지 않도록 유기적으로 숨구멍을 틔워주는 담백한 중성색으로 모시와 한지의 스며드는 여백미를 연출합니다.' },
// ];

// 2. 피그마 시안 고유의 14개 비정형 조각 위치 고정틀 정의
interface PatchSlot {
  id: number;
  colClass: string;
  rowClass: string;
  currentColorId: string; // 실시간 변동될 색상 매핑 키
}

const initialLayouts: PatchSlot[] = [
  { id: 1, colClass: 'col-span-4', rowClass: 'row-span-3', currentColorId: 'red' },
  { id: 2, colClass: 'col-span-4', rowClass: 'row-span-2', currentColorId: 'black' },
  { id: 3, colClass: 'col-span-4', rowClass: 'row-span-2', currentColorId: 'red' },
  { id: 4, colClass: 'col-span-4', rowClass: 'row-span-2', currentColorId: 'neutral' },
  { id: 5, colClass: 'col-span-3', rowClass: 'row-span-4', currentColorId: 'black' },
  { id: 6, colClass: 'col-span-3', rowClass: 'row-span-3', currentColorId: 'black' },
  { id: 7, colClass: 'col-span-3', rowClass: 'row-span-4', currentColorId: 'yellow' },
  { id: 8, colClass: 'col-span-3', rowClass: 'row-span-3', currentColorId: 'neutral' },
  { id: 9, colClass: 'col-span-5', rowClass: 'row-span-3', currentColorId: 'blue' },
  { id: 10, colClass: 'col-span-4', rowClass: 'row-span-2', currentColorId: 'white' },
  { id: 11, colClass: 'col-span-3', rowClass: 'row-span-3', currentColorId: 'white' },
  { id: 12, colClass: 'col-span-3', rowClass: 'row-span-4', currentColorId: 'neutral' },
  { id: 13, colClass: 'col-span-5', rowClass: 'row-span-2', currentColorId: 'blue' },
  { id: 14, colClass: 'col-span-4', rowClass: 'row-span-3', currentColorId: 'yellow' },
];

export default function Main() {
  const [, setPatches] = useState<PatchSlot[]>(initialLayouts);

  // 3. 5초마다 조각보 원단 색상을 유기적으로 엮는 Weave 함수 구현
  useEffect(() => {
    const interval = setInterval(() => {
      setPatches((currentPatches) => {
        const nextPatches = [...currentPatches];
        
        // 두 쌍의 무작위 조각 색상을 교체
        for (let i = 0; i < 2; i++) {
          const idx1 = Math.floor(Math.random() * nextPatches.length);
          let idx2 = Math.floor(Math.random() * nextPatches.length);
          while (idx1 === idx2) idx2 = Math.floor(Math.random() * nextPatches.length);

          const tempColorId = nextPatches[idx1].currentColorId;
          nextPatches[idx1] = {
            ...nextPatches[idx1],
            currentColorId: nextPatches[idx2].currentColorId,
          };
          nextPatches[idx2] = {
            ...nextPatches[idx2],
            currentColorId: tempColorId,
          };
        }
        return nextPatches;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="font-body-lg text-[#1c1c17] bg-[#fcf9f1] min-h-screen w-full relative overflow-hidden select-none" style={{ cursor: 'crosshair' }}>
      
      {/* 한지 & 모시 고유 텍스처 레이어 레이아웃 */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.04]" 
        style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png')` }}
      />

      {/* 우측 레드 마감 실선 가이드 */}
      <div className="fixed right-0 top-0 w-[1px] h-full bg-[#9f3e47] z-40" />

      {/* 상단 네비게이션 헤더 */}
      <nav className="fixed top-0 left-0 w-full z-45 flex justify-between items-center px-10 h-24 bg-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="font-headline-lg text-xl font-bold tracking-tight text-[#1c1c17]">
            한국의 전통색 아카이브
          </h1>
        </div>
        <div className="hidden md:flex gap-12 pointer-events-auto font-label-caps text-sm text-[#5e5e5d] items-center">
          <a className="hover:text-[#9f3e47] transition-colors duration-300" href="#obangsaek">Obangsaek</a>
          <a className="hover:text-[#9f3e47] transition-colors duration-300" href="#collections">Collections</a>
          <a className="hover:text-[#9f3e47] transition-colors duration-300" href="#archive">Archive</a>
          <span className="material-symbols-outlined cursor-pointer hover:text-[#9f3e47] text-lg">contrast</span>
        </div>
      </nav>

      {/* 좌측 음양오행 종단 라벨 구역 */}
      <aside className="fixed left-0 top-0 h-full w-20 flex flex-col items-center justify-center gap-16 z-40 pointer-events-none">
        <div className="pointer-events-auto flex flex-col gap-14">
          <span className="font-label-caps text-xs text-[#444845] vertical-text opacity-40 hover:opacity-100 transition-opacity" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>North (Black)</span>
          <span className="font-label-caps text-xs text-[#9f3e47] font-bold vertical-text" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>South (Red)</span>
          <span className="font-label-caps text-xs text-[#444845] vertical-text opacity-40 hover:opacity-100 transition-opacity" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>East (Blue)</span>
          <span className="font-label-caps text-xs text-[#444845] vertical-text opacity-40 hover:opacity-100 transition-opacity" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>West (White)</span>
          <span className="font-label-caps text-xs text-[#444845] vertical-text opacity-40 hover:opacity-100 transition-opacity" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>Center (Yellow)</span>
        </div>
      </aside>

      {/* 고정 매트릭스 기반 조각보 본체 */}
      return (
        <div>  hello world </div>
        
      );
      



      {/* 내부 키프레임 애니메이션 주입용 인라인 스타일 */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ink-bleed { 0% { clip-path: circle(0% at 50% 50%); } 100% { clip-path: circle(150% at 50% 50%); } }
      `}</style>
    </div>
  );
}