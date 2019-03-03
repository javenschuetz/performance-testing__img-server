
server {
	listen 80;
	listen [::]:80;

	location / {
		proxy_pass http://127.0.0.1:9000;
	}
}

server {
	listen 443 ssl;
	listen [::]:443 ssl;

	server_name seng533performers.com www.seng533performers.com;
}
