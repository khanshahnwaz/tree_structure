import React, { useEffect, useState } from "react";
import Child from "./Child";
function LandingPage() {
  const [exportData, setExportData] = useState();
  const [showData, setShowData] = useState(false);
  const [rootChildren, setRootChildren] = useState([
    { name: "Root", data: "this is me" },
  ]);

  const handleAddChild = (Name, index) => {
    // console.log("Clicked parent is ", Name, "and index is", index);
    const updatedChildren = [...rootChildren];
    const checkObject = async (updatedChildren) => {
      // console.log("in checking", updatedChildren);
      for (let i in updatedChildren) {
        if (updatedChildren[i].name == Name) {
          if (!updatedChildren[i].children) {
            updatedChildren[i].children = [];
            const { data, ...rest } = updatedChildren[i];
            updatedChildren[i] = rest;
            setRootChildren(updatedChildren);
            // console.log("family is", updatedChildren);
          }
          let children = updatedChildren[i].children;
          updatedChildren[i].children.push({
            name: `${Name} Child ${children ? children.length + 1 : 1}`,
            data: `${Name} Data`,
          });
          // console.log("parent is found ", updatedChildren[i]);
          return;
        } else if (updatedChildren[i].children) {
          checkObject(updatedChildren[i].children);
        }
        // console.log("childrens are ", updatedChildren[i].name);
      }
    };

    checkObject(updatedChildren);
    setRootChildren(updatedChildren);
    // console.log(updatedChildren);
  };

  const handleNameChange = (name, newName) => {
    const updatedChildren = [...rootChildren];
    const checkObject = (updatedChildren) => {
      for (let i in updatedChildren) {
        if (updatedChildren[i].name == name) {
          updatedChildren[i].name = newName;
          return;
        } else if (updatedChildren[i].children) {
          checkObject(updatedChildren[i].children);
        }
      }
    };
    checkObject(updatedChildren);
    setRootChildren(updatedChildren);
  };

  const handleEditData = (tagName, newData) => {
    // console.log("editing dat for ", tagName, " data is ", newData);
    const checkObject = (rootChildren) => {
      for (let i in rootChildren) {
        // console.log("current name is", rootChildren[i].name);
        if (rootChildren[i].name == tagName) {
          rootChildren[i].data = newData;
          // console.log("edited ", rootChildren[i]);
          return;
        } else if (rootChildren[i].children) {
          checkObject(rootChildren[i].children);
        }
      }
    };
    checkObject(rootChildren);
    setRootChildren(rootChildren);
    setExportData(JSON.stringify(rootChildren[0]));
    // console.log("after data edition ", rootChildren);
  };
  useEffect(() => {
    // console.log("i am changed");
    setExportData(JSON.stringify(rootChildren[0]));
  }, [rootChildren]);
  return (
    <div>
      {rootChildren.map((child, index) => (
        <div key={index}>
          {/* <button onClick={() => handleAddChild(index)}>Add Child</button> */}
          <Child
            index={index}
            name={child.name}
            data={child.data}
            children={child.children}
            onEditData={handleEditData}
            onAddChild={handleAddChild}
            onNameChange={handleNameChange}
            // ({index,parentName}) => handleAddChild(index,parentName)
          />
        </div>
      ))}
      <div className="mx-10 grid gap-y-2">
        <button
          className="px-3 py-2 bg-gray-300  rounded shadow-md text-left w-max"
          onClick={() => setShowData(!showData)}
        >
          Export data
        </button>
        {showData ? (
          <div className="p-2 border-2 border-blue-300 font-bold">
            {exportData}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default LandingPage;
