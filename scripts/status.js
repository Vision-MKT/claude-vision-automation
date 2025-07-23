#!/usr/bin/env node
// Script para verificar status do sistema

const GitHubFirebaseAutomation = require('../src/github-firebase-automation');
require('dotenv').config();

async function checkStatus() {
    const automation = new GitHubFirebaseAutomation({
        githubToken: process.env.GITHUB_TOKEN,
        repository: process.env.GITHUB_REPOSITORY,
        firebaseConfig: {
            projectId: process.env.FIREBASE_PROJECT_ID
        }
    });
    
    try {
        const status = await automation.getSystemStatus();
        
        console.log('📊 STATUS DO SISTEMA DE AUTOMAÇÃO');
        console.log('='.repeat(45));
        console.log('');
        
        console.log('🐙 GitHub:');
        console.log(`   Token: ${status.github.connected ? '✅ Válido' : '❌ Inválido'}`);
        console.log(`   Repositório: ${status.github.repository}`);
        console.log(`   Última sync: ${status.github.lastSync}`);
        console.log('');
        
        console.log('🔥 Firebase:');
        console.log(`   Configuração: ${status.firebase.configured ? '✅ OK' : '❌ Faltando'}`);
        console.log(`   Projeto ID: ${status.firebase.projectId || 'Não configurado'}`);
        console.log('');
        
        console.log('⚙️ Automação:');
        console.log(`   Status: ${status.automation.active ? '🟢 Ativa' : '🔴 Inativa'}`);
        console.log(`   Branch monitorada: ${status.automation.monitoredBranch}`);
        
    } catch (error) {
        console.error('❌ Erro ao verificar status:', error.message);
    }
}

checkStatus();