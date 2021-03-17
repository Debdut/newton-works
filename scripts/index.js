const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs').promises

const { pageConfig } = require('./browser-util')
const getLinks = require('./get-links')
const getPage = require('./get-page')

async function scrape () {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  pageConfig(page)
  
  console.log('Fetching Links')

  const links = await getLinks(page)
  await fs.writeFile(path.resolve(__dirname, '..', 'works', 'links.json'), JSON.stringify(links, null, 2))

  console.log('Fetched All Links')
  console.log('Fetching Pages')
  console.group()

  for (let index = 0; index < links.length; index++) {
    const link = links[index]
    try {
      const name = await getPage(page, link)
      console.log(index+1, name)
    } catch (error) {
      console.log(error.message)
    }
  }

  console.groupEnd()

  await browser.close()
}

scrape()