import { createNhostClient } from "@/app/lib/nhost/server";
import { notFound } from "next/navigation";
import ThreadClient from "@/components/ThreadClient";

export default async function ThreadPage({ params }: { params: { userId: string } }) {
  const nhost = await createNhostClient();
  const session = nhost.getUserSession();
  if (!session?.user) return notFound();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-semibold">Mesajlar</h1>
      <ThreadClient otherId={params.userId} />
    </div>
  );
}
