import https from 'node:https';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const VAULT_API_URL = process.env.VAULT_API_URL || 'https://destinations.taile90e91.ts.net:8082/vault';
const VAULT_PROJECT = process.env.VAULT_PROJECT || 'blueprint-ui';
const VAULT_ENVIRONMENT = process.env.VAULT_ENVIRONMENT || 'dev';
const VAULT_TOKEN = process.env.VAULT_TOKEN;

if (!VAULT_TOKEN) {
  console.error('❌ ERRO: A variavel de ambiente VAULT_TOKEN nao foi fornecida.');
  console.error('Uso no Windows (PowerShell): $env:VAULT_TOKEN="seu_token"; $env:VAULT_ENVIRONMENT="dev"; npm run dev:vault');
  process.exit(1);
}

console.log(`=> Buscando segredos do ChonVault no ambiente ${VAULT_ENVIRONMENT} para o projeto ${VAULT_PROJECT}...`);

const url = `${VAULT_API_URL}/api/v1/projects/${VAULT_PROJECT}/environments/${VAULT_ENVIRONMENT}/secrets/all`;
const client = url.startsWith('https') ? https : http;

// Disable strict SSL in case of self-signed certs over Tailscale
const options = {
  headers: { 'X-Vault-Token': VAULT_TOKEN },
  rejectUnauthorized: false
};

client.get(url, options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      try {
        const json = JSON.parse(data);
        const secrets = json.data || json;
        const configContent = `window._env_ = ${JSON.stringify(secrets)};`;
        
        const outPath = path.join(__dirname, '..', 'public', 'env-config.js');
        fs.writeFileSync(outPath, configContent);
        
        console.log(`✅ Segredos baixados e injetados com sucesso em public/env-config.js!`);
      } catch (e) {
        console.error('❌ ERRO ao parsear resposta do cofre:', e);
      }
    } else {
      console.error(`❌ ERRO: Falha ao buscar segredos. Status: ${res.statusCode}`);
      console.error(data);
    }
  });
}).on('error', (err) => {
  console.error('❌ ERRO de rede:', err.message);
});
