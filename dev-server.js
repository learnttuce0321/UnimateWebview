// https://nextjs.org/docs/advanced-features/custom-server

// server.js
import next from 'next';
import { readFileSync } from 'fs';
import { createServer } from 'https';
import { parse } from 'url';

const dev = process.env.UNIMATE_NODE_ENV === 'local';
const port = parseInt(process.env.PORT, 10) || 443;
const hostname = process.env.UNIMATE_HOST || 'local.uni-mate.co.kr';

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev: true, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(
    {
      key: readFileSync('local.uni-mate.co.kr-key.pem'),
      cert: readFileSync('local.uni-mate.co.kr.pem'),
    },
    async (req, res) => {
      try {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true);

        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error occurred handling', req.url, err);
        res.statusCode = 500;
        res.end('internal server error');
      }
    }
  ).listen(port, (err) => {
    if (err) throw err;
    console.log(
      `> Ready on https://${hostname}${port === 443 ? '' : `:${port}`}`
    );
  });
});
