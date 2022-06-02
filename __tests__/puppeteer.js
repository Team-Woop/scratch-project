const puppeteer = require('puppeteer');


it('has a btn',(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto('http://localhost:8080')
  //await page.waitForNavigation({ waitUntil: 'networkidle0' });
  expect(await page.waitForSelector('#btn')).toBeTruthy();
  browser.close();
})) 

it('has usable input field',(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto('http://localhost:8080')
  //await page.waitForNavigation({ waitUntil: 'networkidle0' });
  await page.focus('#mpg');
  await page.keyboard.type('30');
  const input = await page.$eval('#mpg', el => el.value);
  expect(input).toBe('30');
  browser.close();
})) 




describe('sending out APT request',()=>{
  let page;
  let browser;
 beforeAll(async()=>{
  browser = await puppeteer.launch({headless: false});
  page = await browser.newPage();
  await page.goto('http://localhost:8080')
  //await page.waitForNavigation({ waitUntil: 'networkidle0' });
  await page.focus('#mpg');
  await page.keyboard.type('30');
  await page.focus('#originCity');
  await page.keyboard.type('Seattle');
  await page.focus('#originState');
  await page.keyboard.type('WA');
  await page.focus('#destinationCity');
  await page.keyboard.type('Plano');
  await page.focus('#destinationState');
  await page.keyboard.type('TX');
  await page.click('#btn');
  //await page.waitForNavigation({waitUntil: 'networkidle2'});
  },20000);
  it('can send out API request',(async () => {
    const input = await page.$eval('#totalCost', el => el.innerText);
    expect(input).toBe('Total Cost: loading...');
    browser.close();
  })) 
})

