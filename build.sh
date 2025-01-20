echo NUDGE_EAP_NODE_ENV

if [ ${NUDGE_EAP_NODE_ENV} == "development" ]; then
  npm run build:dev
elif [ ${NUDGE_EAP_NODE_ENV} == "development-qa" ]; then
  npm run build:qa
elif [ ${NUDGE_EAP_NODE_ENV} == "production" ]; then
  npm run build:prod
fi
