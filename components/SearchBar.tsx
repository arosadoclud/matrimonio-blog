"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="block">
      <span className="sr-only">Buscar artículos</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar por tema, oración, perdón..."
        className="w-full rounded-full border border-[#713f50]/15 bg-white px-5 py-3 text-sm outline-none transition focus:border-[#86604f] focus:ring-4 focus:ring-[#86604f]/15"
      />
    </label>
  );
}
