const BASE_URL = 'http://www.newtonproject.ox.ac.uk/texts/newtons-works/all?n=25&name=1&tr=1&sort=date&order=asc'
const MAX_PAGES = 30

async function getLinks (page) {
  let links = []

  console.group()
  
  for (let index = 1; index < MAX_PAGES; index += 25) {
    const url = `${BASE_URL}&sr=${index}`
    try {
      const pageLinks = await getLinksonPage(page, url)
      links = links.concat(pageLinks)

      console.log(`Page ${parseInt(index / 25)}`)
    } catch (error) {
      console.error(error.message)
    }
  }

  console.groupEnd()

  return links
}

async function getLinksonPage (page, url) {
  const extractLinks = () => {
    const selector = 'a'

    const links = Array.from(document.querySelectorAll(selector))
      .map(a => a.getAttribute('href'))
      .filter(s => s && s.indexOf('/view/texts/normalized/') === 0)
    
    return links
  }

  await page.goto(url, { waitUntil: 'domcontentloaded' })

  const links = await page.evaluate(extractLinks)

  return links
}

module.exports = getLinks