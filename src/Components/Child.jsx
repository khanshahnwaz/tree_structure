import React, { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";

const Child = ({
  index,
  name,
  data,
  children,
  onEditData,
  onAddChild,
  onNameChange,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [newName, setNewName] = useState(name);
  const [textData, setTextData] = useState(data);
  const [editData, setEditData] = useState(false);
  const [editName, setEditName] = useState(false);
  useEffect(() => {
    setTextData(data);
  }, [data]);

  const handleEditData = (nam, text) => {
    // event.stopPropagation();
    // console.log("calling edit for ", name);
    onEditData(nam, text);
    setEditData(false);
    // e.stopPropagation();    // console.log(e.target)
  };
  const handleNameChange = (nam, newNam) => {
    onNameChange(nam, newNam);
    setEditName(false);
  };
  const handleAddChild = (parentName, ind) => {
    // console.log("clicked name is", parentName);
    onAddChild(parentName, ind);
  };

  return (
    <div className="border-4 border-blue-400 mx-10 md:my-10 my-5 min-w-0">
      <div className="flex w-full justify-between  bg-blue-400 px-2 py-4 min-w-0">
        <div>
          <div className="flex gap-x-2">
            <button
              className="p-3 bg-gray-300"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <FiChevronRight /> : <FiChevronDown />}
            </button>
            {!editName ? (
              <b className="my-auto" onClick={() => setEditName(true)}>
                {newName}
              </b>
            ) : (
              <input
                value={newName}
                className="w-full m-auto text-lg font-semibold"
                onKeyDown={(e) => {
                  // console.log("clicked key is", e.key);
                  if (e.key === "Enter") {
                    if (!newName) {
                      setNewName(name);
                      setEditName(false);
                    } else {
                      handleNameChange(name, newName);
                    }
                  }
                }}
                onChange={(e) => [setNewName(e.target.value)]}
                required
              />
            )}
          </div>
        </div>
        <button
          onClick={(e) => handleAddChild(name, index)}
          className="md:px-3 px-1 py-1 bg-gray-300"
        >
          Add Child
        </button>
      </div>
      {!isCollapsed && (
        <div>
          {data ? (
            editData ? (
              <div className="text-left p-3">
                {" "}
                Data:
                <input
                  className="md:px-5 w-full py-2 border-2 border-blue-300"
                  value={textData}
                  onChange={(e) => [setTextData(e.target.value)]}
                  // onBlur={handleEditData}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // console.log("key is",e)
                      if (!textData) {
                        setTextData(data);
                        setEditData(false);
                      } else handleEditData(name, textData);
                      // onEditData();
                    }
                  }}
                  required
                />
              </div>
            ) : (
              <div className="text-left p-3" onClick={() => setEditData(true)}>
                Data:{" "}
                <span className="px-5 py-2 border-2 border-gray-300">
                  {textData}
                </span>
              </div>
            )
          ) : null}
          {children?.map((child, index) => (
            <Child
              key={index}
              index={index}
              name={child.name}
              data={child.data}
              children={child.children}
              onEditData={handleEditData}
              onAddChild={handleAddChild}
              onNameChange={handleNameChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Child;
