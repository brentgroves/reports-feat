http://www.steves-internet-guide.com/using-node-mqtt-client/
http://www.steves-internet-guide.com/mosquitto_pub-sub-clients/

rename public/index-mqtt-test.html to public/index.html
npm start
enter message and run report
mosquitto_pub -h reports31 -p 30231 -t mytopic -m "Hello World"
mosquitto_sub -h reports31 -p 30231 -t mytopic 