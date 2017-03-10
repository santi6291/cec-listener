# cec-listener
User Interface for controlling tv via [Pulse-Eight/libcec](https://github.com/Pulse-Eight/libcec)

Currently only tested on Raspberry pi, but should work on any device that [Pulse-Eight/libcec](https://github.com/Pulse-Eight/libcec) can be installed on

# Getting Started

- Clone this repo
- run `make install-cec` this will install cec client on machine
- run `make install` this will install node dependecias
  - Node handle websocker sync, cec stdin/out and web interface
- lastly update content inside `.env`
- Now run either `make server-prod` or `make server-dev` 

# Roadmap
- Play with volume and channel up/down
- Toggle power of other HDMI devices
- add more options like numbers control etc


nginx reverse proxy
```
upstream cec.example.com {
	server localhost:8000;
}
server {
	server_name cec.example.com;
	listen 80 ;
	access_log /var/log/nginx/access.log;
	location / {
		proxy_pass http://cec.example.com;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
	}
}

upstream tv.example.com {
	server localhost:8001;
}

server {
	server_name tv.example.com;
	listen 80 ;
	access_log /var/log/nginx/access.log;
	
	location / {
		proxy_pass http://tv.example.com;
	}
}
```