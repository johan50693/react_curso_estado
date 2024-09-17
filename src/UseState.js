import React, { useEffect, useState } from 'react'


const SECURITY_CODE= 'HKA';

export const UseState = ({name}) => {
  const [state, setState] = useState({
    value: '',
    error: false,
    loading: false
  })
  
  console.log(state);

  useEffect(() => {
    console.log("cargando...")
    if(state.loading){
        setTimeout(() => {
            if(state.value !== SECURITY_CODE){
                setState({
                    ...state,
                    error: true,
                    loading: false,
                });
            }else{
                setState({
                    ...state,
                    error: false,
                    loading: false,
                });
            }

        }, 3000);
    }
  }, [state.loading])
  
    return (
    <div>
        <h2> Eliminar {name}</h2>
        <p>
            Por favor, escribe el codigo de seguridad 
        </p>

        {
            state.error && (
                <p> Error: El código es incorrecto</p>
            )
        }

        {
            state.loading && (
                <p> Cargando...</p>
            )
        }
        <input
            value={state.value} 
            placeholder='Codigo de seguridad' 
            onChange={ event => {
                setState({
                    ...state,
                    error: false,
                    value: event.target.value
                });
            }}
        />
        <button
            onClick={ () => setState({...state, loading: true})}
        >
            Comprobar
        </button>
    </div>
  )
}
