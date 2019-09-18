const cluster = require('cluster');
const numberOfCPU = require('os').cpus().length;

// TODO add socket.io-redis and sticky-session/own implementation
// to enable clustering while upgrading sockets

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    console.log(`Setting up ${numberOfCPU} workers`);
    for (let x = 0; x < numberOfCPU; ++x) {
        cluster.fork();
    }
} else {
    console.log(`Worker ${process.pid} has started`);
}

cluster.on('exit', (worker, code, signal)=>{
    console.log(`Worker ${worker.id} has exited`);
    console.log("Starting a new one");
    cluster.fork();
});