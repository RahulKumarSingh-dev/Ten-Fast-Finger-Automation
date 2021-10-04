#!/usr/bin/env node
const puppeteer = require('puppeteer');
const link = 'https://10fastfingers.com/typing-test/english';

(async () => {
  try {
    let browser = await puppeteer.launch({
      headless: false,
      args: ['--start-maximized'],
      defaultViewport: null,
    });
    let page = await browser.newPage();
    await page.goto(link);
    await page.waitForSelector('#row1 span');
    let arr = await page.$$('#row1 span');
    let words_arr = [];
    for (let i = 0; i < arr.length; i++) {
      let word = await page.$eval(
        `#row1 span[wordnr="${i}"]`,
        (ele) => ele.innerHTML
      );
      words_arr.push(word + ' ');
    }
    for (let word of words_arr) {
      await page.type('input[type="text"]', word);
    }
  } catch (error) {
    console.log(error);
  }
})();
