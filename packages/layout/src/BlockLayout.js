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

import React from 'react';
import { Col } from 'antd';
import deriveLayout from './deriveLayout.js';
import { blockDefaultProps } from '@lowdefy/block-utils';

const alignSelf = (align) => {
  if (align === 'bottom') {
    return 'flex-end';
  }
  if (align === 'top') {
    return 'flex-start';
  }
  if (align === 'middle') {
    return 'center';
  }
  return align;
};

const BlockLayout = ({ id, blockStyle, children, highlightBorders, layout = {}, makeCssClass }) => {
  if (layout.disabled) {
    return (
      <div id={id} className={makeCssClass(blockStyle)}>
        {children}
      </div>
    );
  }
  return (
    <Col
      {...deriveLayout(layout)}
      style={{
        alignSelf: alignSelf(layout.align),
        border: highlightBorders && '1px dashed #8eccf5',
      }}
      id={id}
      className={makeCssClass(blockStyle)}
    >
      {children}
    </Col>
  );
};

BlockLayout.defaultProps = blockDefaultProps;

export default BlockLayout;
