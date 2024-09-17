import React, { useEffect, useState } from 'react'

export const UseState = ({name}) => {
  const [error, setError] = useState(true)
  const [loading, setLoading] = useState(false)
  

  useEffect(() => {
    console.log("cargando...")
    if(loading){
        setTimeout(() => {
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
        <input placeholder='Codigo de seguridad' />
        <button
            onClick={ () => setLoading(true)}
        >
            Comprobar
        </button>
    </div>
  )
}
