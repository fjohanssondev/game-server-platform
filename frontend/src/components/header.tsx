import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="h-14 border-b">
      <div className="flex h-full items-center justify-between container mx-auto px-4">
        <span>Ember</span>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
