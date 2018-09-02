/**
 * Common database helper functions.
 */
class DBHelper {

    /**
     * Database URL.
     * Change this to restaurants.json file location on your server.
     */
    static get DATABASE_URL() {
        const port = 8000 // Change this to your server port
        return `http://localhost:${port}/data/restaurants.json`;
    }

    /**
     * Fetch all restaurants.
     */
    static fetchRestaurants(callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', DBHelper.DATABASE_URL);
        xhr.onload = () => {
            if (xhr.status === 200) { // Got a success response from server!
                const json = JSON.parse(xhr.responseText);
                const restaurants = json.restaurants;
                callback(null, restaurants);
            } else { // Oops!. Got an error from server.
                const error = (`Request failed. Returned status of ${xhr.status}`);
                callback(error, null);
            }
        };
        xhr.send();
    }

    /**
     * Fetch a restaurant by its ID.
     */
    static fetchRestaurantById(id, callback) {
        // fetch all restaurants with proper error handling.
        DBHelper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                const restaurant = restaurants.find(r => r.id == id);
                if (restaurant) { // Got the restaurant
                    callback(null, restaurant);
                } else { // Restaurant does not exist in the database
                    callback('Restaurant does not exist', null);
                }
            }
        });
    }

    /**
     * Fetch restaurants by a cuisine type with proper error handling.
     */
    static fetchRestaurantByCuisine(cuisine, callback) {
        // Fetch all restaurants  with proper error handling
        DBHelper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                // Filter restaurants to have only given cuisine type
                const results = restaurants.filter(r => r.cuisine_type == cuisine);
                callback(null, results);
            }
        });
    }

    /**
     * Fetch restaurants by a neighborhood with proper error handling.
     */
    static fetchRestaurantByNeighborhood(neighborhood, callback) {
        // Fetch all restaurants
        DBHelper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                // Filter restaurants to have only given neighborhood
                const results = restaurants.filter(r => r.neighborhood == neighborhood);
                callback(null, results);
            }
        });
    }

    /**
     * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
     */
    static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
        // Fetch all restaurants
        DBHelper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                let results = restaurants
                if (cuisine != 'all') { // filter by cuisine
                    results = results.filter(r => r.cuisine_type == cuisine);
                }
                if (neighborhood != 'all') { // filter by neighborhood
                    results = results.filter(r => r.neighborhood == neighborhood);
                }
                callback(null, results);
            }
        });
    }

    /**
     * Fetch all neighborhoods with proper error handling.
     */
    static fetchNeighborhoods(callback) {
        // Fetch all restaurants
        DBHelper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                // Get all neighborhoods from all restaurants
                const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
                // Remove duplicates from neighborhoods
                const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
                callback(null, uniqueNeighborhoods);
            }
        });
    }

    /**
     * Fetch all cuisines with proper error handling.
     */
    static fetchCuisines(callback) {
        // Fetch all restaurants
        DBHelper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                // Get all cuisines from all restaurants
                const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
                // Remove duplicates from cuisines
                const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
                callback(null, uniqueCuisines);
            }
        });
    }

    /**
     * Restaurant page URL.
     */
    static urlForRestaurant(restaurant) {
        return (`./restaurant.html?id=${restaurant.id}`);
    }

    /**
     * Restaurant image URL.
     */
    static imageUrlForRestaurant(restaurant) {
        return (`/img/${restaurant.photograph}`);
    }

    /*Responsive image for restaurant image*/
    static ResponsiveImageForRestaurant(restaurant) {
        let responsiveImageSrcset = [
            "buffer",
            "/img/1_100x75.jpg 100w, /img/1_200x150.jpg 200w, /img/1_400x300.jpg 400w, /img/1.jpg 800w",
            "/img/2_100x75.jpg 100w, /img/2_200x150.jpg 200w, /img/2_400x300.jpg 400w, /img/2.jpg 800w",
            "/img/3_100x75.jpg 100w, /img/3_200x150.jpg 200w, /img/3_400x300.jpg 400w, /img/3.jpg 800w",
            "/img/4_100x75.jpg 100w, /img/4_200x150.jpg 200w, /img/4_400x300.jpg 400w, /img/4.jpg 800w",
            "/img/5_100x75.jpg 100w, /img/5_200x150.jpg 200w, /img/5_400x300.jpg 400w, /img/5.jpg 800w",
            "/img/6_100x75.jpg 100w, /img/6_200x150.jpg 200w, /img/6_400x300.jpg 400w, /img/6.jpg 800w",
            "/img/7_100x75.jpg 100w, /img/7_200x150.jpg 200w, /img/7_400x300.jpg 400w, /img/7.jpg 800w",
            "/img/8_100x75.jpg 100w, /img/8_200x150.jpg 200w, /img/8_400x300.jpg 400w, /img/8.jpg 800w",
            "/img/9_100x75.jpg 100w, /img/9_200x150.jpg 200w, /img/9_400x300.jpg 400w, /img/9.jpg 800w",
            "/img/10_100x75.jpg 100w, /img/10_200x150.jpg 200w, /img/10_400x300.jpg 400w, /img/10.jpg 800w"
        ];

        //a loop that assigns srcset to the intended images
        for (let i = 0; i < 11; i++) {
            if (restaurant.id === i) {
                return (`${responsiveImageSrcset[i]}`);
            }
        }
    }

    /**
     * Restaurant image alt text
     */
    static altTextForRestaurant(restaurant) {
        //object with key vaule pairs of the restaurnts alt text
        let restaurantsAltText = {
            missionChineseFoodAltText: 'A look into Mission Chinese Food from the entrance.',
            emilyAltText: "An Emily restaurant's Pizza.",
            kanghodongbaekjeongAltText: "On the inside of Kang Ho Dong Baekjeong we can see tables and chairs with a wood grain texture to them, and on the ceiling are these shiny metallic cylinder like objects.",
            katzsDelicatessenAltText: "On the outside of Katz's Delicatessen looking at the restaurant from its corner.",
            robertasPizzaAltText: "Three workers behind the counter of Roberta's Pizza. One worker is off to and facing the left, the worker in the center is facing towards the viewer with a smile on his face, and the worker on the right is facing away from the view he is wearing a red hat and white top.",
            hometownBbqAltText: "Large american flag on the wall inside of Hometown BBQ's restaurant",
            superiorityBurgerAltText: "Black and white photograph showing the front of the Superiorty Burger restaurant",
            theDutchAltText: "Looking at The Dutch restaurant's sign it's next to a tree with white flowers",
            muRamenAltText: "Black and white photograph from the perspective of the customer. The viewer is sitting down at a table and in front of the viewer is a man eating some ramen, and next to him is a women using her smartphone. Behind both of them are more people.",
            casaEnriqueAltText: "At the bar of Casa Enrique the counters are metallic the stools are white and the walls are white."
        };

        //array of alt text for restaurnt images
        let altText = ['buffer',
            `${restaurantsAltText.missionChineseFoodAltText}`,
            `${restaurantsAltText.emilyAltText}`,
            `${restaurantsAltText.kanghodongbaekjeongAltText}`,
            `${restaurantsAltText.katzsDelicatessenAltText}`,
            `${restaurantsAltText.robertasPizzaAltText}`,
            `${restaurantsAltText.hometownBbqAltText}`,
            `${restaurantsAltText.superiorityBurgerAltText}`,
            `${restaurantsAltText.theDutchAltText}`,
            `${restaurantsAltText.muRamenAltText}`,
            `${restaurantsAltText.casaEnriqueAltText}`
        ];

        //a loop that assigns alt text to the intended images
        for (let i = 0; i < 11; i++) {
            if (restaurant.id === i) {
                return (`${altText[i]}`);
            }
        }
    }



    /**
     * Map marker for a restaurant.
     */
    static mapMarkerForRestaurant(restaurant, map) {
        // https://leafletjs.com/reference-1.3.0.html#marker
        const marker = new L.marker([restaurant.latlng.lat, restaurant.latlng.lng], {
            title: restaurant.name,
            alt: restaurant.name,
            url: DBHelper.urlForRestaurant(restaurant)
        })
        marker.addTo(newMap);
        return marker;
    }
    /* static mapMarkerForRestaurant(restaurant, map) {
      const marker = new google.maps.Marker({
        position: restaurant.latlng,
        title: restaurant.name,
        url: DBHelper.urlForRestaurant(restaurant),
        map: map,
        animation: google.maps.Animation.DROP}
      );
      return marker;
    } */

}