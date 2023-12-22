export const runtime = 'edge'; // 'nodejs' is the default

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get('id')


    var myHeaders = new Headers();
    myHeaders.append("sec-ch-ua", "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"");
    myHeaders.append("Accept", "application/json;version=2");
    myHeaders.append("Referer", "https://www.ikea.com/");
    myHeaders.append("X-Client-ID", "b6c117e5-ae61-4ef5-b4cc-e0b1e37f0631");
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
    myHeaders.append("sec-ch-ua-platform", "\"macOS\"");
    myHeaders.append("Cookie", "_abck=DD5D45A3D4DA21C10A4EEC8871B78449~-1~YAAQmEd7XBKcUGaMAQAAEHkUkQshfSggV6qxDGq0LhSY/v4orLl6jgkrMd/KmcGkZ9l/8a6sRdDe0vFvTqOvUIaFXuq+y80XBOR3GkZppjfjt/80qiRLQvMC294DNGWh18cBuwPsoPc7gD5GssTSe8sQYH42+9rw9Y+mmDTW0Zb0UGlsNzHA2v1Gi8JqjdQUT+nhuOv0jxnOXPMjb+KNtXbWLViFv+GbCsDxYI+Mhq6qMRtEQZVBt4xSfI5bDs2hnr5aYxHx/Tkm+iCap8ucdlcaKfNvea7fpCSBf8+aWeelgkS61wxtVK9+Qen3Lu0wyEXGKFGi2sKSZLchbJy29kg/d/BBwvqaw1cFMQnrhnAFKqTuWoz2ug+M~-1~-1~1703244621; bm_sz=F042AE5D51594CBFA3B310FD54C2ADCD~YAAQmEd7XBScUGaMAQAAEHkUkRZxyHo/g14jxLeFfhvIgTnNKkxccjTJCNy+u6JhpyfYo+riewDmt97HFJ9mRKRwOJeAyI86ArVZQcNWCXD3doS0CbWtLQJ2hmTwhVi/tLrSWM4aK4tb6owzlaILl5iOsUa3fkCmeX/KsfLEeF3TpwUHHLvcIq0GqYowD5ijeCkbr4PtoDUtt1/83x0cmjd/qs3aWlsrdzWmgNTyabfFk1NeaPCmbAauzpCMys8Mly4kyBSzl1T0/ETLp2dqpfIUOFE/Bh/10r4ErtMUq9I5~4470071~3229235; ak_bmsc=924EEE1BCFE754FE8D9613D087E6B282~000000000000000000000000000000~YAAQmEd7XBOcUGaMAQAAEHkUkRbwdK0Nj7kCtnDb5CmO2517mstZ5j31H06rnHwOCrZf+PDH+E2blwg54ncpMtlhKo89Ad20qYMRRG30NtjMC+njZAOZ6AAwx7HwAsZslxFtNTJ9QYTAdZMAiGE/n25kMVowDdATlLIn9dlCiZK1LWaTv0gMC5lW3Wox3rVO5NVeM36nrDw/GqkvwvtkD0s829WxMLMxHRQYoGxLJ+NqF0uUwS6jL0ck1nUvnViFwrLjnlQRY2IA1S9XSTdUGv1U4uRT4BtqO3nLh3WBfqxhV7HzjBxLXqi1LkukYC9jR5NS3guyh5u11duRES3h65l5SAblQJRum1jvG9MT5MM0H3FD0Wpd0+5aynXK744=; bm_sv=26F718FD99DD0EC24E2381052F135494~YAAQmEd7XEQWUWaMAQAAI0IakRYo0oIiHGTSCnYxPbGzqN3DPseuC5LQzmBxC3Zi+kjxauXKaraAHJuVYuaqH/ClR/o1F2elbiaE2sViOk+jCr/2g1mkgTEj8pnZCl89fN4amT8zIuwwmKB8zd+6WwR10YuFgVBzOxWd3gCm7GsxERpuVos6X4LJSCa2xhSLjm+QA9pLACepd/XhS4gmU4uBYxat+QEDZDpS/WZJWdccq7l0KLrEskFus78YYp3mHLrGcw==~1");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    let result = await
        fetch(`https://api.ingka.ikea.com/cia/availabilities/ru/de?itemNos=${id}&expand=StoresList,Restocks,SalesLocations,DisplayLocations,CollectPrice`, requestOptions)
            .then(response => response.text())
            .then(result => {
                return result
            })
            .catch(error => console.log('error', error));

    const data = JSON.parse(result)
    const filtered = data.availabilities.filter((item: any) => item.hasOwnProperty('availableForHomeDelivery'))

    fetch(`${process.env.BASE_URL}/api/send-mail?availibility=${filtered[0].availableForHomeDelivery}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((res) => {
            console.log('Response received')
            if (res.status === 200) {
                console.log('Response succeeded!')
            }

        }
    )
    return Response.json(filtered)
}
