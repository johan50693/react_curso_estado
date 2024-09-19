import React, { useEffect, useReducer } from 'react'


const SECURITY_CODE= 'HKA';

const initialState = {
    value: '',
    error: false,
    loading: false,
    confirmed: false,
    deleted: false
  }

export const UseReducer = ({name}) => {
    const [state, dispatch] = useReducer(reducerSWITCH,initialState)

    const onConfirmed = () => dispatch({type: actionsTypes.confirm})
    const onError = () => dispatch({type: actionsTypes.error})
    const onAddCode = (event) => dispatch({type: actionsTypes.addCode, payload: event.target.value})
    const onCheck = () => dispatch({type: actionsTypes.check})
    const onBack = () => dispatch({type: actionsTypes.back})
    const onDelete = () => dispatch({type: actionsTypes.delete}) 
  
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
                  onChange={onAddCode}
              />
              <button
                  onClick={onCheck}
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
                  onClick={onBack}
              >
                  No, Regresar
              </button>
              <button
                  onClick={onDelete}
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
                  onClick={onBack}
              >
                  Resetear y regresar
              </button>
          </>
      )
    }
  
  }
  
const actionsTypes = {
    error: 'ERROR',
    confirm: 'CONFIRM',
    addCode: 'ADDCODE',
    check: 'CHECK',
    back: 'BACK',
    delete: 'DELETE',
}

 const reducerSWITCH = (state, action) => {
    switch (action.type) {
        case actionsTypes.error:
            return {
                ...state,
                error: true,
                loading: false,
            };
        case actionsTypes.confirm:
            return {
                ...state,
                error: false,
                loading: false,
                confirmed: true
            };
        case actionsTypes.addCode:
            return {
                ...state,
                error: false,
                value: action.payload
            };
        case actionsTypes.check:
            return {
                ...state, 
                loading: true
            }; 
        case actionsTypes.back:
            return {
                ...state,
                deleted: false,
                confirmed: false,
                value: ''
            };
        case actionsTypes.delete:
            return {
                ...state,
                deleted: true,
            };
        default:
            return {
                ...state,
            };
    }
 }
