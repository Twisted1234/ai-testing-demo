import { test, expect } from '@playwright/test';
import { BatchInfo, Configuration, EyesRunner, VisualGridRunner, BrowserType, DeviceName, ScreenOrientation, Eyes, Target } from '@applitools/eyes-playwright';

// Setup für die AI-Augen
export let Runner;
export let Batch;

test.beforeAll(async () => {
    // Der Runner steuert die Tests
    Runner = new VisualGridRunner({ testConcurrency: 5 });
    Batch = new BatchInfo({name: 'AI Testing Demo Batch'});
});

test('Visual AI Test der Startseite', async ({ page }) => {
    // Initialisiere Eyes
    const eyes = new Eyes(Runner);
    const config = new Configuration();

    config.setBatch(Batch);
    config.setApiKey(process.env.APPLITOOLS_API_KEY); // Holt Key aus GitHub Secrets
    
    // Definiere Browser-Größen (Responsive Testing)
    config.addBrowser(800, 600, BrowserType.CHROME);
    config.addBrowser(1600, 1200, BrowserType.FIREFOX);
    config.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);

    eyes.setConfiguration(config);

    // 1. Seite öffnen (Lokal oder live URL - für GitHub Actions nutzen wir meist einen statischen Server oder eine echte URL. 
    // TRICK FÜR DEMO: Wir laden den HTML Content direkt, wenn keine URL da ist, oder nutzen eine einfache file:// Logik, 
    // aber GitHub Actions braucht einen Webserver. 
    // --> EINFACHSTE LÖSUNG UNTEN IM WORKFLOW)
    await page.goto('http://localhost:8080'); 

    // 2. AI "öffnet die Augen"
    await eyes.open(page, 'Vortrag Demo App', 'Startseite Test');

    // 3. DER CHECK - Die KI macht ein Foto und vergleicht es mit der "Baseline"
    await eyes.check('Ganze Seite', Target.window().fully());

    // 4. Test beenden
    await eyes.close();
});

test.afterAll(async () => {
    // Ergebnisse hochladen
    const results = await Runner.getAllTestResults();
    console.log(results);
});