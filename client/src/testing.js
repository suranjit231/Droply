// src/App.js
import React, { useState, useRef } from 'react';
// import GoogleMapComponents from './components/MapComponents';
import { useJsApiLoader,DirectionsRenderer, GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";



const App = () => {
  const center = {lat:27.470730135521688, lng:94.90519864227711};

  const [ map, setMap ] = useState(/** @type google.maps.map */(null));
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:"AIzaSyDgs82c1GlN8j7ADTgQAnWUtH3oo-83i9U",
    libraries:["places"]
  })

  const [directionsResponse, setDirectionsResponse ] = useState(null);
  const [distance, setDistance ] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef();

  const destinationRef = useRef();

  console.log("origin: ", originRef.current.value)

  if(!isLoaded){
    return <h1>Loading .....</h1>
  }


 async function calculateRoute(){
    if(originRef.current.value === "" || destinationRef.current.value === ""){
      return;

    }else{

      const directionService = new window.google.maps.DirectionsService();

      const result = await directionService.route({
        origin:originRef.current.value,
        destination:destinationRef.current.value,
        travelMode: window.google.maps.TravelMode.DRIVING
      })


      setDirectionsResponse(result);
      setDistance(result.routes[0].legs[0].distance.text)
      setDuration(result.routes[0].legs[0].duration.text)

    }


  }


  function clearRoutes(){
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = ""
  }
  


  return (
    <div className='App'>

      <div className='inputConteiner'>
        <div className='from'>
          <label htmlFor="from">Origin</label>

          <Autocomplete>
          <input ref={originRef} type='text' id='from' placeholder='from...'></input>
          </Autocomplete>
        
        </div>

        <div className='from'>
          <label htmlFor="to">Destination</label>

          <Autocomplete>
          <input ref={destinationRef} type='text' id='to' placeholder='Destination ...'></input>
          </Autocomplete>
         
        </div>

        <button onClick={()=>calculateRoute()} className='searchBtn'>Find</button>
        

      </div>

      <div className='direactionsDuration'>
            <p className='direction'>Distance -{distance}</p>
            <p className='direction'>Duration- {duration}</p>
            <i onClick={()=> map.panTo(center)} className="fa-solid fa-hand"></i>
            <p onClick={()=>clearRoutes()} >X</p>
         </div>
      {/* <GoogleMapComponents /> */}

      <div className='mapContainer'>
        {/* ===== display marker, and sirection ==== */}
        <GoogleMap
        center={center} 
        zoom={15} 
        mapContainerStyle={{width:"100%", height:"100vh"}}
        options={{
          zoomControl:false,
          streetViewControl:false,
          mapTypeControl:false,
          fullscreenControl:false
        }}

        onLoad={(map)=>setMap(map)}

        >

         <Marker position={center} />
         <Marker position={center} />
         <Marker position={center} />
         <Marker position={center} />
         <Marker position={center} />
         
         { directionsResponse && <DirectionsRenderer directions={directionsResponse} />}

        </GoogleMap>

       


       
      </div>


    </div>
  );
};

export default App;
