pip install -r requirements.txt
: For versions <= Node v14:
: cd JapaneseLearningLogFrontend && npm install && npm run build

: For versions > Node v12:
SET NODE_OPTIONS=--openssl-legacy-provider
cd JapaneseLearningLogFrontend && npm install --legacy-peer-deps && npm run build