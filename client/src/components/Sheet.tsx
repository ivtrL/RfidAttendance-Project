import { useContext } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";

import { AuthContext } from "../Auth/Auth";
import { SheetProps } from "../types";

const Sheet = ({ List, Keys, RemoveButton = false }: SheetProps) => {
  const { removeDeviceFromList } = useContext(AuthContext);
  const valueMatrix: Array<Array<number | string>> = [];

  List.map((object) => {
    const values: Array<number | string> = Object.values(object);
    if (RemoveButton) values.push("Remove");
    valueMatrix.push(values);
  });

  async function handleRemove(data: { uuid: string }) {
    if (typeof removeDeviceFromList === "function")
      await removeDeviceFromList(data);
  }

  return (
    <div className={`sheet w-fit mx-auto grid`}>
      <div
        className={`keys grid`}
        style={{
          gridTemplateColumns: `repeat(${
            RemoveButton ? Keys.length + 1 : Keys.length
          }, minmax(0, 1fr))`,
        }}
      >
        {Keys.map((element, index) => {
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
              gridTemplateColumns: `repeat(${
                RemoveButton ? Keys.length + 1 : Keys.length
              }, minmax(0, 1fr))`,
            }}
          >
            {RemoveButton
              ? valueArray.map((value, idx) => {
                  if (value === "Remove")
                    return (
                      <div className="flex justify-center items-center">
                        <IconButton
                          key={idx + 1}
                          onClick={() => {
                            const uuid = valueArray[2];
                            if (typeof uuid === "string")
                              handleRemove({ uuid });
                          }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </div>
                    );
                  else
                    return (
                      <div
                        className="flex justify-center items-center"
                        key={idx + 1}
                      >
                        {value}
                      </div>
                    );
                })
              : valueArray.map((value, idx) => {
                  return (
                    <div
                      className="flex justify-center items-center"
                      key={idx + 1}
                    >
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
