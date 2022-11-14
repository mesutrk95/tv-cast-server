 
import './App.css';
import {useEffect, useState} from 'react'
 
const { ipcRenderer } = window.require("electron"); 
ipcRenderer.send('ready')

function App() {

  const [interfaces , setInterfaces] = useState([]);
  
  useEffect(() => {  
    ipcRenderer.send('get-interfaces') 

    ipcRenderer.on('network-interfaces', (evt, allInterfaces)=>{
      console.log('data', evt, allInterfaces);

      let infs = [];
      for (const interfaceName in allInterfaces) {
        infs.push({
          name: interfaceName,
          ip: allInterfaces[interfaceName].find(x => x.family == 'IPv4').address
        })
      }

      setInterfaces(infs)
      console.log(interfaces);
    })
  }, [ ])

  return (
    <div className="App">
      <header className="App-header"> 
        <p>
          Drag & Drop Folder/Files 
        </p>   
        <p>
          {
             interfaces.map((inf) =>  
              <div key={inf.name} className="text-left">
                {inf.name} - {inf.ip}
              </div>
             )
          }
        </p>
      </header>
    </div>
  );
}

export default App;
