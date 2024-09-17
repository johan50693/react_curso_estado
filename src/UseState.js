import React, { useEffect, useState } from 'react'


const SECURITY_CODE= 'HKA';

export const UseState = ({name}) => {
    const [value, setValue] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  console.log(value);

  useEffect(() => {
    console.log("cargando...")
    if(loading){
        setTimeout(() => {

            if(value !== SECURITY_CODE){
                setError(true);
            }else{
                setError(false);
            }

            setLoading(false);
        }, 3000);
    }
  }, [loading])
  
    return (
    <div>
        <h2> Eliminar {name}</h2>
        <p>
            Por favor, escribe el codigo de seguridad 
        </p>

        {
            error && (
                <p> Error: El código es incorrecto</p>
            )
        }

        {
            loading && (
                <p> Cargando...</p>
            )
        }
        <input
            value={value} 
            placeholder='Codigo de seguridad' 
            onChange={ event => {
                setError(false);
                setValue(event.target.value);
            }}
        />
        <button
            onClick={ () => setLoading(true)}
        >
            Comprobar
        </button>
    </div>
  )
}
