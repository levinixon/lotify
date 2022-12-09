

import { getSession, useSession } from "next-auth/react";
import Center from "../components/center";
import Player from "../components/player";
import Sidebar from "../components/sidebar";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="overflow-hidden scrollbar-hide flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
      <Player />
      
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}