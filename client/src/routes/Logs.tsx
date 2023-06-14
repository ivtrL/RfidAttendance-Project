import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Popper from "@mui/material/Popper";
import {
  usePopupState,
  bindToggle,
  bindPopper,
} from "material-ui-popup-state/hooks";
import Fade from "@mui/material/Fade";

import { AuthContext } from "../Auth/Auth";
import Navbar from "../components/Navbar";
import Sheet from "../components/Sheet";
import { UserLog } from "../types";

const Logs = () => {
  const { register, handleSubmit } = useForm<UserLog>();
  const popupState = usePopupState({
    variant: "popper",
    popupId: "demoPopper",
  });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ONLY FOR TESTING PURPOSES SAID IN AUTH.TSX

  const { createLogs } = useContext(AuthContext);

  async function onSubmit(data: UserLog) {
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
        {/* Testing Purposes */}
        <div className="fixed bottom-4 right-10">
          <div className="text-white bg-indigo-600 rounded-md shadow-md p-2 hover:bg-indigo-700 active:scale-[1.02] ease-in duration-100 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900">
            <button {...bindToggle(popupState)}>Apenas para Testes</button>
          </div>
          <Popper className="mb-9" {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <div>
                  <form
                    className="w-full max-w-md mx-auto space-y-6"
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
                      <label
                        htmlFor="device_uid"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ID do Dispositivo:
                      </label>
                      <div className="mt-2">
                        <input
                          {...register("device_uid")}
                          id="device_uid"
                          name="device_uid"
                          type="device_uid"
                          autoComplete="device_uid"
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
                        Criar Histórico
                      </button>
                    </div>
                  </form>
                </div>
              </Fade>
            )}
          </Popper>
        </div>
        {/* Testing Div END */}
      </main>
    </div>
  );
};

export default Logs;
