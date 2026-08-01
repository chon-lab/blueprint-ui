#!/bin/sh
set -e

if [ -n "$VAULT_API_URL" ] && [ -n "$VAULT_PROJECT" ] && [ -n "$VAULT_TOKEN" ] && [ -n "$VAULT_ENVIRONMENT" ]; then
  echo "=> Fetching secrets from ChonVault at $VAULT_API_URL for project $VAULT_PROJECT in env $VAULT_ENVIRONMENT..."
  
  response=$(curl -s -w "\n%{http_code}" -H "X-Vault-Token: $VAULT_TOKEN" "$VAULT_API_URL/api/v1/projects/$VAULT_PROJECT/environments/$VAULT_ENVIRONMENT/secrets/all")
  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | sed '$d')
  
  if [ "$http_code" -eq 200 ]; then
    echo "=> Secrets fetched successfully. Generating env-config.js..."
    # Processa o JSON retornado para extrair os segredos (trata caso venha num objeto 'data' ou direto no root)
    echo "window._env_ = $(echo "$body" | jq -c 'if .data then .data else . end');" > /usr/share/nginx/html/env-config.js
  else
    echo "=> ERROR: Failed to fetch secrets from ChonVault. HTTP Code: $http_code"
    echo "Response: $body"
    echo "window._env_ = {};" > /usr/share/nginx/html/env-config.js
  fi
else
  echo "=> Vault variables not provided. Skipping ChonVault integration."
  echo "window._env_ = {};" > /usr/share/nginx/html/env-config.js
fi

echo "=> Starting NGINX..."
exec "$@"
