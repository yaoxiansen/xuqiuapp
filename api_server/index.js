let express = require('express');
let axios = require('axios');
let qs = require('qs');

let app = express();

const options = {
    headers: {
        'authority': 'stock.xueqiu.com',
        'method': 'GET',
        'path': '/v5/stock/batch/quote.json?symbol=SH000001,SZ399001,SZ399006,SH000688,HKHSI,HKHSCEI,HKHSCCI,.DJI,.IXIC,.INX',
        'scheme': 'https',
        'accept': 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
        'cookie': 'device_id=24700f9f1986800ab4fcc880530dd0ed; s=dy1gv8q8s0; Hm_lvt_1db88642e346389874251b5a1eded6e3=1619621252,1619698346,1620012592,1620058867; cookiesu=541620296584979; snbim_minify=true; xq_a_token=4b4d3f5b97e67b975f4e1518dc4c417ebf0ad4c4; xqat=4b4d3f5b97e67b975f4e1518dc4c417ebf0ad4c4; xq_r_token=960e1d453ab676f85fa80d2d41b80edebfde8cc0; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTYyMjUxNTc5MiwiY3RtIjoxNjIwMzcwNzc1ODgxLCJjaWQiOiJkOWQwbjRBWnVwIn0.bTXLWDWaRzqtheuGLdglS2MYqilFhZ-coZLH8prK4BZMiAiSDQuyc7zLbonnvaH7BlQyFBHpclkTO47G7h_JFa2HLZlx9djQiiHUEEJi5ozB9Uv_-yHKqy0kDJyk0CY9U3h31hlIJubJ8YQ-h-OKVX2sSKTJIAObAOyYvQApam2tAa8zwIQJaii2dmfs1bE9LL6MJv3QCYGfbIxv3X_1OuVfZ9cOfNjS4UGUMb3AmpOvKgKvb9vxL9dC8cFlj6zHDhestW9cO5BKyddpj7jXVi6vLkDmHJdBKGThjH2Q0fiktrAwdiu_ltpAhNo6HG_IgG4s8Dy2NmEIUe4IQHhFpg; u=811620370833552; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1620370834',
        'origin': 'https://xueqiu.com',
        'referer': 'https://xueqiu.com/',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
    }
}

const v2Options = {
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Cookie': 'device_id=24700f9f1986800ab4fcc880530dd0ed; s=dy1gv8q8s0; __utmz=1.1619532354.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utma=1.804280959.1619532354.1620062436.1620118622.5; cookiesu=541620296584979; Hm_lvt_1db88642e346389874251b5a1eded6e3=1619698346,1620012592,1620058867,1620454700; xq_a_token=4b4d3f5b97e67b975f4e1518dc4c417ebf0ad4c4; xqat=4b4d3f5b97e67b975f4e1518dc4c417ebf0ad4c4; xq_r_token=960e1d453ab676f85fa80d2d41b80edebfde8cc0; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTYyMjUxNTc5MiwiY3RtIjoxNjIwNzg1MjMxMzAzLCJjaWQiOiJkOWQwbjRBWnVwIn0.MQvq3BK-ZSgEIIrOaE1Mvx92X14ClA0klEm9_JeW3n5Q2_pqbuOW-eJsVcVJsKl6vFsPtOa1BVoFF13ee-4ynw4FspM5rEl-gRxXOFOWovL-FJpfe9kw0r0-hDAo4hrJT6eEoa6QywXAbLwKn-wLWc48SP6jo1Ngq8JS3cP2uLczTu83z8zay3XoLz3zz45YXLfU3PcmYSgqLAS5YiZrOCq3MXhbn7OCSTvWEd5vYQsV7hsx4H2_d2xlHmB3l5EqOg8A1fAFT53WgUby71fwY_fnxBCNuN3LKk99F7uFzoN6CPyODnLB8_tXzEaW9bM39ZhG-NXRDqQ3zZcZVH17pA; u=501620785281354',
        'elastic-apm-traceparent': '00-acf58a583be80cc20ebcd52e4dbddb7d-34dd41b6a7647a95-01',
        'Host': 'xueqiu.com',
        'Pragma': 'no-cache',
        'Referer': 'https://xueqiu.com/?category=snb_article',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
        'sec-ch-ua-mobile': '?0',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
    }
}

