/*
  Copyright 2020-2023 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

const codes = {
  1: 'PERMISSION_DENIED',
  2: 'POSITION_UNAVAILABLE',
  3: 'TIMEOUT',
};

async function GeolocationCurrentPosition({ globals, params }) {
  try {
    const position = await new Promise((resolve, reject) => {
      globals.window.navigator.geolocation.getCurrentPosition(resolve, reject, params);
    });
    return {
      coords: {
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed,
      },
      timestamp: position.timestamp,
    };
  } catch (error) {
    // eslint-disable-next-line no-undef
    if (error.constructor.name === 'GeolocationPositionError') {
      return { code: error.code, error: codes[error.code], message: error.message };
    }

    throw error;
  }
}

export default GeolocationCurrentPosition;