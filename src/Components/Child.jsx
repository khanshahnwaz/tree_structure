import React, { useState } from "react";

const Child = ({index, name, data, children, onEditData, onAddChild,onNameChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [newName, setNewName] = useState(name);
  const [childData, setChildData] = useState("This is initial");
  const handleEditData = (newData) => {
    onEditData(newData);
  };
const handleNameChange=()=>{
  console.log("old name",name, " and new name ",newName)
       onNameChange(name,newName)
}
  const handleAddChild = (parentName,ind) => {
    console.log("clicked name is",parentName)
    onAddChild(parentName,ind);
  };

  return (
    <div className="border-4 border-blue-400 mx-10 my-10">
    <div className="flex w-full justify-between  bg-blue-400 px-2 py-4">
      <div>
        <div className="flex gap-x-2">
    <button className="p-3 bg-gray-300" onClick={() => setIsCollapsed(!isCollapsed)}>
      {isCollapsed ? "▶️" : "🔽"} 
    </button><input name='name' readOnly={true} value={newName} className="outline-none bg-inherit m-auto text-lg font-semibold" onClick={(e)=>e.target.readOnly=false} onMouseLeave={(e)=>e.target.readOnly=true} onChange={(e)=>[setNewName(e.target.value),handleNameChange()]}/></div></div>
    <button onClick={(e)=>handleAddChild(name,index)} className="px-3 py-1 bg-gray-300">Add Child</button>
    </div>
      {!isCollapsed && (
        <div>
          <p>
            Data:
            <input
              type="text"
              value={data}
              onChange={(e) => {
                setChildData(e.target.value);
                handleEditData(e.target.value);
              }}
            />
          </p>
        
          {children?.map((child, index) => (
            <Child
              key={index}
              index={index}
              name={child.name}
              data={child.data}
              children={child.children}
              onEditData={(newData) => handleEditData(newData)}
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
