('use strict');

(function () {
   // DOM ELEMENTS
   const form = document.querySelector('.form');
   const containerRestaurants = document.querySelector('.restaurantList');
   const containerWishList = document.querySelector('.restaurantWishList');
   const inputRestaurant = document.getElementById('restaurantName');
   const findRestaurantsLink = document.getElementById('findRestaurantLink');
   const logRestaurant = document.getElementById('log');
   const findRestaurant = document.getElementById('find');

   // VARIABLES
   let map;
   let address = '';
   const mapZoomLevel = 13;
   const allRestaurants = [];
   const allRestaurantsWish = [];
   const nearbyLocations = [];
   const BASE_URL = 'http://localhost:3000';
   const myKey = config.MY_KEY;
   const myTAkey = config.MY_TA_KEY;

   // FUNCTIONS
   const titleCase = (str) => {
      return str
         .toLowerCase()
         .split(' ')
         .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
         })
         .join(' ');
   };

   const addNewRestaurant = async (newRestaurantObj) => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const raw = JSON.stringify({
         name: titleCase(newRestaurantObj.name),
         address,
         type: newRestaurantObj.type,
         visitDate: newRestaurantObj.visitDate,
         meal: newRestaurantObj.meal,
         liked: false,
      });
      const requestOptions = {
         method: 'POST',
         headers: myHeaders,
         body: raw,
      };

      try {
         const response = await fetch(
            `${BASE_URL}/restaurants`,
            requestOptions
         );
         if (response.ok) {
            const returnedData = await response.json();
            form.classList.add('hidden');
            form.reset();
            renderRestaurant(returnedData);
            allRestaurants.push(returnedData);
            alert(`${returnedData.name} added!`);
         } else {
            throw new Error(
               `Problem posting new restaurant ${response.status} ${response.statusText}`
            );
         }
      } catch (err) {
         alert(`There was a problem adding your restaurant. ${err}`);
      }
   };

   const renderRestaurant = (restaurantObj) => {
      const restaurantItem = document.createElement('li');
      const restaurantName = document.createElement('h2');
      const restaurantAddress = document.createElement('p');
      const restaurantType = document.createElement('p');
      const restaurantVisitDate = document.createElement('p');
      const restaurantMeal = document.createElement('p');
      const restaurantLiked = document.createElement('p');
      const likedBtn = document.createElement('button');
      const rowRestaurantHdr = document.createElement('div');
      const colName = document.createElement('div');
      const colLiked = document.createElement('div');
      const rowAddress = document.createElement('div');
      const rowType = document.createElement('div');
      const rowMeal = document.createElement('div');
      const rowVisitDate = document.createElement('div');

      restaurantItem.className = 'restaurant';
      restaurantName.textContent = restaurantObj.name;
      restaurantAddress.textContent = restaurantObj.address;
      restaurantType.textContent = `Type: ${restaurantObj.type}`;
      restaurantMeal.textContent = `Meal: ${restaurantObj.meal}`;
      restaurantVisitDate.textContent = `Visit Date: ${restaurantObj.visitDate}`;
      restaurantLiked.textContent = restaurantObj.liked;
      likedBtn.id = `${restaurantObj.id}`;
      likedBtn.className = 'like-btn';
      likedBtn.textContent = '♥';
      restaurantObj.liked
         ? (likedBtn.style.color = 'red')
         : (likedBtn.style.color = 'white');
      rowRestaurantHdr.className = 'row';
      colName.className = 'col-10';
      colLiked.className = 'col-2';
      rowAddress.className = 'row';
      rowType.className = 'row';
      rowMeal.className = 'row';
      rowVisitDate.className = 'row';

      colLiked.append(likedBtn);
      colName.append(restaurantName);
      rowRestaurantHdr.append(colName, colLiked);
      rowAddress.append(restaurantAddress);
      rowType.append(restaurantType);
      rowMeal.append(restaurantMeal);
      rowVisitDate.append(restaurantVisitDate);
      restaurantItem.append(
         rowRestaurantHdr,
         rowAddress,
         rowType,
         rowVisitDate,
         rowMeal
      );
      containerRestaurants.appendChild(restaurantItem);
   };

   const getRestaurants = async () => {
      try {
         const response = await fetch(`${BASE_URL}/restaurants`);
         if (response.ok) {
            const returnedData = await response.json();
            returnedData.forEach((restaurantObj) => {
               renderRestaurant(restaurantObj);
               allRestaurants.push(restaurantObj);
            });
         } else {
            throw new Error(
               `Uh oh.. ${response.status}: ${response.statusText}`
            );
         }
      } catch (err) {
         alert(err);
      }
   };

   const getAddress = async (placeId) => {
      const placeUrl =
         'https://fotf-cors.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?';
      const requestOptions = {
         method: 'GET',
         redirect: 'follow',
         Origin: 'https://maps.google.com',
         'x-requested-with': 'XMLHttpRequest',
      };

      try {
         const response = await fetch(
            `${placeUrl}place_id=${placeId}&key=${myKey}`,
            requestOptions
         );
         if (response.ok) {
            const returnedData = await response.json();
            address = returnedData.result.formatted_address;
         } else {
            throw new Error(
               `Uh oh.. ${response.status}: ${response.statusText}`
            );
         }
      } catch (err) {
         alert(`There was a problem. ${err}`);
      }
   };

   const getPlaceId = async (latitude, longitude) => {
      try {
         const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${myKey}`
         );
         const returnedData = await response.json();
         getAddress(returnedData.results[0].place_id);
      } catch (err) {
         alert(`There was a problem finding your place. ${err}`);
      }
   };

   const showForm = () => {
      form.classList.remove('hidden');
      inputRestaurant.focus();
   };

   const renderRestaurantWish = (restaurantObj) => {
      const wishItem = document.createElement('li');
      const wishName = document.createElement('h2');
      const wishAddress = document.createElement('p');
      const wishReviews = document.createElement('p');
      const rowWishName = document.createElement('div');
      const rowWishAddress = document.createElement('div');
      const rowWishReviews = document.createElement('div');

      wishItem.className = 'restaurant';
      wishName.textContent = restaurantObj.name;
      wishAddress.textContent = restaurantObj.address;
      wishReviews.textContent = restaurantObj.reviews;

      rowWishName.className = 'row';
      rowWishAddress.className = 'row';
      rowWishReviews.className = 'row';

      rowWishName.append(wishName);
      rowWishAddress.append(wishAddress);
      rowWishReviews.append(wishReviews);

      wishItem.append(rowWishName, rowWishAddress, rowWishReviews);
      containerWishList.append(wishItem);
   };

   // NEW FEATURE
   const showWishList = async () => {
      try {
         const response = await fetch(`${BASE_URL}/wishList`);
         if (response.ok) {
            const returnedData = await response.json();
            returnedData.forEach((restaurantObj) => {
               renderRestaurantWish(restaurantObj);
               allRestaurantsWish.push(restaurantObj);
            });
         } else {
            throw new Error(
               `Problem getting your wish list. ${response.status}: ${response.statusText}`
            );
         }
      } catch (err) {
         alert(err);
      }
   };

   // WIP
   const addMap = (locationsArr) => {
      console.log(locationsArr);
      locationsArr.forEach((locationObj) => {
         let pos = new google.maps.LatLng(
            locationObj.latitude,
            locationObj.longitude
         );
         let mapOptions = {
            center: pos,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
         };
         let map = new google.maps.Map(
            document.getElementById('map'),
            mapOptions
         );
      });
   };

   // NEW FEATURE
   const createLocations = (locationsArr) => {
      locationsArr.forEach((obj) =>
         nearbyLocations.push({
            latitude: obj.latitude,
            longitude: obj.longitude,
            title: obj.name,
            marker: null,
         })
      );
   };

   // NEW FEATURE
   const loadNearbyMap = async (position) => {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const coords = [latitude, longitude];

      const taBASE_URL =
         'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?';

      const options = {
         method: 'GET',
         headers: {
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
            'X-RapidAPI-Key': myTAkey,
         },
      };

      try {
         const response = await fetch(
            `${taBASE_URL}latitude=${latitude}&longitude=${longitude}`,
            options
         );
         if (response.ok) {
            const returnedData = await response.json();
            createLocations(returnedData.data);
            addMap(nearbyLocations);
         } else {
            throw new Error(
               `Problem getting your map. ${response.status}: ${response.statusText}`
            );
         }
      } catch (err) {
         alert(err);
      }
   };

   const loadMap = (position) => {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const coords = [latitude, longitude];
      const markerPopup = `<p id="markerPopup">Click to enter restaurant info.</p>`;

      // Leaflet 3rd party library to render a map
      map = L.map('map').setView(coords, mapZoomLevel);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
         attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
         .addTo(map)
         .bindPopup(markerPopup)
         .openPopup()
         .on('click', () => {
            showForm();
            getPlaceId(latitude, longitude);
         });
   };

   const getPosition = (feature) => {
      if (navigator.geolocation) {
         if (feature === 'log') {
            navigator.geolocation.getCurrentPosition(loadMap, () =>
               alert('Sorry, unable to get your position')
            );
         } else if (feature === 'find') {
            navigator.geolocation.getCurrentPosition(loadNearbyMap, () =>
               alert('Sorry, unable to get your position')
            );
         }
      }
   };

   const initialize = () => {
      getPosition('log');
      getRestaurants();
   };

   // HANDLERS
   const handleNewRestaurant = (e) => {
      const newRestaurantEntry = Object.fromEntries(
         new FormData(e.target).entries()
      );
      const found = allRestaurants.find(
         (restaurantObj) =>
            restaurantObj.name.toLowerCase() ===
            newRestaurantEntry.name.toLowerCase()
      );

      !found
         ? addNewRestaurant(newRestaurantEntry)
         : alert(`${newRestaurantEntry.name} is already on your list.`);
   };

   const handleLike = async (e) => {
      const likedBtn = document.getElementById(`${e.target.id}`);

      likedBtn.style.color === 'red'
         ? (likedBtn.style.color = 'white')
         : (likedBtn.style.color = 'red');

      try {
         const response = await fetch(
            `${BASE_URL}/restaurants/${likedBtn.id}`,
            {
               method: 'PATCH',
               headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
               },
               body: JSON.stringify({
                  liked: likedBtn.style.color === 'red' ? true : false,
               }),
            }
         );
         const returnedData = await response.json();
         returnedData.liked
            ? alert(`Glad you like ${returnedData.name}`)
            : null;
      } catch (err) {
         alert(`There was a problem updating your like. ${err}`);
      }
   };

   const handleRemoveWishList = async (e) => {
      console.log(`Remove restaurant ${e.target}`);
   };

   // EVENTS
   form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleNewRestaurant(e);
   });

   containerRestaurants.addEventListener('click', (e) => {
      e.stopPropagation();
      handleLike(e);
   });

   // add event listener for find restaurant and hide log
   findRestaurantsLink.addEventListener('click', (e) => {
      e.preventDefault();
      logRestaurant.style.display = 'none';
      findRestaurant.style.display = 'block';
      showWishList();
      getPosition('find');
   });

   // NEW FEATURE TBD: delete restaurant from wish list
   containerWishList.addEventListener('click', (e) => {
      console.log(`Wish list restaurant clicked ${e.target}`);
      e.stopPropagation();
      handleRemoveWishList(e);
   });

   initialize();
})();
