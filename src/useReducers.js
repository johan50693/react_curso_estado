import { type } from '@testing-library/user-event/dist/type';
import React, { useEffect, useReducer, useState } from 'react'


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
    
    console.log(state);
  
    useEffect(() => {
      console.log("cargando...")
      if(state.loading){
          setTimeout(() => {
              if(state.value !== SECURITY_CODE){
                //   onError();
                dispatch({type: 'ERROR'});
              }else{
                //   onConfirmed()
                dispatch({type: 'CONFIRM'});
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
                    //   onAddCode(event.target.value);
                    dispatch({type: 'ADDCODE', payload: event.target.value});
                  }}
              />
              <button
                  onClick={ () => dispatch({type: 'CHECK'})}
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
                    //   onBack();
                    dispatch({type: 'BACK'});
                  }}
              >
                  No, Regresar
              </button>
              <button
                  onClick={()=>{
                    //   onDelete();
                    dispatch({type: 'DELETE'});
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
                    //   onBack();
                    dispatch({type: 'BACK'});
                  }}
              >
                  Resetear y regresar
              </button>
          </>
      )
    }
  
  }
  


 const reducerSWITCH = (state, action) => {
    switch (action.type) {
        case 'ERROR':
            return {
                ...state,
                error: true,
                loading: false,
            };
        case 'CONFIRM':
            return {
                ...state,
                error: false,
                loading: false,
                confirmed: true
            };
        case 'ADDCODE':
            return {
                ...state,
                error: false,
                value: action.payload
            }
        case 'CHECK':
            return {
                ...state, 
                loading: true
            } 
        case 'BACK':
            return {
                ...state,
                deleted: false,
                confirmed: false,
                value: ''
            }
        case 'DELETE':
            return {
                ...state,
                deleted: true,
            }
        default:
            return {
                ...state,
            };
    }
 }
