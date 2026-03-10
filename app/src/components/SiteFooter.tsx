import { BookOnVallyButton } from "./BookOnVallyButton";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0d1f1b] px-4 py-10 text-[#c7d7d3]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-[#ecf4f2]">Castcadia Guided Fishing</p>
          <p className="text-sm">Coeur d&apos;Alene + Pacific Northwest waters</p>
        </div>
        <BookOnVallyButton placement="cta_click_valy_header" />
      </div>
    </footer>
  );
}
