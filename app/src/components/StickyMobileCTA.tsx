import { BookOnVallyButton } from "./BookOnVallyButton";

type Props = {
  priceFrom?: number;
};

export function StickyMobileCTA({ priceFrom = 425 }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0d1f1b]/95 p-3 md:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <p className="text-sm text-[#c7d7d3]">
          From <span className="font-semibold text-white">${priceFrom}</span>
        </p>
        <BookOnVallyButton placement="cta_click_valy_sticky_mobile" className="btn-primary flex-1 text-center" />
      </div>
    </div>
  );
}
