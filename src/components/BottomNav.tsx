"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      <Link href="/" className={`nav-item ${pathname === "/" ? "active" : ""}`}>
        Home
      </Link>
      <Link
        href="/about"
        className={`nav-item ${pathname === "/about" ? "active" : ""}`}
      >
        About
      </Link>
    </nav>
  );
}
