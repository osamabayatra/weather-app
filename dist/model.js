class CitiesData {
    constructor() { this.cityData = [] }

    getData() { return JSON.stringify(this.cityData) }

    async getDataFromDB() {
        // this.cityData = []
        let res = await $.get('/cities')
        this.cityData = res
    }

    async getCityData(cityName) {
        let res = await $.get(`/city/${cityName}`)
        this.cityData.push(res)
        return res
    }

    async saveCity(obj) {
        const res = await $.ajax({
            url: '/city',
            method: 'POST',
            data: obj
        })
        // this.getDataFromDB()
    }


    async removeCity(cityName) {
        const res = await $.ajax({
            url: `/city/${cityName}`,
            method: 'DELETE'
        })
        // this.getDataFromDB()
    }

}