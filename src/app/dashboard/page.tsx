import Link from "next/link";

export default async function Page() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="card md:w-1/2 p-12">
        <h1>Admin Dashboard</h1>

        <ul className="list-inside list-disc">
          <li className="mb-2">
            <Link href={"/dashboard/users"}>Manage users</Link>
          </li>

          <li className="mb-2">
            <Link href={"/dashboard/maps"}>Manage maps</Link>
          </li>
          <li className="mb-2">
            <Link href={"/dashboard/dataflow"}>Dataflow of application</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
