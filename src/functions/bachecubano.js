const fetch = require("node-fetch");
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');
const { reLocations, rePhones, getPhones } = require('./libs/vars.js') ;
require("string_score");

exports.handler =  async (event, context, callback) => {
    var { q, p = 1, pmin = 1, pmax = '', province }= event.queryStringParameters;
    province = province || 'www'

    const response = await fetch(`https://${province}.bachecubano.com/search?s=${q}&min_price=${pmin}&max_price=${pmax}&page=${p}`);
    const body = await response.text();
    const $ = cheerio.load( body );

    let data = $('.product-item').map( (i,el) => {
        let $el = $(el), 
            $a = $el.find('.product-title a');

        let ad = {
            price:  parseFloat($el.find('.price').text().replace(/[^\d\.,]/g,'')),
            title:  cleaner( $a.text() ),
            url:    $a.attr('href'),
            location: $el.text().match(reLocations) ? $el.text().match(reLocations).toString() : '',
            phones: getPhones( $el.find('.product-title').text() ),
            date: 0,
            // photo:  $el.find('.lazyload').attr('data-src').replace(/__thumbnail/g, ''),
        }
        return {...ad, score: ad.title.score(q,0.5) };
    }).get();

    return {
        headers: { 
            'Content-Type':'application/json', 
            'Access-Control-Allow-Origin': '*' 
        },
        statusCode: 200,
        body: JSON.stringify(data)
    };
} // revolico
