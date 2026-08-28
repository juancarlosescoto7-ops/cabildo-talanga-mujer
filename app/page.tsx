import Link from "next/link";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#090b0c] text-[#f4f4f2]">
      <Link className="underline underline-offset-4" href="/cabildo/mujer">
        Abrir Cabildo Mujer
      </Link>
    </main>
  );
}
