const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");
const express = require('express')
const mustacheExpress = require('mustache-express')

const app = express();
app.engine('html', mustacheExpress());
app.set('view engine', 'html');

app.get('/export/pdf', (req, res) => {
    (async () => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            var templateHtml = fs.readFileSync(path.join(process.cwd(), 'template.html'), 'utf8');
            var template = handlebars.compile(templateHtml);
            var html = template(data);
            var options = {
                width: '1230px',
                headerTemplate: "<p></p>",
                footerTemplate: "<p></p>",
                displayHeaderFooter: false,
                margin: {
                    top: "10px",
                    bottom: "30px"
                },
                printBackground: true,
            }

            await page.goto(`data:text/html;charset=UTF-8,${html}`, {
                waitUntil: 'networkidle0'
            });

            const buffer = await page.pdf(options)
            res.type('application/pdf')
            res.send(buffer)
            console.log('Called')
            browser.close()
        } catch (error) {
            console.log('ABSH', error)
        }
    })()
})

app.listen(3001, ()=> { console.log('Server Started at:  http://localhost:3001')});

const data =  {
    students: [{
        title: "A new Brazilian School",
        date: "05/12/2018",
        name: "Rodolfo Luis Marcos",
        age: 28,
        birthdate: "12/07/1990",
        course: "Computer Science",
        obs: "Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce.",
    }, {
        title: "A new Brazilian School",
        date: "05/12/2018",
        name: "Rodolfo Luis Marcos",
        age: 28,
        birthdate: "12/07/1990",
        course: "Computer Science",
        obs: "Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce.",
    },
    {
        title: "A new Brazilian School",
        date: "05/12/2018",
        name: "Rodolfo Luis Marcos",
        age: 28,
        birthdate: "12/07/1990",
        course: "Computer Science",
        obs: "Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce.",
    }]
}