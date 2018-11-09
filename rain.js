const puppeteer = require('puppeteer');

const amount = process.argv[2]

if (!amount || isNaN(parseFloat(amount))) {
  console.error('Please enter a numeric amount as an argument')
  process.exit(1)
}

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://www.cocorahs.org/Login.aspx');

  await page.type('#txtUsername', 'KevinLamping')
  await page.type('#txtPassword', process.env.KEVINS_SECRET_PASSWORD)

  await Promise.all([
    page.waitForNavigation(), // The promise resolves after navigation has finished
    page.click('#btnLogin') // Clicking the link will indirectly cause a navigation
  ]);

  const rainInput = await page.$('#frmReport_prTotalPrecip__ctl1_tbPrecip')
  await rainInput.click({clickCount:3})
  await rainInput.type(amount)

  await page.click('#frmReport_btnSubmitTop')

  await page.screenshot({path: 'example.png'});

  console.log('Rainfall Submitted!');

  await browser.close();
})();