" use client ";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { NextResponse } from "next/server";

function Header() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {}
  };

  return (
    <div>
      <button onClick={handleSignOut}>signOut</button>
      {session ? (
        <div>welcome </div>
      ) : (
        <div>
          <Link href="/login ">login</Link>
          <Link href="/register  ">login</Link>
        </div>
      )}
    </div>
  );
}

export default Header;
