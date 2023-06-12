import { useContext } from "react";
import { useForm } from "react-hook-form";

import Navbar from "../components/Navbar";
import Sheet from "../components/Sheet";
import { AuthContext } from "../Auth/Auth";
import { DeviceAdding } from "../types";

const Devices = () => {
  const { register, handleSubmit } = useForm<DeviceAdding>();
  const { devicesList, getDevicesList, addDeviceToList } =
    useContext(AuthContext);
  const keysList = ["Índice", "Nome", "ID do Dispositivo", "Data de Adição"];

  async function handleDevicesList() {
    if (typeof getDevicesList === "function") await getDevicesList();
  }

  handleDevicesList;

  async function onSubmit(data: DeviceAdding) {
    if (typeof addDeviceToList === "function") await addDeviceToList(data);
  }

  return (
    <div>
      <Navbar Route="devices" />

      <header className="bg-white shadow">
        <div className="max-w-screen-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dispositivos</h1>
        </div>
      </header>
      <main>
        <div className="max-w-screen-2xl mx-auto py-6 sm:px-2 flex">
          <form
            className="w-1/5 max-w-md mx-auto space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome do Dispositivo:
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
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 active:scale-[1.02] ease-in duration-100 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Criar Dispositivo
              </button>
            </div>
          </form>
          {/* Replace with your content */}
          <div className="w-4/5 px-0 py-6 sm:px-4">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              {Array.isArray(devicesList) ? (
                devicesList.length > 0 ? (
                  <Sheet
                    List={devicesList}
                    Keys={keysList}
                    RemoveButton={true}
                  />
                ) : (
                  <div
                    className={`keys grid`}
                    style={{
                      gridTemplateColumns: `repeat(${
                        keysList.length + 1
                      }, minmax(0, 1fr))`,
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
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
};

export default Devices;
