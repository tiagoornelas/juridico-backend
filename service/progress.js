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
    const suitors = await results.evaluate((result) =>
      document.querySelector('.rich-table-cell:nth-child(2)')
      .innerText.split('\n')[2]);

    const hashLawsuitNumber = getHashFromElement(firstResult);
    const newTab = await browser.newPage();
    await newTab.goto(`${DEFAULT_URL}${hashLawsuitNumber}`);

    // Lawsuit info
    const jurisdiction = await newTab.evaluate((el) =>
      document.querySelector('.rich-stglpanel-body table tbody tr:nth-child(2) td')
      .innerText.split('\n')[1]);

    const subject = await newTab.evaluate((el) =>
    document.querySelector('.rich-stglpanel-body table tbody tr:nth-child(1) td:nth-child(4)')
    .innerText.split('\n')[1]);

    //Lawsuit progress
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
    return {
      court: 'TRF-1',
      lawsuit,
      jurisdiction,
      subject,
      suitors,
      progress,
    }
  }

  return getLawsuitProgress(lawsuit);
}

module.exports = { getLawsuitTRF1 };