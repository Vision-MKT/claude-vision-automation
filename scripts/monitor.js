#!/usr/bin/env node
// Script para monitorar o status do sistema

const GitHubFirebaseAutomation = require('../src/github-firebase-automation');
require('dotenv').config();

async function monitorSystem() {
    console.log('📊 Monitorando sistema de automação...');
    
    const automation = new GitHubFirebaseAutomation({
        githubToken: process.env.GITHUB_TOKEN,
        repository: process.env.GITHUB_REPOSITORY,
        firebaseConfig: {
            projectId: process.env.FIREBASE_PROJECT_ID
        }
    });
    
    setInterval(async () => {
        try {
            const status = await automation.getSystemStatus();
            
            console.clear();
            console.log('🚀 CLAUDE-VISION AUTOMATION MONITOR');
            console.log('='.repeat(50));
            console.log(`⏰ ${new Date().toLocaleString()}`);
            console.log('');
            
            console.log('📡 GitHub:');
            console.log(`   Conectado: ${status.github.connected ? '✅' : '❌'}`);
            console.log(`   Repositório: ${status.github.repository}`);
            console.log('');
            
            console.log('🔥 Firebase:');
            console.log(`   Configurado: ${status.firebase.configured ? '✅' : '❌'}`);
            console.log(`   Projeto: ${status.firebase.projectId || 'N/A'}`);
            console.log('');
            
            console.log('⚙️ Automação:');
            console.log(`   Status: ${status.automation.active ? '🟢 Ativo' : '🔴 Inativo'}`);
            console.log(`   Branch: ${status.automation.monitoredBranch}`);
            
        } catch (error) {
            console.error('❌ Erro no monitoramento:', error.message);
        }
    }, 5000); // Atualiza a cada 5 segundos
}

monitorSystem();