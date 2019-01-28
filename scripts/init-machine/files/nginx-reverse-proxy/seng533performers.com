
server {
	listen 80;
	listen [::]:80;

	return 301 https://seng533performers.com$request_uri;
}

server {
	listen 443 ssl;
	listen [::]:443 ssl;

	server_name seng533performers.com www.seng533performers.com;

	# hsts
	add_header Strict-Transport-Security "max-age=31536000" always;

	location / {
		proxy_pass http://127.0.0.1:9000;
	}
}
