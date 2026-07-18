import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <header>
        <div>
          <span className="eyebrow">Prototype 0.1</span>
          <h1>Business Research Mentor</h1>
        </div>
        <nav aria-label="Prototype navigation">
          <NavLink to="/welcome">Home</NavLink>
          <NavLink to="/guided">Journey</NavLink>
          <NavLink to="/supervisor">Supervisor</NavLink>
          <NavLink to="/record">Record</NavLink>
        </nav>
      </header>
      <main>{children}</main>
      <footer>BP-001 · Choosing a Research Topic · Local-first prototype</footer>
    </div>
  );
}
