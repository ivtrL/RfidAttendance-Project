import Link from "next/link";
import NavbarMenu from "./NavbarMenu";
import ThemeButton from "./ThemeButton";

export default function Navbar() {
  return (
    <div className="Navbar">
      <div className="container">
        <nav>
          <Link href="/admin">
            <span>Início</span>
          </Link>
          <Link href="/admin/logs">
            <span>Históricos</span>
          </Link>
          <Link href="/admin/devices">
            <span>Dispositivos</span>
          </Link>
          <Link href="/admin/users">
            <span>Usuários</span>
          </Link>
        </nav>

        <NavbarMenu />
        <ThemeButton />
      </div>
    </div>
  );
}
