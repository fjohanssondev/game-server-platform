import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="h-14 border-b">
      <div className="flex h-full items-center justify-between container mx-auto px-4">
        <Link to="/">Ember</Link>
        <nav>
          <ul className="flex space-x-4 text-sm">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>Account</li>
            <li>Settings</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
