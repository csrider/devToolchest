
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Module: process (and its implicits -like console)
//

// Suppose we have a simple program called app.js. This program prints out whatever you pass to it. You can pass it
// arguments by simply writing them after the program’s name in the terminal. Try it with: $ node app.js Hello
function commandLineInput() {
  console.log('Hey there,' , process.argv[2]); 
  //  process.argv.forEach((val, index) => {
  //   console.log(`${index}: ${val}`);
  // });
}

// Call tracing
function callTrace() {
  var smallFunction = function (){
    console.trace('Let us look at the trace');
  }
  
  var bigFunction = function () {
    smallFunction()
  }
  
  bigFunction()

  /* Output...
  Trace: Let us look at the trace
    at smallFunction (/usercode/index.js:2:11)
    at bigFunction (/usercode/index.js:6:3)
    at Object.<anonymous> (/usercode/index.js:9:1)
    at Module._compile (internal/modules/cjs/loader.js:778:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:831:12)
    at startup (internal/bootstrap/node.js:283:19)
  */
}

// Console Timer
function consoleTimer() {
  console.time('For loop time');    //start a timer with a name we pass to it as a string
  for (let i = 0; i < 100; i++) {
    // processing
  }
  console.timeEnd('For loop time'); //stop the timer with the name we gave it, and print the elapsed time since start

  console.table([{ "Fruit": "Apple", "Quantity": 5 }, { "Fruit": "Mango", "Quantity": 7 }]);
  /* Output...
  For loop time: 0.185ms
  ┌─────────┬─────────┬──────────┐
  │ (index) │  Fruit  │ Quantity │
  ├─────────┼─────────┼──────────┤
  │    0    │ 'Apple' │    5     │
  │    1    │ 'Mango' │    7     │
  └─────────┴─────────┴──────────┘
  */
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Module: readline
//

// Present and accept command line question and input from user
function consoleInput() {
  // Import the readline module so we can use it
  const readline = require('readline');

  // Readline needs an interface to work...
  // The interface can be a file or the console.
  const rl = readline.createInterface({   //create a new readline.Interface instance
    input: process.stdin,     //get input from the console (uses process module's stdin property)
    output: process.stdout    //output information to the console (uses process module's stdout property)
  });

  // What to output to the console for the user to see
  let query = 'What is your name?\n'

  // Use readline.Interface's question() method to ask a question from the console (args are string and callback)
  rl.question(query, (answer) => {
    console.log(`Hello ${answer}!`);
    rl.close();   //very important to inform the interface that we are done with console I/O, so Node can proceed
  });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Module: console & fs
//

// Console class usage
// In addition to using the console instance of the process, you can use Console class
// This gives extra/advanced functionality (e.g. making a file logger)
function fileLoggerUsingConsoleClass() {
  const fs = require('fs');
  const { Console } = require('console');

  const output = fs.createWriteStream('./stdout.log');
  const errorOutput = fs.createWriteStream('./stderr.log');

  const logger = new Console({ stdout: output, stderr: errorOutput });

  const number = 5;
  logger.log('number:', number);
  // In stdout.log: number 5
  const code = 9
  logger.error('error code:', code);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Buffer
//  Note: Buffers only store data as integers 0-255, but when output, it represents in hexadecimal notation!
//

function bufferExamples() {
  const buf1 = Buffer.alloc(10);  //Create buffer of length 10, default fill with 0
  console.log(buf1);              //<Buffer 00 00 00 00 00 00 00 00 00 00>

  const buf2 = Buffer.alloc(5, 15);   //Create buffer of length 5, fill with integers of 15
  console.log(buf2);                  //<Buffer 0f 0f 0f 0f 0f>
  buf2.write("abcedf");               //fill the buffer with string characters
  console.log(buf2);                  //<Buffer 61 62 63 65 64>

  const buf3 = Buffer.allocUnsafe(10);  //Create buffer of length 10 that may or may not be empty (is faster than alloc)
  console.log(buf3);                    //<Buffer 40 22 15 5f fd 7f 00 00 70 c1>
  buf3.fill(1);                         //fill the buffer with the integer 1
  console.log(buf3);                    //<Buffer 01 01 01 01 01 01 01 01 01 01>

  const buf4 = Buffer.from([265, 6.5, -255, '7']);  //Create buffer w/whatever is passed in (converts to binary with &255)
  console.log(buf4);                                //<Buffer 09 06 01 07>   (note how 0-255 range is enforced!!!)

  const buf5 = Buffer.from('Hello world');  //Create buffer w/string passed in (stored as binary, so you'll need toString later)
  console.log(buf5);                        //<Buffer 48 65 6c 6c 6f 20 77 6f 72 6c 64>
  console.log(buf5.toString());             //Hello world
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Events
//

function eventEmitterUnderTheHood_fireEveryTime() {
  const EventEmitter = require('events');     //import events module

  const myEmitter = new EventEmitter();       //create EventEmitter object

  someFunction = function (){                 //define listener/handler function to do something when event is emitted
    console.log('Something has happened!');
  }

  handleError = function (errorCode) {        //define listener/handler function for error events
    // do something about the error
    console.error('Woah, there was an error! \nError code:', errorCode);
  }

  myEmitter.on('Some event', someFunction);   //attach the listener/handler function to the event (when it's emitted)
                                              // (note this will fire EACH AND EVERY TIME the event is emitted)

  myEmitter.on('error', handleError);         //attach the listener/handler function to the event (when it's emitted)

  myEmitter.emit('Some event');               //emit your event

  myEmitter.emit('error', 9);                 //emit your event, also passing an argument to the listener function
}

function eventEmitterUnderTheHood_fireOnlyOnce() {
  const EventEmitter = require('events');     //import events module

  const myEmitter = new EventEmitter();       //create EventEmitter object
  
  let n = 0;
  someFunction = function (){
    n++
    console.log(`Value of n is: ${n}`);
  }
  
  myEmitter.once('event', someFunction);      //register the handler to only fire ONCE when event is emitted
  
  myEmitter.emit('event');                    //causes the handler to execute
  myEmitter.emit('event');                    //(handler will not execute)
  myEmitter.emit('event');                    //(handler will not execute)
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Simple HTML server example
//  Note: The function is just to wrap the code inside this snippets file (you would put its contents in a .js file)
//  Note: You would need an HTML file named "main.html" in the same dir as the .js file you create.
//  Note: Generally, Express makes this a lot easier, but below is the "native" way of doing it.
//
function serveSingleHtmlFile() {
  const http = require('http');
  const fs = require('fs')

  const hostname = '0.0.0.0';
  const port = 3500;

  const homePage = fs.readFileSync('main.html')

  const server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.write(homePage)
      res.end();
  });

  server.listen(port, hostname, () => {
      console.log('Server is now running');
  });
}

function serveMultipleHtmlFiles() {
  const http = require('http');
  const fs = require('fs')
  
  const hostname = '0.0.0.0';
  const port = 3500;
  
  const homePage = fs.readFileSync('main.html')
  const aboutPage = fs.readFileSync('about.html')
  
  const server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      if (req.url == '/'){
          res.write(homePage)
      } else if (req.url == '/about'){
          res.write(aboutPage)
      }else if (req.url.match(/images/g)){
          try{
              res.statusCode = 200;
              res.setHeader("Content-Type", "image/jpeg");
              imgLoc = req.url.replace('/', '../')
              image = fs.readFileSync(imgLoc)
              res.end(image);
          } catch {
              res.statusCode = 404;
              res.write("404");
              console.log(req.url)
          }
      } else {
          res.write('404')
      }
      res.end();
  });
  
  server.listen(port, hostname, () => {
      console.log('Server is now running');
  });
}