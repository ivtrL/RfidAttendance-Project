const Sheet = ({ List }) => {
  const keysList = Object.keys(List[0]);
  const valueMatrix = [];
  List.map((object) => {
    valueMatrix.push(Object.values(object));
  });

  return (
    <div>
      <div>
        {keysList.map((element) => {
          <div>{element}</div>;
        })}
      </div>
      {valueMatrix.map((valueArray) => {
        <div>
          {valueArray.map((value) => {
            <div>{value}</div>;
          })}
        </div>;
      })}
    </div>
  );
};

export default Sheet;
