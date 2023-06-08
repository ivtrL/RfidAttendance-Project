const Sheet = ({ List }) => {
  const keysList = Object.keys(List[0]);
  const valueMatrix = [];
  List.map((object) => {
    valueMatrix.push(Object.values(object));
  });

  return (
    <div className={`sheet w-fit mx-auto grid`}>
      <div
        className={`keys grid`}
        style={{
          gridTemplateColumns: `repeat(${keysList.length}, minmax(0, 1fr))`,
        }}
      >
        {keysList.map((element, index) => {
          return (
            <div className="flex justify-center items-center" key={index + 1}>
              {element}
            </div>
          );
        })}
      </div>
      {valueMatrix.map((valueArray, index) => {
        return (
          <div
            key={index + 1}
            className={`values grid`}
            style={{
              gridTemplateColumns: `repeat(${keysList.length}, minmax(0, 1fr))`,
            }}
          >
            {valueArray.map((value, idx) => {
              return (
                <div className="flex justify-center items-center" key={idx + 1}>
                  {value}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Sheet;
