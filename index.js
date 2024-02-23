
const axios = require('axios');
const cheerio = require('cheerio');
const XLSX = require('xlsx');

const products = [];

const getData = async () => {
    try {
       
        const { data } = await axios.get('https://nikhitha5511.github.io/datasets/', {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36',
            },
        });

        const $ = cheerio.load(data);

        $('.product-card').each((index, element) => {
            const product = {
                product_name: $(element).find('.product-name').text().trim(),
                price: $(element).find('.price').text().trim(),
                availability: $(element).find('.availability').text().trim(),
                product_rating: $(element).find('.product-rating').text().trim(),
            };

            products.push(product);
        });

        const workbook = XLSX.utils.book_new(); 
        const worksheet = XLSX.utils.json_to_sheet(products); 
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
        XLSX.writeFile(workbook, 'ouputs.xlsx'); 
        console.log('Data saved successfully to outputs.xlsx');
    } catch (error) {
        console.error(error);
    }
};

getData();




