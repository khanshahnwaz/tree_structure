import React, { useEffect, useState } from 'react';
import Child from './Child';
function App() {
  const[exportData,setExportData]=useState();
  const[showData,setShowData]=useState(false);
  const [rootChildren, setRootChildren] = useState([{name:'Root',data:'this is me'}]);

  const handleAddChild = (Name,index) => {
    console.log("Clicked parent is ",Name , "and index is",index)
    const updatedChildren = [...rootChildren];
    
    const checkObject=(updatedChildren)=>{
        console.log("in checking",updatedChildren)
        for(let i in updatedChildren){
           
            if(updatedChildren[i].name==Name){
              if(!updatedChildren[i].children){
          updatedChildren[i].children=[]
              const {data,...rest}=updatedChildren[i];
             
              }
    let children=updatedChildren[i].children;
    updatedChildren[i].children.push({ name: `${Name} Child ${children?children.length+1:1}`, data: `${Name} Data` });
              console.log("parent is found ",updatedChildren[i])
              return;
            }
              
             else if(updatedChildren[i].children){
              checkObject(updatedChildren[i].children)
             }
           console.log("childrens are ",updatedChildren[i].name)
        }
    }

    checkObject(updatedChildren);
    setRootChildren(updatedChildren);
    console.log(updatedChildren)
  };

  const handleNameChange=(name,newName)=>{
    const updatedChildren = [...rootChildren];
  const checkObject=(updatedChildren)=>{
    for(let i in updatedChildren){
           
      if(updatedChildren[i].name==name){
         updatedChildren[i].name=newName;
        return;
      }
        
       else if(updatedChildren[i].children){
        checkObject(updatedChildren[i].children)
       }
      
  }
}
checkObject(updatedChildren)
setRootChildren(updatedChildren)
  }

  const handleEditData = (index, newData) => {
    const updatedChildren = [...rootChildren];
    updatedChildren[index].data = newData;
    setRootChildren(updatedChildren);
  };
useEffect(()=>{
  setExportData(JSON.stringify(rootChildren[0]))
},[rootChildren])
  return (
    <div>
      
      
      {rootChildren.map((child, index) => (
        <div key={index}>
          {/* <button onClick={() => handleAddChild(index)}>Add Child</button> */}
          <Child
            index={index}
            name= {child.name}
            data={child.data}
            children={child.children}
            onEditData={(newData) => handleEditData(index, newData)}
            onAddChild={handleAddChild}
            onNameChange={handleNameChange}
            // ({index,parentName}) => handleAddChild(index,parentName)
          />
        </div>
      ))}
<div className='mx-10'>
<button className='px-3 py-2 bg-gray-300 float-left rounded shadow-md' onClick={()=>setShowData(!showData)}>Export data</button>
{showData?<div>{exportData}</div>:null}
</div>
    </div>
  );
}

export default App;








// import React, { useState } from 'react';

// function Child({ name, data, children, onEditData, onAddChild }) {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [childName, setChildName] = useState('');
//   const [childData, setChildData] = useState('');

//   const handleEditData = (newData) => {
//     onEditData(newData);
//   };

//   const handleAddChild = () => {
//     onAddChild({ name: 'New Child', data: 'Data', children: [] });
//   };

//   return (
//     <div style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
//       <h3 onClick={() => setIsCollapsed(!isCollapsed)}>
//         {isCollapsed ? '▶️' : '🔽'} {name}
//       </h3>
//       {!isCollapsed && (
//         <div>
//           <p>
//             Data: 
//             <input
//               type="text"
//               value={data}
//               onChange={(e) => {
//                 setChildData(e.target.value);
//                 handleEditData(e.target.value);
//               }}
//             />
//           </p>
//           <button onClick={handleAddChild}>Add Child</button>
//           {children.map((child, index) => (
//             <Child
//               key={index}
//               name={child.name}
//               data={child.data}
//               children={child.children}
//               onEditData={(newData) => handleEditData(newData)}
//               onAddChild={handleAddChild}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function App() {
//   const [rootChildren, setRootChildren] = useState([]);

//   const handleAddChild = (index) => {
//     const updatedChildren = [...rootChildren];
//         updatedChildren[index].children.push({ name: 'New Child', data: 'Data', children: [] });
//         setRootChildren(updatedChildren);
//   };

//   const handleEditData = (index, newData) => {
//     const updatedChildren = [...rootChildren];
//     updatedChildren[index].data = newData;
//     setRootChildren(updatedChildren);
//   };

//   const handleExport = () => {
//     const exportData = JSON.stringify(rootChildren, ['name', 'children', 'data'], 2);
//     console.log(exportData);
//     // You can do whatever you want with the exportData, such as displaying it in a modal or downloading it.
//   };

//   return (
//     <div>
//       <h2>Parent Component</h2>
//       <button onClick={() => handleAddChild({ name: 'Child', data: '', children: [] })}>
//         Add Child
//       </button>
//       <button onClick={handleExport}>Export</button>
//       {rootChildren.map((child, index) => (
//         <Child
//           key={index}
//           name={child.name}
//           data={child.data}
//           children={child.children}
//           onEditData={(newData) => handleEditData(index, newData)}
//           onAddChild={()=>handleAddChild(index)}
//         />
//       ))}
//     </div>
//   );
// }

// export default App;
