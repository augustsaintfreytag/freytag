BASE=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source "$BASE/env/provision-dev.env"

OUT_DIRECTORY_BASE=$BASE/ssl

echo "Provisioning development system with base ssl directory at '$OUT_DIRECTORY_BASE'."

OUT_ROOT_CA_KEY_NAME="rootCA.key"
OUT_ROOT_CA_PEM_NAME="rootCA.pem"

OUT_ROOT_CA_KEY_PATH=$OUT_DIRECTORY_BASE/$OUT_ROOT_CA_KEY_NAME
OUT_ROOT_CA_PEM_PATH=$OUT_DIRECTORY_BASE/$OUT_ROOT_CA_PEM_NAME

mkdir "$OUT_DIRECTORY_BASE"

#############################################################
#                   ROOT CERTIFICATE                        #
#############################################################

if ! test -f "$OUT_ROOT_CA_KEY_PATH"
then
	echo "Root key does not exist and will be generated."
	
	# Generate Root CA Key
	openssl genrsa -des3 -passout pass:$PLACEHOLDER_PASSWORD -out "$OUT_ROOT_CA_KEY_PATH" 2048

	# Generate Root CA Pem
	openssl req -x509 -passin pass:$PLACEHOLDER_PASSWORD -passout pass:$PLACEHOLDER_PASSWORD -new -nodes -key "$OUT_ROOT_CA_KEY_PATH" -sha256 -days 1024 -subj '/CN=Local\ Certificate\ Authority/O=N\/A/C=DE' -out "$OUT_ROOT_CA_PEM_PATH"
else
	echo "Root key already exists, will not be generated."
fi

#############################################################
#                   DOMAIN CERTIFICATES                     #
#############################################################

ORIGINAL_IFS=$IFS
IFS=","

# Remove Certificates
docker run --rm -v $VOLUME_SSL:/etc/letsencrypt alpine /bin/sh -c "mv /etc/letsencrypt/live /etc/letsencrypt/live-`date +%s`"

echo "$DOMAIN_NAMES_SSL" | while read -d';' i j; do
	DOMAIN_NAME=$i
	DOMAIN_NAME_ALIAS=$j

	OUT_DIRECTORY=$OUT_DIRECTORY_BASE/$DOMAIN_NAME
	OUT_KEY_PATH=$OUT_DIRECTORY/privkey.pem
	OUT_CSR_PATH=$OUT_DIRECTORY/out.csr
	OUT_CRT_PATH=$OUT_DIRECTORY/fullchain.pem

	DOMAIN_CONFIG_PATH=$BASE/ssl-server-$DOMAIN_NAME.cnf
	DOMAIN_V3_PATH=$BASE/ssl-server-v3-$DOMAIN_NAME.ext

	if ! test -f "$OUT_CRT_PATH"
	then
		echo "Generating local certificate for domain '$DOMAIN_NAME' with alias '$DOMAIN_NAME_ALIAS'."

		mkdir "$OUT_DIRECTORY"
		
		# Generate Domain-specific Key
		openssl req -new -sha256 -nodes -out "$OUT_CSR_PATH" -newkey rsa:2048 -keyout "$OUT_KEY_PATH" -config "$DOMAIN_CONFIG_PATH"

		# Generate Certificate
		openssl x509 -req -in "$OUT_CSR_PATH" -CA "$OUT_ROOT_CA_PEM_PATH" -CAkey "$OUT_ROOT_CA_KEY_PATH" -CAcreateserial -out "$OUT_CRT_PATH" -days 500 -sha256 -passin pass:$PLACEHOLDER_PASSWORD -extfile "$DOMAIN_V3_PATH"
	else
		echo "Certificate for domain '$DOMAIN_NAME' (alias '$DOMAIN_NAME_ALIAS') already exists."
	fi

	# Copy Certificates
	echo "Copying ssl contents from '$OUT_DIRECTORY_BASE' to volume named '$VOLUME_SSL'."
	docker run --rm -v "$OUT_DIRECTORY_BASE":/source/ssl -v $VOLUME_SSL:/etc/letsencrypt alpine /bin/sh -c "mkdir -p /etc/letsencrypt/live/ && cp -R /source/ssl/* /etc/letsencrypt/live/"

	echo "Setting up alias in ssl volume '$VOLUME_SSL' for domain '$DOMAIN_NAME' as link named '$DOMAIN_NAME_ALIAS'."
	docker run --rm -v $VOLUME_SSL:/etc/letsencrypt alpine /bin/sh -c "ln -s /etc/letsencrypt/live/$DOMAIN_NAME /etc/letsencrypt/live/$DOMAIN_NAME_ALIAS"
done

IFS=$ORIGINAL_IFS

docker run -v $VOLUME_SSL:/etc/letsencrypt frapsoft/openssl dhparam -dsaparam -out /etc/letsencrypt/dhparam-2048.pem 2048