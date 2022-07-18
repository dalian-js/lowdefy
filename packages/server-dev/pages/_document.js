/*
  Copyright 2020-2022 Lowdefy, Inc

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
import Document, { Html, Head, Main, NextScript } from 'next/document';
import appJson from '../build/app.json';

class LowdefyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.webmanifest" />
          <link rel="icon" type="image/svg+xml" href="/icon.svg" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <div dangerouslySetInnerHTML={{ __html: appJson.html.appendHead }} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div dangerouslySetInnerHTML={{ __html: appJson.html.appendBody }} />
        </body>
      </Html>
    );
  }
}

export default LowdefyDocument;
