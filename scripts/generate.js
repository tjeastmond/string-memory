/**
 * A simple script to batch submit strings to the input endpoint.
 * Make sure the server is running first, of course. The script will
 * sleep for 150ms every 100 submissions.
 *
 * You can run this script directly: `time node generate.js`, or from the root
 * of the project with: `npm run insert`.
 *
 * The quotes are from:
 * - Borderlands' Psychos (game)
 * - Fight Club
 * - Haruki Murakami novels
 * - Mr. Robot
 */

const axios = require('axios');

const randomStrings = [
  `Autumn Victoria`,
  `Bring me a bucket, and I'll show you a bucket.`,
  `BURY ME UPSIDE DOWN!`,
  `Death is not the opposite of life, but a part of it`,
  `Don't feel sorry for yourself. Only assholes do that.`,
  `Figs the cat`,
  `How do I take off a mask when it stops being a mask...`,
  `I want you to hit me as hard as you can.`,
  `I wanted to save the world.`,
  `I wonder what ants do on rainy days?`,
  `I'm good at reading people. My secret? I look for the worst in them.`,
  `It's only after we've lost everything that we're free to do anything.`,
  `Melissa Melissa Melissa Melissa Melissa Melissa Melissa!!!`,
  `Nothing is static, everything is evolving, everything is falling apart.`,
  `Silence, I discover, is something you can actually hear.`,
  `Sticking feathers up your butt does not make you a chicken.`,
  `The things you own end up owning you.`,
  `We're all living in each other's paranoia.`,
  `What makes us the most normal, is knowing that we're not normal.`,
  `When we lose our principles, we invite chaos.`,
  `You are not special. You are not a beautiful or unique snowflake.`,
  `You can't kill me! I'm already dead tomorrow!`,
];

function randomString() {
  return randomStrings[Math.floor(Math.random() * randomStrings.length)];
}

function sleep(ms, count) {
  console.log(`Inserted: ${count}`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateRecords(num = 100, port = 9000) {
  const endpoint = `http://localhost:${port}/input`;
  for (let i = 1; i <= num; i++) {
    if (i % 100 === 0 && i > 0) await sleep(150, i);
    axios
      .post(endpoint, randomString(), {
        headers: { 'Content-Type': 'text/plain' },
      })
      .catch(() => console.log('Connection reset?!'));
  }
}

generateRecords(1_000);

module.exports = generateRecords;
