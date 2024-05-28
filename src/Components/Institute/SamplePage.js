import React, { useState } from 'react'
import { useLocation } from 'react-router'

function SamplePage() {
    const location = useLocation()

    const [data, setData] = useState(location.state)
    console.log(data);
  return (
    <div>
      <table>
        <thead>
            <tr>
                <th>name</th>
                <th>father_name</th>
                <th>roll</th>
            </tr>
        </thead>

        <tbody>
            {data && data.map((item, index) => {
                if(index<10){
                    return(
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.father_name}</td>
                            <td>{item.roll}</td>
                        </tr>
                    )
                }
            })}
        </tbody>
      </table>
    </div>
  )
}

export default SamplePage
