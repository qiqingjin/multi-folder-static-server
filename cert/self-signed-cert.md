1. generate RSA private key
> $ openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
2. write RSA key
> $ openssl rsa -passin pass:x -in server.pass.key -out server.key
3. remove server.pass.key
> $ rm server.pass.key
4. generate certificate request
```
openssl req \
    -key server.key\
    -x509 \
    -nodes \
    -new \
    -out server.csr \
    -subj "/CN=localhost" \
    -reqexts SAN \
    -extensions SAN \
    -config <(cat /System/Library/OpenSSL/openssl.cnf \
        <(printf '[SAN]\nsubjectAltName=DNS:localhost')) \
    -sha256 \
    -days 3650
```

https://serverfault.com/questions/845766/generating-a-self-signed-cert-with-openssl-that-works-in-chrome-58