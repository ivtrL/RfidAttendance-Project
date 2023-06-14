import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import { AuthContext } from "../Auth/Auth";
import Navbar from "../components/Navbar";
import Sheet from "../components/Sheet";
import { UserLog } from "../types";

const Logs = () => {
  const { register, handleSubmit } = useForm<UserLog>();
  const { logsList, getLogsList } = useContext(AuthContext);
  const keysList = [
    "Índice",
    "Nome",
    "ID do Cartão",
    "ID do Dispositivo",
    "Data de Entrada",
    "Tempo de Permanência",
    "Tempo de Saída",
  ];

  async function handleLogsList() {
    if (typeof getLogsList === "function") await getLogsList();
  }

  useEffect(() => {
    handleLogsList();
  }, []);

  // ONLY FOR TESTING PURPOSES SAID IN AUTH.TSX

  const { createLogs } = useContext(AuthContext);

  async function handleCreateLogs(data: UserLog) {
    if (typeof createLogs === "function") await createLogs(data);
  }

  return (
    <div>
      <Navbar Route="logs" />

      <header className="bg-white shadow">
        <div className="max-w-screen-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Históricos</h1>
        </div>
      </header>
      <main>
        <div className="max-w-screen-2xl mx-auto py-6 sm:px-2">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              {Array.isArray(logsList) ? (
                logsList.length > 0 ? (
                  <Sheet List={logsList} Keys={keysList} />
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
        </div>
      </main>
    </div>
  );
};

export default Logs;
