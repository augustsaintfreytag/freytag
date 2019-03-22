source ./env/provision-dev.env

DOCKER_VOLUME="freytag_data-letsencrypt"
OUT_DIRECTORY_BASE="ssl"

OUT_ROOT_CA_KEY_NAME="rootCA.key"
OUT_ROOT_CA_PEM_NAME="rootCA.pem"

OUT_ROOT_CA_KEY_PATH=$OUT_DIRECTORY_BASE/$OUT_ROOT_CA_KEY_NAME
OUT_ROOT_CA_PEM_PATH=$OUT_DIRECTORY_BASE/$OUT_ROOT_CA_PEM_NAME

if ! test -f "$OUT_ROOT_CA_KEY_PATH"
then
	echo "Root key does not exist and will be generated."
	
	# Generate Root CA Key
	openssl genrsa -des3 -passout pass:$PLACEHOLDER_PASSWORD -out $OUT_ROOT_CA_KEY_PATH 2048

	# Generate Root CA Pem
	openssl req -x509 -passin pass:$PLACEHOLDER_PASSWORD -passout pass:$PLACEHOLDER_PASSWORD -new -nodes -key $OUT_ROOT_CA_KEY_PATH -sha256 -days 1024 -subj '/CN=localhost/O=N\/A/C=DE' -out $OUT_ROOT_CA_PEM_PATH
else
	echo "Root key already exists, will not be generated."
fi

for DOMAIN_NAME in $(echo $DOMAIN_NAMES_SSL | sed "s/,/ /g")
do
	OUT_DIRECTORY=$OUT_DIRECTORY_BASE/$DOMAIN_NAME
	OUT_KEY_PATH=$OUT_DIRECTORY/out.key
	OUT_PEM_PATH=$OUT_DIRECTORY/out.pem
	OUT_CSR_PATH=$OUT_DIRECTORY/out.csr
	OUT_CRT_PATH=$OUT_DIRECTORY/out.crt

	if ! test -f "$OUT_CRT_PATH"
	then
		echo "Generating local certificate for domain '$DOMAIN_NAME'."

		mkdir $OUT_DIRECTORY
		
		# Generate Domain-specific Key
		openssl req -new -sha256 -nodes -out $OUT_CSR_PATH -newkey rsa:2048 -keyout $OUT_KEY_PATH -config ./ssl-server.csr.cnf

		# Generate Certificate
		openssl x509 -req -in $OUT_CSR_PATH -CA $OUT_ROOT_CA_PEM_PATH -CAkey $OUT_ROOT_CA_KEY_PATH -CAcreateserial -out $OUT_CRT_PATH -days 500 -sha256 -passin pass:$PLACEHOLDER_PASSWORD -extfile ./ssl-v3.ext
	else
		echo "Certificate for domain '$DOMAIN_NAME' already exists."
	fi
done

echo "Copying ssl contents from '$PWD' to volume named '$DOCKER_VOLUME'."
docker run --rm -v "$PWD":/source -v $DOCKER_VOLUME:/etc/letsencrypt alpine /bin/sh -c "mkdir -p /etc/letsencrypt/live/ && cp -R /source/ssl/* /etc/letsencrypt/live/"
docker run -v $DOCKER_VOLUME:/etc/letsencrypt frapsoft/openssl dhparam -dsaparam -out /etc/letsencrypt/dhparam-2048.pem 2048