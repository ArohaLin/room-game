#!/usr/bin/env python3
"""《回家的鑰匙》本機伺服器:綁定 0.0.0.0、停用快取(手機/預覽每次都拿最新)。
用法:python3 serve.py [port]   (預設 8000)
"""
import os, sys, http.server, socketserver

os.chdir(os.path.dirname(os.path.abspath(__file__)))  # 永遠服務本專案目錄
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True

with Server(("0.0.0.0", PORT), NoCacheHandler) as httpd:
    print(f"Serving {os.getcwd()} at http://0.0.0.0:{PORT} (no-cache)")
    httpd.serve_forever()
