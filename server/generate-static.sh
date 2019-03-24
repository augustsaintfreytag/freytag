BASE=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
APP_DIR=$BASE/../app

APP_BUILD_GEN_VOLUME=freytag_data-app-build-generated
APP_BUILD_VAR_VOLUME=freytag_data-app-build-nuxt
APP_NODE_MODULES_VOLUME=freytag_data-app-node-modules

docker run -ti --rm \
-v "$APP_DIR/nuxt.config.ts":/var/app/nuxt.config.ts:cached \
-v "$APP_DIR/package.json":/var/app/package.json:cached \
-v "$APP_DIR/tsconfig.json":/var/app/tsconfig.json:cached \
-v "$APP_DIR/vue-shim.d.ts":/var/app/vue-shim.d.ts:cached \
-v "$APP_DIR/yarn.lock":/var/app/yarn.lock:cached \
-v "$APP_DIR/plugins":/var/app/plugins:cached \
-v "$APP_DIR/assets":/var/app/assets:cached \
-v "$APP_DIR/static":/var/app/static:cached \
-v "$APP_DIR/components":/var/app/components:cached \
-v "$APP_DIR/layouts":/var/app/layouts:cached \
-v "$APP_DIR/pages":/var/app/pages:cached \
-v $APP_BUILD_GEN_VOLUME:/var/app/build \
-v $APP_NODE_MODULES_VOLUME:/var/app/node_modules \
-v $APP_BUILD_VAR_VOLUME:/var/lib/nuxt \
node:latest bash -c 'cd /var/app && yarn && yarn generate'