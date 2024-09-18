import React, { useEffect, useState } from 'react'


const SECURITY_CODE= 'HKA';

export const UseState = ({name}) => {
  const [state, setState] = useState({
    value: '',
    error: false,
    loading: false,
    confirmed: false,
    deleted: false
  })
  
  console.log(state);

  const onConfirmed = () => {
    setState({
        ...state,
        error: false,
        loading: false,
        confirmed: true
    });
  }

  const onError = () => {
    setState({
        ...state,
        error: true,
        loading: false,
    });
  }

  const onAddCode = (value) => {
    setState({
        ...state,
        error: false,
        value: value
    });
  }

  const onCheck = () => {
    setState({...state, loading: true})
  }

  const onBack = () => {
    setState({
        ...state,
        deleted: false,
        confirmed: false,
        value: ''
    });
  }

  const onDelete = () => {
    setState({
        ...state,
        deleted: true,
    });
    console.log(state)
  } 
  useEffect(() => {
    console.log("cargando...")
    if(state.loading){
        setTimeout(() => {
            if(state.value !== SECURITY_CODE){
                onError();
            }else{
                onConfirmed()
            }

        }, 3000);
    }
  }, [state.loading])
  
  if(!state.confirmed && !state.deleted){
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
                    onAddCode(event.target.value);
                }}
            />
            <button
                onClick={ () => onCheck()}
            >
                Comprobar
            </button>
        </div>
    )
  }else if (state.confirmed && !state.deleted){
    return (
        <>
            <p>¿Estas seguro que quieres eliminar el estado?</p>
            <button
                onClick={()=>{
                    onBack();
                }}
            >
                No, Regresar
            </button>
            <button
                onClick={()=>{
                    onDelete();
                }}
            >
                Si, Eliminalo
            </button>
        </>
    )
  }else{
    return (
        <>
            <p>Eliminado con exito</p>
            <button
                onClick={()=>{
                    onBack();
                }}
            >
                Resetear y regresar
            </button>
        </>
    )
  }

}
