import React from "react";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import { AuthContext } from "../Auth/Auth";
import Navbar from "../components/Navbar";
import Sheet from "../components/Sheet";
import { User } from "../types";

const Users = () => {
  const { register, handleSubmit } = useForm();
  const { CreateUser, userList, getUserList } = useContext(AuthContext);
  const keysList = [
    "Índice",
    "Nome",
    "Gênero",
    "Email",
    "ID do Cartão",
    "Data de Adição",
    "Adicionar Cartão",
  ];

  async function handleUserList() {
    if (typeof getUserList === "function") await getUserList();
  }

  useEffect(() => {
    handleUserList();
  }, []);

  async function onSubmit(data: User) {
    if (typeof CreateUser === "function") await CreateUser(data);
  }

  return (
    <div>
      <Navbar Route="users" />

      <header className="bg-white shadow">
        <div className="max-w-screen-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Usuários</h1>
        </div>
      </header>
      <main>
        <div className="max-w-screen-2xl mx-auto py-6 sm:px-2 flex">
          <form
            className="w-2/5 max-w-md mx-auto space-y-6"
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
                <select
                  {...register("gender")}
                  id="gender"
                  className="block w-full rounded-md border-0 py-1.5 px-2 bg-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-[#2d3340] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
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
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 m-4">
            {Array.isArray(userList) ? (
              userList.length > 0 ? (
                <Sheet List={userList} Keys={keysList} />
              ) : (
                <div
                  className={`keys grid`}
                  style={{
                    gridTemplateColumns: `repeat(${keysList.length}, minmax(0, 1fr))`,
                  }}
                >
                  {keysList.map((element, index) => {
                    return (
                      <div
                        className="flex justify-center items-center"
                        key={index + 1}
                      >
                        {element}
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Users;
