import { connect } from 'ts-nats';

async function start() {
  try {
    const nc = await connect({
      servers: ['nats://localhost:4222'],
    });
    const data = JSON.stringify({
      id: 'myid',
      data: { name: 'John' },
      reply: 'reply',
    });
    const reply = await nc.request(
      'hello',
      5000,
      // JSON.stringify({ data: "Hello", id: "myid" }),
      data,
    );
    console.log({ reply });

  } catch (err) {
    console.log('err', err)
  }
}

start();
