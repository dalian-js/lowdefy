/*
  Copyright 2020 Lowdefy, Inc

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

import React from 'react';
import blockDefaults from '../blockDefaults';
import './Skeleton.css';

const Skeleton = (props) => {
  const { properties, methods } = blockDefaults(props);
  return (
    <div
      className={'skeleton ' + methods.makeCssClass(properties.style)}
      style={{ width: properties.width || '100%', height: properties.height || '100%' }}
    ></div>
  );
};

export default Skeleton;
