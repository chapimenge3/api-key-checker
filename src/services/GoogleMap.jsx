import React, { useState } from 'react';
import axios from 'axios';

const GoogleMap = () => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState({});


  const featureInfo = {
    'Static Maps': {
      'url': "https://maps.googleapis.com/maps/api/staticmap?center=45%2C10&zoom=7&size=400x400&key={API_KEY}",
      'description': "Static Maps API costs $2 per 1000 requests",
      'link': "https://developers.google.com/maps/documentation/maps-static/usage-and-billing",
    },
    'Street View': {
      'url': "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=40.720032,%20-73.988354&key={API_KEY}",
      "description": "Street View API costs $7 per 1000 requests",
      "link": "https://developers.google.com/maps/documentation/streetview/usage-and-billing",
    },
    'Directions': {
      "url": "https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key={API_KEY}",
      "description": "Directions API costs $5 per 1000 requests",
      "link": "https://developers.google.com/maps/documentation/directions/usage-and-billing",
    },
    'Geocoding': {
      "url": "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key={API_KEY}",
      "description": "Geocoding API costs $5 per 1000 requests",
      "link": "https://developers.google.com/maps/documentation/geocoding/usage-and-billing",
    },
    'Distance Matrix': {
      "url": "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Vancouver+BC|Seattle&destinations=San+Francisco|Vancouver+BC&key={API_KEY}",
      "description": "Distance Matrix API costs $5 per 1000 requests",
      "link": "https://developers.google.com/maps/documentation/distance-matrix/usage-and-billing",
    },
    'Places': {
      "url": "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key={API_KEY}",
      "description": "Places API costs $17 per 1000 requests",
      "link": "https://developers.google.com/maps/documentation/places/web-service/usage-and-billing",
    },
    'Place Details': {
      "url": "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,rating,formatted_phone_number&key={API_KEY}",
      "description": "Place Details API costs $17 per 1000 requests",
      "link": "https://developers.google.com/maps/documentation/places/web-service/details#usage-and-billing",
    },
    'Autocomplete': {
      "url": "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Bingh&types=%28cities%29&key={API_KEY}",
      "description": "Autocomplete API costs $2.83 per 1000 requests",
      "link": "https://developers.google.com/maps/documentation/places/web-service/autocomplete#usage-and-billing",
    },
    'Elevation': {
      "url": "https://maps.googleapis.com/maps/api/elevation/json?locations=39.7391536,-104.9847034&key={API_KEY}",
      "description": "Elevation API costs $5 per 1000 requests",
      "link": "https://developers.google.com/maps/documentation/elevation/usage-and-billing",
    },
    'Time Zone': {
      "url": "https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=1331161200&key={API_KEY}",
      "description": "Time Zone API costs $5 per 1000 requests",
      "link": "https://developers.google.com/maps/documentation/timezone/usage-and-billing",
    },
    'Nearest Roads': {
      "url": "https://roads.googleapis.com/v1/nearestRoads?points=60.170880,24.942795|60.170879,24.942796|60.170877,24.942796&key={API_KEY}",
      "description": "Nearest Roads API costs $10 per 1000 requests",
      "link": "https://developers.google.com/maps/documentation/roads/nearest#usage-and-billing",
    },
    'Geolocation': {
      "url": "https://www.googleapis.com/geolocation/v1/geolocate?key={API_KEY}",
      "description": "Geolocation API costs $5 per 1000 requests",
      "link": "https://developers.google.com/maps/documentation/geolocation/usage-and-billing",
    },
    'Snap to Roads': {
      "url": "https://roads.googleapis.com/v1/snapToRoads?path=-35.27801,149.12958|-35.28032,149.12907|-35.28099,149.12929&key={API_KEY}",
      "description": "Snap to Roads API costs $10 per 1000 requests",
      "link": "https://developers.google.com/maps/documentation/roads/snap#usage-and-billing",
    },
    'Speed Limits': {
      "url": "https://roads.googleapis.com/v1/speedLimits?path=60.170880,24.942795|60.170879,24.942796|60.170877,24.942796&key={API_KEY}",
      "description": "Speed Limits API costs $10 per 1000 requests",
      "link": "https://developers.google.com/maps/documentation/roads/speed-limits#usage-and-billing",
    },
    'Nearby Search': {
      "url": "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key={API_KEY}",
      "description": "Nearby Search API costs $32 per 1000 requests",
      "link": "https://developers.google.com/maps/documentation/places/web-service/search#usage-and-billing",
    },
    'Text Search': {
      "url": "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Sydney&key={API_KEY}",
      "description": "Text Search API costs $32 per 1000 requests",
      "link": "https://developers.google.com/maps/documentation/places/web-service/search#TextSearchRequests",
    },
    'Place Photos': {
      "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key={API_KEY}",
      "description": "Place Photos API costs $7 per 1000 requests",
      "link": "https://developers.google.com/maps/documentation/places/web-service/photos#usage-and-billing",
    },
    'FCM API': {
      "url": "https://fcm.googleapis.com/fcm/send",
      "description": "FCM API costs $0.40 per 1000 requests",
      "link": "https://firebase.google.com/docs/cloud-messaging/usage",
    },
    'Javascript API': {
      "render": true,
      "link": "<script async defer src='https://maps.googleapis.com/maps/api/js?key={API_KEY}&callback=initMap'></script>",
      "description": "Javascript API costs $7 per 1000 requests",
      "link": "https://developers.google.com/maps/documentation/javascript/usage-and-billing",
    }
  }

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const handleCheckApiKey = async () => {
    setIsLoading(true);
    setResult({});

    var tmpResult = {};

    for (const feature in featureInfo) {
      try {
        var url = featureInfo[feature].url.replace("{API_KEY}", apiKey);
        const response = await axios.get(url);
        if (response.status === 200) {
          tmpResult[feature] = {
            "name": `${feature} Working`,
            "pricing": featureInfo[feature].description,
            "link": featureInfo[feature].link,
          }
          console.log(feature, 'is working', url);
        }
      } catch (error) {
        console.log(feature, 'is not working');
      }
    }

    setIsLoading(false);
    setResult(tmpResult);
  };

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <h1 className="title">Google Map</h1>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label">API Key</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={handleApiKeyChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                className={`button is-primary ${isLoading ? 'is-loading' : ''}`}
                onClick={handleCheckApiKey}
              >
                Check API Key
              </button>
              <p className="help">
                The Feature section will be updated after checking the API key
              </p>
            </div>

          </div>
        </div>
        <div className="column">
          <div className="content">
            <h2 className="subtitle">Results</h2>
            <div>
              {Object.keys(result).length ? (
                <pre>{JSON.stringify(result, null, 2)}</pre>
              ) : (isLoading ? <p>Loading...</p> : <pre>No valid API key found</pre>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
