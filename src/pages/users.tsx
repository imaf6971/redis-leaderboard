import { NextPage } from "next";
import Head from "next/head";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useState } from "react";
import { api } from "~/utils/api";
import Link from "next/link";


const Tasks: NextPage = () => {
  const [userList] = useAutoAnimate();
  const [username, setUsername] = useState('');

  const utils = api.useContext();
  const users = api.user.readAll.useQuery();
  const createUser = api.user.create.useMutation({
    onSuccess: () => utils.user.readAll.invalidate(),
  });

  return (
    <>
      <Head>
        <title>Таски</title>
      </Head>
      <main className="px-20">
        <h1 className="text-2xl font-bold">Пользователи</h1>
        <section className="mt-2">
          <h2 className="text-xl font-semibold">Список</h2>
          <div>
            <ul className="flex flex-col items-stretch gap-2" ref={userList}>
              {users.isSuccess && users.data.map(user => (
                <Link className="border rounded-md p-2 hover:shadow transition-shadow" href={`/users/${user.id}`}>
                  <li key={user.id}>{user.username}</li>
                </Link>
              ))}
            </ul>
          </div>
        </section>
        <section className="mt-2">
          <h2 className="text-xl font-semibold mb-2">Добавить</h2>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              createUser.mutate({ username })
              setUsername('')
            }}>
            <label className="flex flex-col">
              <span>Имя пользователя</span>
              <input
                className="p-2 rounded-md border focus:shadow transition-shadow"
                type="text"
                value={username}
                onInput={(e) => setUsername(e.currentTarget.value)}
              />
            </label>
            <button
              className="border rounded-md hover:shadow transition-shadow p-2"
              type="submit"
            >
              Добавить
            </button>
          </form>
        </section>
      </main >
    </>
  )
}

export default Tasks;
