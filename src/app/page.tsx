import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex items-center justify-center h-full flex-col gap-2">
      <p className="bg-gradient-to-r from-primary to-error bg-clip-text text-transparent font-black text-4xl w-fit">Learning Maps</p>
      <p className="text-base-content/80 text-base md:max-w-2xl">
        Welcome to Learning Maps, your go-to resource for interactive and engaging learning experiences! Our website is designed with user-friendliness in mind, ensuring that you can easily navigate and find what you need.
      </p>

      <Link href={'/maps'} className="btn btn-primary">View Maps</Link>
    </div>
  );
}