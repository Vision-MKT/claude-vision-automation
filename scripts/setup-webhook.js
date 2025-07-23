#!/usr/bin/env node
// Script para configurar webhook automaticamente no GitHub

const fetch = require('node-fetch');
require('dotenv').config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPOSITORY = process.env.GITHUB_REPOSITORY || 'Vision-MKT/claude-vision-automation';
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://seu-servidor.com/github-webhook';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'seu-secret-super-seguro';

async function setupWebhook() {
    try {
        console.log('🔧 Configurando webhook no GitHub...');
        
        const webhookConfig = {
            name: 'web',
            active: true,
            events: ['push', 'pull_request', 'release', 'issues'],
            config: {
                url: WEBHOOK_URL,
                content_type: 'json',
                secret: WEBHOOK_SECRET,
                insecure_ssl: '0'
            }
        };
        
        const response = await fetch(
            `https://api.github.com/repos/${REPOSITORY}/hooks`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(webhookConfig)
            }
        );
        
        if (response.ok) {
            const webhook = await response.json();
            console.log('✅ Webhook configurado com sucesso!');
            console.log(`📋 ID: ${webhook.id}`);
            console.log(`🔗 URL: ${webhook.config.url}`);
        } else {
            const error = await response.json();
            console.error('❌ Erro ao configurar webhook:', error.message);
        }
        
    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
}

setupWebhook();