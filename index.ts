import { connect } from 'ts-nats';

async function start() {
  try {
    const nc = await connect('nats://localhost:4222');
    const testData = JSON.stringify({ value: 5 });

    // nc.publish('reply', testData, 'руддщ');

    await nc.subscribe('hello', (err, msg) => {
      if (err) {
        console.log('subscribe err', err)
        return;
      }

      const requestData = JSON.parse(msg.data);

      console.log('requestData.reply', requestData.reply)

      if (requestData.reply) {
        console.log('here')
        nc.publish(requestData.reply, JSON.stringify(requestData));
      }
    }, { queue: 'job.workers' });

    await nc.subscribe('hello', (err, msg) => {
      console.log('subscribe 2')
    }, { queue: 'job.workers' })

  } catch (err) {
    console.log('err', err)
  }
}

start();
