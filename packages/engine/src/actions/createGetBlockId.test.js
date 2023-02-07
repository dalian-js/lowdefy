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
import { jest } from '@jest/globals';

import testContext from '../../test/testContext.js';

const lowdefy = {
  _internal: {
    actions: {
      Action: ({ methods: { getBlockId }, params }) => {
        return getBlockId(params);
      },
    },
  },
};

const RealDate = Date;
const mockDate = jest.fn(() => ({ date: 0 }));
mockDate.now = jest.fn(() => 0);

// Comment out to use console
console.log = () => {};
console.error = () => {};

beforeEach(() => {
  global.Date = mockDate;
});

afterAll(() => {
  global.Date = RealDate;
});

test('getBlockId no params', async () => {
  const pageConfig = {
    id: 'root',
    type: 'Box',
    blocks: [
      {
        id: 'button',
        type: 'Button',
        events: {
          onClick: [
            {
              id: 'a',
              type: 'Action',
            },
          ],
        },
      },
    ],
  };
  const context = await testContext({
    lowdefy,
    pageConfig,
  });
  const button = context._internal.RootBlocks.map['button'];
  const res = await button.triggerEvent({ name: 'onClick' });
  expect(res).toEqual({
    blockId: 'button',
    bounced: false,
    endTimestamp: { date: 0 },
    event: undefined,
    eventName: 'onClick',
    responses: {
      a: {
        response: 'button',
        index: 0,
        type: 'Action',
      },
    },
    startTimestamp: { date: 0 },
    success: true,
  });
});
