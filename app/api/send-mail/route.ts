const sendmail = require('sendmail')();


export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const availibility = searchParams.get('availibility')

    const isAvailable = availibility === 'true'

    sendmail({
        from: 'no-reply@yourdomain.com',
        to: 'ikea-lampen-verfügbarkeit@nevergonnahappen.de',
        subject: `Lampe ${isAvailable ? '' : 'nicht'} verfügbar`,
        html: `<a href="https://www.ikea.com/de/de/p/varmblixt-tisch-wandleuchte-led-orange-glas-rund-80499199/">
                    LAMPE IST ${!isAvailable ? "NICHT" : ""} VERFÜGBAR
                </a>`
    }, function (err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
    return Response.json({success: true})
}
