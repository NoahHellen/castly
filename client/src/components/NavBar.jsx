import React, { useEffect, useState } from "react";
import { Bell, Menu, Search } from "lucide-react";

function NavBar() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "cupcake"
  );

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "forest" ? "cupcake" : "forest"));
  };

  return (
    <div className="navbar fixed z-50 bg-transparent">
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost text-xl">
          Castly
        </a>
      </div>
      <div className="navbar-end">
        <div className="flex items-center gap-x-30 bg-white rounded-full px-3 py-1 shadow-sm">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle dark:text-black"
            >
              <Menu className="h-5 w-5" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/get-started">Get started</a>
              </li>
              <li>
                <a href="/time-series">Time series</a>
              </li>
              <li>
                <a href="/bayes">Bayes forecast</a>
              </li>
              <li>
                <a href="/transformer">Transformer forecast</a>
              </li>
            </ul>
          </div>
          <div>
            <button className="btn btn-ghost btn-circle dark:text-black">
              <Search className="h-5 w-5" />
            </button>
          </div>
          <div>
            <button className="btn btn-ghost btn-circle dark:text-black">
              <div className="indicator">
                <Bell className="h-5 w-5" />
              </div>
            </button>
          </div>
          <div>
            <input
              type="checkbox"
              className="toggle theme-controller"
              onChange={toggleTheme}
              checked={theme === "forest"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
