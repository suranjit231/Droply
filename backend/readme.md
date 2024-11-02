
# DROPLY - Online Water Delivery App

- DROPLY is an innovative online water delivery platform designed to streamline the process of ordering water and managing deliveries efficiently. This app provides users with the convenience of ordering water online and offers suppliers a robust system to manage their inventory and optimize delivery routes. By integrating the Google Distance Matrix API, DROPLY ensures that delivery personnel are guided through the best possible routes, enhancing delivery speed and customer satisfaction.


## Features

1. User Registration & Login: Users can register and securely log in to place orders.

2. Order Water Online: After logging in, users can order water online, view their order history, and track the status of their orders.

3. Inventory Management for Suppliers: Suppliers can add, update, and delete inventory items, ensuring they always have an up-to-date stock list.

4. Optimized Delivery Routes: The app utilizes the Google Distance Matrix API to calculate and suggest the best possible delivery routes for delivery personnel, ensuring efficient and timely deliveries.

5. Restricted Delivery Zones: DROPLY defines a specific delivery area, represented as a polygon. Users trying to order from outside this zone are restricted to ensure smooth and feasible deliveries.

6. Stock Refill from Optimal Sources: When stock needs to be replenished, the app identifies and guides suppliers to the best refill sources based on proximity and availability.

7. Role-Based Access: Users and suppliers have distinct capabilities, with suppliers having access to inventory management and user order lists.

## Tech Stack

- Backend: Node.js, Express, MongoDB, Google Distance Matrix API
- Frontend: React.js, Redux
- Geolocation & Delivery Area: The app uses MongoDB's geospatial features to define and restrict delivery areas based on polygon shapes.


## Setup Instructions
1. Clone the repository
```
git clone https://github.com/your-username/dropley
```
2. Navigate to backend for backend configuration first  ->
```
cd backend 
```
3. Install Dependencies:
```
npm install
```
4. Add a .env file for backend in the roots of backend ( sibling to server.js )
```
DB_URL= (your mongodb atlas url)
JWT_SECRET= (your jwt setret key)
GOOGLE_API_KEY = (your google map api secret key )
```

6. Please make sure that you are authorized your client url for access the api in ( server.js ) file
```
//====== setup cors =======//
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,
  };

  app.use(cors(corsOptions))

```

5. Start the Development Server:
```
npm start or
node server.js
```
7. Access the Application:

  - The frontend is available at http://localhost:3000.
  - The backend API is accessible at http://localhost:3200.


## Frontend setup 

**--Note** :

1. Open another terminal navigate to the client 
```
cd client
```
2. Install Dependencies:
```
npm install
```
## Important note:

* Please make sure that your client .env file presents at correct place that is:

1. In the roots of client directory and ( sibling to src folder )

2. Add this ,env variable
```
REACT_APP_SERVER_URL= < Backend api base url that is http://localhost:3000 >

REACT_APP_GOOGLE_API_KEY= < Your google map api key>
```

3. Now your setup complete start fronted by
```
npm start
```
4. Now you can explore frontend by clicking all

### For api end points postmen collection ( please contact me if not working )
```
My post men collerction url
```
-------------------------------------------------------------------------------------------------------

# BEST OPTIMIZED LOGIC THAT I USED:

* In this project, I created a system to find the best delivery routes based on different delivery locations, stock locations, and how many parcels can be delivered at once. The main function, calculateOptimalRoute, organizes these locations to find the most efficient delivery path.

## 1. Distance Calculation:

* The system starts by getting the distances from the current location to several delivery destinations using the Google Distance Matrix API. 

* A helper function, getDistances, builds the URL for the API request, sending it to get the distances in meters.

## 2. Main Route Calculation:

* Loop until all delivery locations are processed, starting from the user-provided location.

* Calculate how many parcels can be delivered based on parcel capacity and available quantities, delivering parcels until all are delivered or no locations remain.

## 3. Finding the Closest Delivery Location:

* Retrieve distances to delivery locations and sort them to identify the nearest one.

* Record the delivery step and update quantities; remove fully delivered locations.

## 4. Refilling Stock:

* Check for remaining delivery locations after reaching delivery capacity.

* Calculate the total distance to each stock location plus all the pending deliveries, selecting the one with the shortest distance. ( selecting best store which sum distance is less).

* Add a refill step to restock parcels for further deliveries.

## 5. Final Output:

* It return the output all the orders locations points with quanity, userInfo 
--------------------------------------------------------------------------------------------------

## Suggestion for multiple Delivery person:

* To enhance the delivery process, we can implement an optimization technique for multiple delivery vehicles. First, calculate the best sorted routes for all deliveries. Then, split these routes based on the number of delivery persons available. Finally, call the optimized route calculation function again for each delivery person to find the most efficient paths for multiple deliveries.

--------------------------------------------------------------------------------------------------
## Prioritization Concern

* Currently, our routing system may not effectively prioritize deliveries based on order time. For example, if a person orders 3 hours earlier with a delivery location 10 km away, and another person orders just 1 hour ago with a delivery location only 2 km away, the routing algorithm may prioritize the closer delivery. This could lead to unexpected results and dissatisfaction among customers who placed their orders earlier.

* To address this, we need to modify our routing logic to prioritize deliveries based on the order time, ensuring that earlier orders are fulfilled first, regardless of distance.


Thank you by
--------------
Suranjit Namasudra

