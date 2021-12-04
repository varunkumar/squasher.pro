import http.server
import ssl

DIRECTORY_TO_SERVE = "./dist"

server_address = ("localhost", 3000)


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY_TO_SERVE, **kwargs)


httpd = http.server.HTTPServer(server_address, Handler)
httpd.socket = ssl.wrap_socket(
    httpd.socket,
    server_side=True,
    keyfile="localhost-key.pem",
    certfile="localhost.pem",
    ssl_version=ssl.PROTOCOL_TLS,
)
httpd.serve_forever()
