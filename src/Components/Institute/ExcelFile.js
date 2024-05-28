import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import { make_cols } from './MakeColumns';

function ExcelFile() {
    const [ file, setFile ] = useState(null)
    const [ jsonData, setJsonData ] = useState([])
    console.log(jsonData);

    const handleConvert = () => {
        const reader = new FileReader()
        const rABS = !!reader.readAsBinaryString

        reader.onload = e => {
            const bstr = e.target.result
            const wb = XLSX.read(bstr, { type : rABS ? 'binary' : 'array', bookVBA: true })

            const wsname = wb.SheetNames[0]
            const ws = wb.Sheets[wsname]

            const data = XLSX.utils.sheet_to_json(ws)

            setJsonData(data, () => {
                console.log(JSON.stringify(data, null, 2));
            })
        }

        reader.readAsBinaryString(file)
    }
  return (
    <div>
      <input type='file' onChange={e => setFile(e.target.files[0])} />

      <button onClick={handleConvert}>Convert</button>
      {/* <pre>{jsonData}</pre> */}
    </div>
  )
}

export default ExcelFile
