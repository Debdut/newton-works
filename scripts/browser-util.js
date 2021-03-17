const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4298.0 Safari/537.36'

async function autoScroll(page){
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0
      const distance = 100
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight
        window.scrollBy(0, distance)
        totalHeight += distance

        if(totalHeight >= scrollHeight){
          clearInterval(timer)
          resolve()
        }
      }, 100)
    })
  })
}

async function pageConfig (page) {
  page.setUserAgent(USER_AGENT)
  await page.setViewport({ width: 1920, height: 1200, deviceScaleFactor: 1 })
}

module.exports = { autoScroll, pageConfig }