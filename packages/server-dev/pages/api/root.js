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

import { createApiContext, getRootConfig } from '@lowdefy/api';

import config from '../../build/config.json';
import fileCache from '../../lib/fileCache.js';
import getServerSession from '../../lib/auth/getServerSession.js';

export default async function handler(req, res) {
  const session = await getServerSession({ req, res });
  const apiContext = createApiContext({
    buildDirectory: './build',
    config,
    fileCache,
    logger: console,
    session,
  });
  const rootConfig = await getRootConfig(apiContext);

  res.status(200).json(rootConfig);
}
