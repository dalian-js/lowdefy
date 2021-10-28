/*
  Copyright 2020-2021 Lowdefy, Inc

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

import createAuthorize from './createAuthorize';
import createReadConfigFile from './readConfigFile';
import verifyAuthorizationHeader from './verifyAuthorizationHeader';

async function createContext({ buildDirectory, connections, secrets }) {
  const readConfigFile = createReadConfigFile({ buildDirectory });
  // TODO: Should this move to server config?
  const config = await readConfigFile('config.json');
  function contextFn({ headers, host, logger, protocol, setHeader }) {
    const context = {
      config,
      connections,
      headers,
      host,
      logger,
      protocol,
      readConfigFile,
      secrets,
      setHeader,
    };
    const { authenticated, user, roles } = verifyAuthorizationHeader(context);
    context.authorize = createAuthorize({ authenticated, roles });
    context.authenticated = authenticated;
    context.user = user;
    return context;
  }
  return contextFn;
}

export default createContext;
