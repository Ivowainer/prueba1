const Container = require('./Container.js')
let products = new Container('products.txt')

module.exports = products

let test1 = async () => {
    try {
        await products.save({
            title: 'Escuadra',                     
            price: 123.45,           
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
        })
        await products.save({
            title: 'Calculadora',
            price: 234.56,       
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
        })
        await products.save({
            title: 'Globo Terráqueo',
            price: 345.67,           
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
        })
    } catch(error) {
        console.log(error)
    }
}
//test1()
