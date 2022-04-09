const inputSearch = document.querySelector(".ip-search")
const button = document.querySelector(".search-button")
const ip = document.getElementById("data-ip")
const currentLocation = document.getElementById("data-location")
const timeZone = document.getElementById("data-time-zone")
const isp = document.getElementById("data-isp")

button.addEventListener("click", (e) => {
    e.preventDefault()
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_4o0kCV0BClBandpmlq8MFweNjkcHV&ipAddress=${inputSearch.value}`)
    .then(res => res.ok == true ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    .then(res => {
        ip.textContent = res.ip
        currentLocation.textContent = `${res.location.city}, ${res.location.region}`
        timeZone.textContent = res.location.timezone
        isp.textContent = res.isp
    })
})

const iii = () => {
    fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_4o0kCV0BClBandpmlq8MFweNjkcHV")
    .then(res => res.ok == true ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    .then(res => {
        ip.textContent = res.ip
        currentLocation.textContent = `${res.location.city}, ${res.location.region}`
        console.log(res.location.lat)
        console.log(res.location.lng)
        timeZone.textContent = res.location.timezone
        isp.textContent = res.isp

        let map = L.map('map').setView([res.location.lat, res.location.lng], 16)
        L.marker([res.location.lat, res.location.lng]).addTo(map)

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZW5tYW51ZWxlIiwiYSI6ImNsMXFkcWRtNTEzZ20zam1vbXYxc3VmZDcifQ.6wcdLFx15YK3NNq_Vk4ezA', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZW5tYW51ZWxlIiwiYSI6ImNsMXFkcWRtNTEzZ20zam1vbXYxc3VmZDcifQ.6wcdLFx15YK3NNq_Vk4ezA'
        }).addTo(map);
    })
}
document.addEventListener("DOMContentload", iii())
