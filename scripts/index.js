const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs').promises

const { pageConfig } = require('./browser-util')
const getLinks = require('./get-links')
const getPage = require('./get-page')

async function scrape () {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  const page = await browser.newPage()
  pageConfig(page)
  
  console.log('Fetching Links')

  const links = await getLinks(page)
  await fs.writeFile(path.resolve(__dirname, '..', 'works', 'links.json'), JSON.stringify(links, null, 2))

  console.log('Fetched All Links')
  console.log('Fetching Pages')
  console.group()

  let files = []

  for (let index = 0; index < links.length; index++) {
    const link = links[index]
    try {
      const file = await getPage(page, link)
      files.push(file)

      console.log(index+1, file.name)
    } catch (error) {
      console.log(error.message)
    }
  }

  console.groupEnd()

  await fs.writeFile(path.resolve(__dirname, '..', 'works', 'files.json'), JSON.stringify(files, null, 2))

  await browser.close()
}

scrape()
