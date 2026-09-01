import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

export function FilterSection({ title, children }: FilterSectionProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-t border-black/10 py-6 first:border-t-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="mb-3 flex w-full items-center justify-between"
      >
        <span className="font-satoshi text-xl font-medium">{title}</span>
        {open ? (
          <FaChevronUp size={10} className="text-black/50" />
        ) : (
          <FaChevronDown size={10} className="text-black/50" />
        )}
      </button>
      {open && children}
    </div>
  );
}