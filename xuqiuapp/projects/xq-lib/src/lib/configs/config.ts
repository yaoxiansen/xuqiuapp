export const Config = {
    time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    host: 'http://localhost:8080',
    send_verify_code: '/api/verifycode',
    login: '/api/login',
    stock_index_quote: '/api/index/quote',
    stock_index_minute_quote: '/api/quote/minute/chart',
    fetech_news: '/api/news/query',
    type_ahead_query_stock: '/api/typeahead/stock',
    fetch_hot_stocks: '/api/index/hotStock',
    fetch_live_news: '/api/news/live'
}