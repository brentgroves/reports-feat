const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const configuration = require('@feathersjs/configuration');
var mqtt=require('mqtt');
// const client = require('@jsreport/nodejs-client')('http://localhost:5488');

// A messages service that allows to create new
// and return all existing messages
class MessageService {
  constructor() {
    this.messages = [];
  }

  async find () {
    // Just return all our messages
    return this.messages;
  }

  async create (data) {
    // The new message is the data merged with a unique identifier
    // using the messages length since it changes whenever we add one
    const message = {
      id: this.messages.length,
      text: data.text
    }
    // console.log('call render');
    // render().catch(console.error)
    // Add new message to the list
    this.messages.push(message);
    // const bodyBuffer = await res.body()

    return message;
  }
}

class ReportService {
  constructor() {
    this.reports = [];
  }

  async find () {
    // Just return all our messages
    // return this.reports;
    console.log('In find()')
    return '22';
  }

  async create (data) {
    // const message = {
    //   id: this.messages.length,
    //   text: data.text
    // }
    console.log('In create()')
    return '22';
  }
}
// Creates an ExpressJS compatible Feathers application
const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Host static files from the current folder
// app.use(express.static(__dirname));
// Host the public folder
// app.use(express.static(__dirname + '/public'));
app.use('/', express.static(app.get('public')));

// Add REST API support
app.configure(express.rest());
// Configure Socket.io real-time APIs
app.configure(socketio());
// Register an in-memory messages service
app.use('/reports', new ReportService());
// Register an in-memory messages service
app.use('/messages', new MessageService());

// Register a nicer error handler than the default Express one
app.use(express.errorHandler());

// Add any new real-time connection to the `everybody` channel
app.on('connection', connection =>
  app.channel('everybody').join(connection)
);
// Publish all events to the `everybody` channel
app.publish(data => app.channel('everybody'));

// Start the server
app.listen(3030).on('listening', () =>
  console.log('Feathers server listening on localhost:3030')
);

// For good measure let's create a message
// So our API doesn't look so empty
app.service('messages').create({
  text: 'Hello world from the server'
});

// https://www.macrometa.com/iot-infrastructure/node-js-mqtt
const options = {
  port: 30231,
  host: 'reports31',
  clientId: 'myclient',
};

const client = mqtt.connect(options)

client.on('connect', function () {
  console.log('connected to reports31')
  client.subscribe('mytopic', function (err) {
    // if (!err) {
    //   client.publish('mytopic', 'Hello mqtt')
    // }
  })  
});

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  // client.end()
  app.service('reports').create({
    text: message.toString()
  });
  
})