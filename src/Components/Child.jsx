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
  const handleEditData = (event) => {
    // event.stopPropagation();
    console.log("calling edit for ", name);
    onEditData(name, textData, event);
    setEditData(false);
    // e.stopPropagation();    // console.log(e.target)
  };
  const handleNameChange = () => {
    console.log(
      "calling for ",
      name,
      "old name",
      name,
      " and new name ",
      newName
    );
    onNameChange(name, newName);
    setEditName(false);
  };
  const handleAddChild = (parentName, ind) => {
    console.log("clicked name is", parentName);
    onAddChild(parentName, ind);
  };

  return (
    <div className="border-4 border-blue-400 mx-10 my-10">
      <div className="flex w-full justify-between  bg-blue-400 px-2 py-4">
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
                className=" m-auto text-lg font-semibold"
                onKeyDown={(e) => {
                  console.log("clicked key is", e.key);
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.stopPropagation();
                    handleNameChange();
                  }
                }}
                onChange={(e) => [setNewName(e.target.value)]}
              />
            )}
          </div>
        </div>
        <button
          onClick={(e) => handleAddChild(name, index)}
          className="px-3 py-1 bg-gray-300"
        >
          Add Child
        </button>
      </div>
      {!isCollapsed && (
        <div>
          {textData ? (
            editData ? (
              <div className="text-left p-3">
                {" "}
                Data:
                <input
                  className="px-5 py-2 border-2 border-blue-300"
                  type="text"
                  value={textData}
                  onChange={(e) => setTextData(e.target.value)}
                  // onBlur={handleEditData}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // console.log("key is",e)
                      e.preventDefault();
                      e.stopPropagation();

                      handleEditData(e);
                    }
                  }}
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
