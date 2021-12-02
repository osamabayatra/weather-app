let data = new CitiesData();
let renderer = new Renderer();

async function loadPage() {
    await data.getDataFromDB()
    renderer.renderData(data.getData())
}

$(document).ready(async function () {
    loadPage()
})

async function handleSearch() {
    let res = await data.getCityData($('input').val())
    renderer.renderData(JSON.stringify([res]))
}

$('#search-btn').on('click', handleSearch)

$('#results').on('click', '.save-btn', function () {
    let name = $(this).closest('.save-remove-btns').siblings('.city-info').find('h2').text();
    let temperature = $(this).closest('.save-remove-btns').siblings('.city-info').find('h4').text();
    let condition = $(this).closest('.save-remove-btns').siblings('.city-info').find('h3').text();
    let src = $(this).closest('.save-remove-btns').siblings('.city-info').find('img').attr('src')
    let icon = regexSrcAttribute(src)
    data.saveCity({
        name: name,
        temperature: temperature,
        condition: condition,
        conditionPic: icon
    })
    loadPage()
})

$('#results').on('click', '.remove-btn', async function () {
    let name = $(this).closest('.save-remove-btns').siblings('.city-info').find('h2').text();
    await data.removeCity(name)
    loadPage()
})

function regexSrcAttribute(src) {
    let re = /(\/\w+@)/
    let charsArr = src.match(re)[0].split('')
    charsArr.shift()
    charsArr.pop()
    return charsArr.join('')
}

$('input').val('haifa')
