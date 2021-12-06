const puppeteer = require('puppeteer');

const acessarProcesso = async (processo) => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.goto('https://pje1g.trf1.jus.br/consultapublica/ConsultaPublica/listView.seam');
  await page.type('.value input', processo);
  await page.click(('input.btn'));
  const test = await page.waitForSelector('div td[id^="fPP:processosTable:1705856:j_id227"]');
  const link = await test.evaluate((el) => el.innerHTML);
  const url = link.split('listView.seam?ca=')[1].split(`')"`)[0];
  const processPage = await browser.newPage();
  await processPage.goto(`https://pje1g.trf1.jus.br/consultapublica/ConsultaPublica/DetalheProcessoConsultaPublica/listView.seam?ca=${url}`);
  const infoPage = await processPage.waitForSelector('td>div>div>span');
  const info = await infoPage.evaluate((el) => {
    let elements = Array.from(document.querySelectorAll('td>div>div>span'));
    let andamentos = elements.map((el) => el.innerText);
    return andamentos;
  });
  return info;
}

module.exports = acessarProcesso;