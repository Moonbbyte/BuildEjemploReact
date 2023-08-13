import { Component, useEffect } from "react"
import React,{useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom'
function Home (props){
    const videoRef = useRef(null);
    const [showVideo, setShowVideo] = useState(false)

    useEffect(() => {
        // Función para solicitar el acceso a la cámara
        const getCameraAccess = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: showVideo });
    
            if (videoRef.current) {
              // Establecer el flujo de la cámara en el elemento de video
              videoRef.current.srcObject = stream;
            }
          } catch (error) {
            console.error('Error al acceder a la cámara:', error);
          }
        };
    
        // Llamar a la función para obtener acceso a la cámara
        getCameraAccess();
    
        // Cleanup: Detener la transmisión de la cámara cuando el componente se desmonte
        return () => {
          if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            stream.getTracks().forEach(track => track.stop());
          }
        };
      }, [showVideo]); // El segundo argumento del useEffect (un array vacío) garantiza que se ejecute una vez al montar el componente
      
      const ApagarPrenderCam=()=>{
        setShowVideo(!showVideo);
      }
      return(
        <div>
            <header><h1 className="text-center bg-dark text-light">Tarea2</h1></header>
            <div className="container bg-dark text-light">
                <div className="row">
                    <div className="col-3"/>
                    <div className="col-6">
                    <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} />
                    </div>
                    <div className="col-3"/>
                </div>
                <div className="row mt-5 mb-5">
                    <div className="col-2"/>
                    <div className="col-3 text-center">
                        Brandon Oswaldo Yax Campos
                    </div>
                    <div className="col-2 text-center"> 
                        <button className="btn btn-dark  btnEffect"
                            onClick={()=>{ApagarPrenderCam()}}
                        >
                            {showVideo ? 'Apagar' : 'Encender'}
                        </button>
                    </div>
                    <div className="col-3 text-center">
                        Carnet 201800534
                    </div>
                    <div className="col-2"/>
                </div>
            </div>
                
            
            </div>
        )

}
export default Home;