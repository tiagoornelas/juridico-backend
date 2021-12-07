const puppeteer = require('puppeteer');

const getLawsuitTRF1 = async (lawsuit) => {
  const getHashFromElement = (element) => element.split('listView.seam?ca=')[1].split(`')"`)[0];
  
  const getLawsuitProgress = async (lawsuit) => {
    const DEFAULT_URL = "https://pje1g.trf1.jus.br/consultapublica/"
    + "ConsultaPublica/DetalheProcessoConsultaPublica/listView.seam?ca=";

    const browser = await puppeteer.launch({
      headless: false,
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    });
    const trf1 = await browser.newPage();
    await trf1.goto('https://pje1g.trf1.jus.br/consultapublica/ConsultaPublica/listView.seam');
    await trf1.type('.value input', lawsuit);
    await trf1.click(('input.btn'));
    const results = await trf1.waitForSelector(
      'div td[id^="fPP:processosTable:1705856:j_id227"]'
    );
    const firstResult = await results.evaluate((result) => result.innerHTML)
    const hashLawsuitNumber = getHashFromElement(firstResult);
    const newTab = await browser.newPage();
    await newTab.goto(`${DEFAULT_URL}${hashLawsuitNumber}`);
    const progressTable = await newTab.waitForSelector('td>div>div>span');
    const progress = await progressTable.evaluate((el) => {
      let elements = Array.from(document.querySelectorAll('td>div>div>span'));
      let progress = elements.map((el) => {
        const arr = el.innerText.split(' - ');
        return {
          date: arr[0].split(' ')[0],
          time: arr[0].split(' ')[1],
          progress: arr[1],
        }
      });
      progress.pop();
      return progress;
    });
    return progress;
  }

  return getLawsuitProgress(lawsuit);
}

module.exports = { getLawsuitTRF1 };