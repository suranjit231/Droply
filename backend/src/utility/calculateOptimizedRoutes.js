import axios from "axios";

//======== calculate distance between two locations =============//
async function getDistances(origin, destinations) {
    const apiKey = process.env.GOOGLE_API_KEY; 
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destinations.join('|')}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        return response.data.rows[0].elements.map(element => element.distance.value);
    } catch (error) {
        console.error("Error fetching distances:", error);
        return [];
    }
}


//================ functions for calculate best routes ========================//
export default async function calculateOptimalRoute(data) {
    const { deliveryLocations, stockLocations, parcelCapacity, startingLocation } = data;
    let currentLocation = `${startingLocation.latitude},${startingLocation.longitude}`;
    const routeSteps = [];

    while (deliveryLocations.length > 0) {
        let parcelsToDeliver = Math.min(parcelCapacity, deliveryLocations.reduce((sum, loc) => sum + loc.quantity, 0));

        while (parcelsToDeliver > 0 && deliveryLocations.length > 0) {
            const formattedDeliveryLocations = deliveryLocations.map(loc => `${loc.coordinates.latitude},${loc.coordinates.longitude}`);
            const distances = await getDistances(currentLocation, formattedDeliveryLocations);

            const sortedDeliveries = deliveryLocations
                .map((loc, index) => ({
                    location: loc.coordinates,
                    distance: distances[index],
                    quantity: loc.quantity,
                    contact: loc.contact 
                }))
                .sort((a, b) => a.distance - b.distance);

            const { location, quantity, contact } = sortedDeliveries[0];
            const quantityToDeliver = Math.min(parcelsToDeliver, quantity);

            routeSteps.push({
                action: 'deliver',
                coordinates: { latitude: location.latitude, longitude: location.longitude },
                quantity: quantityToDeliver,
                contact 
            });

            parcelsToDeliver -= quantityToDeliver;
            const orderIndex = deliveryLocations.findIndex(loc => 
                loc.coordinates.latitude === location.latitude && loc.coordinates.longitude === location.longitude
            );

            if (orderIndex !== -1) {
                deliveryLocations[orderIndex].quantity -= quantityToDeliver;
                if (deliveryLocations[orderIndex].quantity <= 0) {
                    deliveryLocations.splice(orderIndex, 1);
                }
            }

            currentLocation = `${location.latitude},${location.longitude}`;
        }

        if (deliveryLocations.length > 0 && parcelsToDeliver === 0) {
            let optimalStore = null;
            let minTotalDistance = Infinity;

            const formattedDeliveryLocations = deliveryLocations.map(loc => `${loc.coordinates.latitude},${loc.coordinates.longitude}`);

            for (let store of stockLocations) {
                const storeDistance = await getDistances(currentLocation, [`${store.latitude},${store.longitude}`]);
                const pendingDeliveryDistances = await getDistances(`${store.latitude},${store.longitude}`, formattedDeliveryLocations);
                
                const totalDistance = storeDistance[0] + pendingDeliveryDistances.reduce((sum, d) => sum + d, 0);

                if (totalDistance < minTotalDistance) {
                    minTotalDistance = totalDistance;
                    optimalStore = store;
                }
            }

            if (optimalStore) {
                routeSteps.push({
                    action: 'refill',
                    coordinates: { latitude: optimalStore.latitude, longitude: optimalStore.longitude },
                    quantity: parcelCapacity
                });

                currentLocation = `${optimalStore.latitude},${optimalStore.longitude}`;
            }
        }
    }

    return routeSteps.map(step => ({
        action: step.action,
        coordinates: {
            latitude: step.coordinates.latitude,
            longitude: step.coordinates.longitude
        },
        quantity: step.quantity,
        contact: step.contact 
    }));
}















































