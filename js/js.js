const inputSearch = document.querySelector(".ip-search")
const button = document.querySelector(".search-button")
const ip = document.getElementById("data-ip")
const currentLocation = document.getElementById("data-location")
const timeZone = document.getElementById("data-time-zone")
const isp = document.getElementById("data-isp")
let map = L.map('map').setView([-32.12365, -52.36254], 17)

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZW5tYW51ZWxlIiwiYSI6ImNsMXFkcWRtNTEzZ20zam1vbXYxc3VmZDcifQ.6wcdLFx15YK3NNq_Vk4ezA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZW5tYW51ZWxlIiwiYSI6ImNsMXFkcWRtNTEzZ20zam1vbXYxc3VmZDcifQ.6wcdLFx15YK3NNq_Vk4ezA'
}).addTo(map)

let icon = L.icon({
    iconUrl: "../../assets/images/icon-location.svg",

    iconSize:     [38, 55],
})

const myLocation = () => {
    fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_72EZM1z0shBF37zbDWinVdiAyRdXj")
    .then(res => res.ok == true ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    .then(res => {
        ip.textContent = res.ip
        currentLocation.textContent = `${res.location.city}, ${res.location.region}`
        timeZone.textContent = res.location.timezone
        isp.textContent = res.isp
        map.setView([res.location.lat, res.location.lng], 16)
        let market = L.marker([res.location.lat, res.location.lng], {icon: icon}).addTo(map)
    })
}
document.addEventListener("DOMContentLoad",myLocation())

let locat

inputSearch.addEventListener("change", () => {
    locat = inputSearch.value
})

button.addEventListener("click", (e) => {
    e.preventDefault()
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_72EZM1z0shBF37zbDWinVdiAyRdXj&ipAddress=${locat}`)
    .then(res => res.ok == true ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    .then(res => {
        ip.textContent = res.ip
        currentLocation.textContent = `${res.location.city}, ${res.location.region}`
        timeZone.textContent = res.location.timezone
        isp.textContent = res.isp
        map.setView([res.location.lat, res.location.lng], 16)
        let market = L.marker([res.location.lat, res.location.lng], {icon: icon}).addTo(map)
    })
})

