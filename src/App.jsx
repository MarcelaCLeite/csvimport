import { useState } from 'react'
import '../src/styles.css'


function App() {
  const [file, setFile] = useState('');

  const uploadFile = async (e) => {
    e.preventDefault();
    console.log("Upload");
  }

  const formData = new FormData();
  formData.append('file', file);

  return (
    <div>
      <h3>Upload de arquivos CSV</h3>

      <form onSubmit={uploadFile}>
        <label>Selecionar arquivo:</label> 
        <br />
        <input type='file' name='file' 
        onChange={(e) => setFile(e.target.files[0])}/> 
        <br />
        <button type='submit'>Enviar</button>
      </form>
    </div>
    
  )
}

export default App
