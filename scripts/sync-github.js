#!/usr/bin/env node
// Script para sincronizar repositório com Firebase

const GitHubFirebaseAutomation = require('../src/github-firebase-automation');
require('dotenv').config();

async function syncRepository() {
    console.log('🔄 Iniciando sincronização GitHub → Firebase...');
    
    const automation = new GitHubFirebaseAutomation({
        githubToken: process.env.GITHUB_TOKEN,
        repository: process.env.GITHUB_REPOSITORY,
        firebaseConfig: {
            projectId: process.env.FIREBASE_PROJECT_ID
        }
    });
    
    try {
        // Simula um evento de push
        const mockPayload = {
            ref: 'refs/heads/main',
            commits: [{
                id: 'manual-sync',
                message: 'Sincronização manual',
                author: { name: 'Sistema' },
                added: [],
                modified: ['*'],
                removed: []
            }],
            head_commit: {
                id: 'manual-sync',
                message: 'Sincronização manual',
                author: { name: 'Sistema' }
            }
        };
        
        await automation.handlePushEvent(mockPayload);
        console.log('✅ Sincronização concluída!');
        
    } catch (error) {
        console.error('❌ Erro na sincronização:', error.message);
    }
}

syncRepository();