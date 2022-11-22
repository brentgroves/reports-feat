# build react app
pushd ~/src/reports-react
npm run build
# copy public folder
if necessary rename the current public folder
mv ~/src/reports-react/public ~/src/reports-react/public-test
mkdir ~/src/reports-feat/public
copy recursively with same permissions
cp -rp ~/src/reports-react/public/* ~/src/reports-feat/public
