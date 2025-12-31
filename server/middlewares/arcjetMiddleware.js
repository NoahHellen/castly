import arcjet, { detectBot, shield, tokenBucket } from '@arcjet/node';
import 'dotenv/config';

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ['ip.src'],
  rules: [
    shield({ mode: 'LIVE' }),
    detectBot({
      mode: 'LIVE',
      allow: ['CATEGORY:SEARCH_ENGINE'],
    }),
    tokenBucket({
      mode: 'LIVE',
      refillRate: 30,
      interval: 5,
      capacity: 20,
    }),
  ],
});

export async function arcjectMiddleware(req, res, next) {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: 'Too Many Requests' });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: 'Bot access denied' });
      } else {
        res.status(403).json({ error: 'Forbidden' });
      }
      return;
    }

    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(403).json({ error: 'Spoofed bot detected' });
      return;
    }

    next();
  } catch (error) {
    console.log('Arcjet error', error);
    next(error);
  }
}
