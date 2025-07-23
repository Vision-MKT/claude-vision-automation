// Sistema principal de automação GitHub + Firebase
const GitHubFirebaseAutomation = require('./github-firebase-automation');
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// Configuração da automação
const automation = new GitHubFirebaseAutomation({
    githubToken: process.env.GITHUB_TOKEN,
    repository: process.env.GITHUB_REPOSITORY || 'Vision-MKT/claude-vision-automation',
    branch: process.env.GITHUB_BRANCH || 'main',
    webhookSecret: process.env.WEBHOOK_SECRET,
    firebaseConfig: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
    }
});

// Configurar webhook
automation.setupWebhook(app);

// Rota de status
app.get('/status', async (req, res) => {
    const status = await automation.getSystemStatus();
    res.json(status);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor de automação rodando na porta ${PORT}`);
});