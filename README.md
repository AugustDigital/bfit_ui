## Available Scripts

In the project directory, you can run:

### `npm install`

Run before starting/building your server

### `react-scripts start`

To start a local host debug session of the react app.

### `npm react-scripts build`

To build a production bundle of this react app.

### build time parameters

`REACT_APP_API_URL` : points to api server.

### Production Build Example

1. Build production bundle by running `REACT_APP_API_URL=http://subdomain.exampledomain.com/api npm run-script build`

2. Point webserver to built bundle.
   Nginx example config:

```
server{
	listen 80;
        listen [::]:80;

        root /bfit_ui/build;

        index index.html index.htm index.nginx-debian.html;

        server_name subdomain.exampledomain.com;

        location / {
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
                try_files $uri $uri/ =404;
        }
	location /api{
                [...api config here...]
       }
}

```