const sendVerifyCodeOptions = {
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Length': 33,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'device_id=24700f9f1986800ab4fcc880530dd0ed; s=dy1gv8q8s0; __utmz=1.1619532354.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utma=1.804280959.1619532354.1620062436.1620118622.5; cookiesu=541620296584979; Hm_lvt_1db88642e346389874251b5a1eded6e3=1619698346,1620012592,1620058867,1620454700; xq_a_token=4b4d3f5b97e67b975f4e1518dc4c417ebf0ad4c4; xqat=4b4d3f5b97e67b975f4e1518dc4c417ebf0ad4c4; xq_r_token=960e1d453ab676f85fa80d2d41b80edebfde8cc0; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTYyMjUxNTc5MiwiY3RtIjoxNjIwNDU1MTkyODczLCJjaWQiOiJkOWQwbjRBWnVwIn0.qSbHubND8pos0zvf_kFkIci4JeZs9mCdfhVp67KpTldhwzZbIhAk36n9DUA8RJaaw--fgx-A6QEW96gqpYN0kdFI_8ll_72sE4EX42i9Nz6IQ1r9c1LW55HMTTqBOI1GYDkYjw8kNhsMRE72c3zWX6dWKLxWEUytCAqXv8Q8h9KrCAA_N5qBftZXQeUCsxpxPIkihSbflPfWJNRvj40hJ1Welg9prsSaZhomMbU0ln0OxDrScEoMFpy0iEwrEM4BzTHF32nk4HVGYlzyAh5Va2-FN4R8Pt7FxvgHYYYqCPxSxlxi2jlj8x5TKV_7bM1dqnDKCat5JHGNeDvJZQpSag; u=361620455210521; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1620455212',
        'elastic-apm-traceparent': '00-bd6e43eada732cb876b7e6d9bba3124b-74d94e4e2e16002b-01',
        'Host': 'xueqiu.com',
        'Origin': 'https://xueqiu.com',
        'Pragma': 'no-cache',
        'Referer': 'https://xueqiu.com/',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
        'sec-ch-ua-mobile': '?0',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
    }
}

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))//for parsing application/x-www-form-urlencoded

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});


app.get('/', (req, res) => {
    res.send('API server');
});

app.post('/api/verifycode', async(req, res) => {
    const {areacode, telephone} = req.body;
    let httpUrl = 'https://xueqiu.com/account/sms/send_verification_code.json';
    let options = {
        method: 'POST',
        data: qs.stringify({areacode,telephone}),
        url: httpUrl,
        ...sendVerifyCodeOptions
    }
    let response = await axios(options);
    console.log(response.data,'SSSSSSSSS');
    res.send(response.data);
});

app.post('/api/login', async(req, res) => {
    let httpUrl = 'https://xueqiu.com/snb/provider/login';
    let options = {
        method: 'POST',
        data: qs.stringify(req.body),
        url: httpUrl,
        ...sendVerifyCodeOptions
    }
    let response = await axios(options);
    res.send(response.data);
});

// 热股榜
app.get('/api/index/hotStock', async (req, res) => {
    let {index} = req.query;
    let httpUrl = `https://stock.xueqiu.com/v5/stock/hot_stock/list.json?size=8&_type=${index}&type=${index}`
    let result = await axios.get(httpUrl, options);
    res.json(result.data);
})

// 指数数据
app.get('/api/index/quote', async (req, res) => {
    const {symbol} = req.query;
    let httpUrl = `https://stock.xueqiu.com/v5/stock/batch/quote.json?symbol=${symbol}`;
    let result;
    try {
        console.log('/api/index/quote')
        result = await axios.get(httpUrl,options);
        res.json(result.data);
    } catch (error) {
        console.log(error);
    }
});

app.get('/api/quote/minute/chart', async (req, res) => {
    const {symbol, period} = req.query;
    let httpUrl = `https://stock.xueqiu.com/v5/stock/chart/minute.json?symbol=${symbol}&period=${period}`;
    let result;
    try {
        result = await axios.get(httpUrl,options);
        res.json(result.data);
    } catch (error) {
        console.log(error);
    }
});

//股票新闻
app.get('/api/news/query', async (req, res) => {
    let httpUrl = 'https://xueqiu.com/statuses/hot/listV2.json?since_id=-1&max_id=-1&size=15';
    let result = await axios.get(httpUrl,v2Options);
    res.json(result.data);
});

app.listen(8080, () => {
    console.log('server start', 'http://localhost:8080/');
});