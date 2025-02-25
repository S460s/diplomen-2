import prisma from "@/lib/prisma";
import UserForm from "@/app/dashboard/users/[userId]/components/UserForm";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const id = parseInt(userId);

  let currentUser = null;
  try {
    currentUser = await prisma.user.findUnique({ where: { id } });
  } catch (err) {
    console.log("[ERROR] couldn't fetch user from DB.", err);
  }

  if (!currentUser) {
    return <h1>There is no user with id {userId}</h1>;
  }

  return (
    <div>
      <h1>Current user: {currentUser.name}</h1>

      <br />
      <UserForm user={currentUser} id={id} />
    </div>
  );
}
