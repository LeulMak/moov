import { Bell, Search, User } from "lucide-react";
import Link from "next/link";

export const Nav = () => {
  return (
    <div className="flex flex-row items-center justify-between px-24 py-5">
      {/* Left side navigation menu items */}
      <div className="flex flex-row items-center gap-14">
        <p className="font-satoshi text-3xl font-bold">Moov</p>
        <div className="flex flex-row items-center gap-8 font-extralight active:font-bold text-md">
          <Link href="/">Home</Link>
          <Link href="">Movies</Link>
          <Link href="">Series</Link>
        </div>
      </div>

      {/* Right side navigation menu items */}
      <div className="flex flex-row items-center gap-8">
        <Search />
        <Bell />
        <User />
      </div>
    </div>
  );
};
