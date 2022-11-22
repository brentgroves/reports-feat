feathersjs.org
nvm install --lts
nvm use 18.12.1

# clone repo
pushd ~/src
git clone git@github.com:brentgroves/reports-feat.git

# install libraries
npm install @feathersjs/feathers --save
npm install @feathersjs/socketio @feathersjs/express --save
npm install @feathersjs/configuration --save

npm i mqtt --save