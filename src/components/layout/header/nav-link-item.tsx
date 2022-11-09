import { NextPage } from "next";
import Link from "next/link";

const NavLinkItem = ({ to, label }: { to: string; label: string }) => {
  return (
    <li className="p-2 hover:text-purple-400">
      <Link href={to}>{label}</Link>
    </li>
  );
};

export default NavLinkItem;
