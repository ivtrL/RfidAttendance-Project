import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import { AuthContext } from "../Auth/Auth";
import Navbar from "../components/Navbar";
import Sheet from "../components/Sheet";

const Users = () => {
  const { register, handleSubmit } = useForm();
  const { CreateUser, userList, getUserList } = useContext(AuthContext);

  useEffect(() => handleUserList, []);

  async function handleUserList() {
    await getUserList();
  }

  async function onSubmit(data) {
    await CreateUser(data);
  }

  return (
    <div>
      <Navbar Route="users" />

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Usuários</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome do Usuário:
              </label>
              <div className="mt-2">
                <input
                  {...register("username")}
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 bg-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-[#2d3340] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email:
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register("email")}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 bg-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-[#2d3340] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gênero:
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register("gender")}
                  id="gender"
                  name="gender"
                  type="gender"
                  autoComplete="gender"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 bg-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-[#2d3340] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 active:scale-[1.02] ease-in duration-100 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Criar Usuário
              </button>
            </div>
          </form>
          <div>{userList.length > 0 ? <Sheet List={userList} /> : <></>}</div>
        </div>
      </main>
    </div>
  );
};

export default Users;
