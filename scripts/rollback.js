#!/usr/bin/env node
// Script para fazer rollback para versão anterior

const GitHubFirebaseAutomation = require('../src/github-firebase-automation');
require('dotenv').config();

const commitSha = process.argv[2];

if (!commitSha) {
    console.error('❌ Uso: npm run rollback <commit-sha>');
    process.exit(1);
}

async function performRollback() {
    console.log(`🔄 Iniciando rollback para commit: ${commitSha}`);
    
    const automation = new GitHubFirebaseAutomation({
        githubToken: process.env.GITHUB_TOKEN,
        repository: process.env.GITHUB_REPOSITORY,
        firebaseConfig: {
            projectId: process.env.FIREBASE_PROJECT_ID
        }
    });
    
    try {
        await automation.rollback(commitSha);
        console.log('✅ Rollback concluído com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro no rollback:', error.message);
        process.exit(1);
    }
}

performRollback();