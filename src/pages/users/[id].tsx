import { NextPage } from "next";
import Head from "next/head";

const User: NextPage = () => {

  return (
    <>
      <Head>
        <title>User</title>
      </Head>
      <main className="px-20">
        <h1 className="text-2xl font-bold">Пользователи</h1>
        <section className="mt-2">
          <h2 className="text-xl font-semibold">Таски</h2>
        </section>
      </main>
    </>
  );
}

export default User;
