reports-react
reports-feat
React13319
Feat13319

Task list:
reports-react connect to reports-feat
reports-feat subscribe to topic on reports-mosquitto
reports-react recieving job completion messages through reports-feat

steps:
change reports-react and test
follow reports-react-checklist.md to build app
copy reports-react build to reports-feat
run reports-feat

validation
mosquitto_pub -t reports31-report-complete -h reports31 -p 30231 -m "Hello World"

# build react app
pushd ~/src/reports-react
npm run build
# copy public folder
if necessary rename the current public folder
mv ~/src/reports-react/public ~/src/reports-react/public-test
mkdir ~/src/reports-feat/public
copy recursively with same permissions
cp -rp ~/src/reports-react/build/* ~/src/reports-feat/public
