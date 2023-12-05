import { useState } from 'react'
import '../src/styles.css'
import Papa from 'papaparse';
import {Table} from 'antd';


function App() {
  const [data, setData] = useState([]);
  const [header, setHeader] = useState([]);


  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    console.log("Upload");
  }

  const handleChangeHeader = (headers) => {
    const formattedHeader = headers.map(currentHeader => ({
      title: currentHeader,
      dataIndex: currentHeader,
      key: currentHeader
    }));

    setHeader(formattedHeader);
  }

  const handleChange = (e) => {
    const csv = e.target.files[0];
    if (csv) {
      Papa.parse(csv, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          setData(result.data);
          handleChangeHeader(Object.keys(result.data[0]));
        },
        error: (error) => 
        alert('Error', error.message)
        },
      );
    };
  };

  return (
    <div>
      <h3>Upload de arquivos CSV</h3>

      <form onSubmit={uploadFile}>
        <label>Selecionar arquivo:</label> 
        <br />
        <input type='file' name='file' 
        onChange={handleChange}/>
        <br />
        <button type='submit'>Enviar</button>
      </form>

      {data?.length > 0 ? 
        <Table dataSource={data} columns={header} pagination={false} />
      : null }
    
    </div>
  )
}

export default App
