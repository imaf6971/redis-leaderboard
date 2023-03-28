import { useAutoAnimate } from "@formkit/auto-animate/react";
import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

const Home: NextPage = () => {

  const leaders = api.user.leaderboard.useQuery();
  const [leaderboard] = useAutoAnimate();
  return (
    <>
      <Head>
        <title>Leaderboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen mt-2 flex gap-2 flex-col items-center">
        <h1 className="font-bold text-left text-3xl">Leaderboard</h1>
        <section className="">
          <h2 className="">Top users</h2>
          <ol ref={leaderboard}>
            {leaders.isSuccess && leaders.data.map(smth => <li key={smth}>{smth}</li>)}
          </ol>
        </section>
      </main>
    </>
  );
};

export default Home;
