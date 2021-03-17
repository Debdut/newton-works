const path = require('path')
const fs = require('fs').promises
const filenamify = require('filenamify')

const BASE_URL = 'http://www.newtonproject.ox.ac.uk'

async function getPage (page, link) {
  const url = BASE_URL + link
  const id = link
    .split('/')
    .pop()

  await page.goto(url, { waitUntil: 'domcontentloaded' })

  // let html = await page.content()
  const delayTime = (html.length / 20) + 2000
  const name = (await page.evaluate(() => {
    const heading = document.querySelector('h1')
    return heading.innerText
      .trim()
  }))
  let partName = name
    .split('(')[0]
  if (partName.length > 0) {
    partName = partName
      .substring(0, 50)
      .split(' ')
    partName.pop()
    partName = partName
      .join(' ')
  }
  
  // await delay(delayTime)
  // await page.evaluate(() => {
  //   ['#contact', '#sponsors', '#hd', '#search', '#buttons']
  //   .map(selector => document.querySelector(selector)
  //   .remove())
  //   const heading = document.querySelector('h1')
    
  //   heading.style.fontSize = '50px'
  //   heading.style.fontWeight = 500
  //   heading.style.textAlign = 'center'
  // })
  // html = await page.content()
  
  const fileName = filenamify(`${partName} - Isaac Newton [${id}]`)

  // await fs.writeFile(path.resolve(__dirname, '..', 'works', 'html', `${fileName}.html`), html)
  // await page.pdf({ path: path.resolve(__dirname, '..', 'works', 'pdf', `${fileName}.pdf`), format: 'A4' })

  return { name, fileName }
}

module.exports = getPage

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  })
}