import Link from "next/link";
import Image from "next/image";
import NavLinkItem from "./nav-link-item";

const NavBar = () => {
  return (
    <nav className="flex w-full items-center justify-between bg-teal-700 p-4 text-lg text-white">
      <h1 className="w-1/2 text-center text-xl">
        <Link href="/">Home</Link>
      </h1>
      <ul className="flex w-1/2 justify-center gap-12 ">
        <NavLinkItem to="/teams" label="Teams" />
      </ul>
    </nav>
  );
};

export default NavBar;
