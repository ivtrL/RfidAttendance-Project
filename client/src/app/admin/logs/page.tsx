import Navbar from "@/components/Navbar/Navbar";

const Logs = () => {
  const keysList = [
    "Índice",
    "Nome",
    "ID do Cartão",
    "ID do Dispositivo",
    "Data de Entrada",
    "Tempo de Permanência",
    "Tempo de Saída",
  ];

  return (
    <div>
      <Navbar />

      <header className="bg-white shadow">
        <div className="max-w-screen-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Históricos</h1>
        </div>
      </header>
      <main>
        <div className="max-w-screen-2xl mx-auto py-6 sm:px-2">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Logs;
