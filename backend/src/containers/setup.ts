import Docker from "dockerode"

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

const containers = await docker.listContainers({ all: true });
const container = await docker.createContainer({
  Image: 'nginx:latest',
  name: 'test-nginx'
});

await container.start();
console.log('Container started!');