const Sheet = ({ List }) => {
  console.log(Object.keys(List[0]));
  const keysList = Object.keys(List[0]);
  const valueMatrix = [];
  List.map((object) => {
    valueMatrix.push(Object.values(object));
  });

  return (
    <div>
      {keysList.map((element) => {
        <div>{element}</div>;
      })}
      {valueMatrix.map((valueArray) => {
        valueArray.map((value) => {
          <div>{value}</div>;
        });
      })}
    </div>
  );
};

export default Sheet;
