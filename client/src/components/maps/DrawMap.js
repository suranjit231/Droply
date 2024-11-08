import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios';
import DeliveryUserList from './DeliveryUserList';

const containerStyle = { width: '100%', height: '100vh' };
const center = { lat: 27.4656118, lng: 94.9022926 };

function DeliveryRouteMap() {
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY });
  const [directions, setDirections] = useState(null);
  const [isLoadingDirections, setIsLoadingDirections] = useState(true);

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/orders/findSortestRoutes`, {withCredentials:true});
        if (response.data.success) {
          const routeData = response.data.data;
          console.log("response.data: ", response.data);

          setUserList(routeData);
          calculateRoute(routeData);
        } else {
          console.error("Failed to fetch route data");
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, []); // Fetching once on component mount

  const calculateRoute = async (routeData) => {
    const directionsService = new window.google.maps.DirectionsService();
    const waypoints = routeData.slice(1, -1).map(location => ({
      location: {
        lat: location.coordinates.latitude,
        lng: location.coordinates.longitude,
      },
      stopover: true
    }));

    const origin = {
      lat: routeData[0].coordinates.latitude,
      lng: routeData[0].coordinates.longitude
    };
    const destination = {
      lat: routeData[routeData.length - 1].coordinates.latitude,
      lng: routeData[routeData.length - 1].coordinates.longitude
    };

    directionsService.route(
      {
        origin,
        destination,
        waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          setIsLoadingDirections(false);
        } else {
          console.error(`Directions request failed due to ${status}`);
        }
      }
    );
  };

  return isLoaded ? (
  <>
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {isLoadingDirections ? (
        <div>Loading directions...</div>
      ) : directions && (
        <DirectionsRenderer directions={directions} />
      )}
    </GoogleMap>


    {/* ============== render delivery user list here ================== */}


    { userList && userList?.length>0 }{
       <DeliveryUserList userList={userList}  />


    }


</>
  ) : <div>Loading Map...</div>;
}

export default DeliveryRouteMap;


