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
import path from 'path';
import { cleanDirectory } from '@lowdefy/node-utils';
import cleanCache from './cleanCache';
import createPrint from '../../utils/print';

jest.mock('@lowdefy/node-utils', () => {
  const cleanDirectory = jest.fn();
  return { cleanDirectory };
});

jest.mock('../../utils/print', () => {
  const info = jest.fn();
  return () => ({
    info,
  });
});

const print = createPrint();

beforeEach(() => {
  cleanDirectory.mockReset();
});

test('cleanCache', async () => {
  await cleanCache({});
  const cachePath = path.resolve(process.cwd(), './.lowdefy/.cache');
  expect(cleanDirectory.mock.calls).toEqual([[cachePath]]);
  expect(print.info.mock.calls).toEqual([
    [`Cleaning cache at "${cachePath}".`],
    ['Cache cleaned.'],
  ]);
});

test('cleanCache baseDir', async () => {
  await cleanCache({ baseDirectory: 'baseDir' });
  const cachePath = path.resolve(process.cwd(), 'baseDir/.lowdefy/.cache');
  expect(cleanDirectory.mock.calls).toEqual([[cachePath]]);
  expect(print.info.mock.calls).toEqual([
    [`Cleaning cache at "${cachePath}".`],
    ['Cache cleaned.'],
  ]);
});