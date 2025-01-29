echo UNIMATE_NODE_ENV

if [ ${UNIMATE_NODE_ENV} == "development" ]; then
  npm run build:dev
elif [ ${UNIMATE_NODE_ENV} == "development-qa" ]; then
  npm run build:qa
elif [ ${UNIMATE_NODE_ENV} == "production" ]; then
  npm run build:prod
fi
