export interface Stock {
    amount?: number;
    amplitude?: number;
    avg_price?: number;
    chg?: number;
    code?: string;
    coordinates?: any[];
    currency?: string;
    current?: number;
    current_year_percent?: number;
    exchange?: string;
    float_market_capital?: number;
    float_shares?: number;
    high?: number;
    issue_date?: number;
    last_close?: number;
    lock_set?: number;
    lot_size?: number;
    low?: number;
    market_capital?: number;
    max: number;
    market_status?: string;
    name?: string;
    open?: number;
    percent?: number;
    status?: number;
    sub_type?: string;
    symbol: string;
    tick_size?: number;
    time?: number;
    timestamp?: number;
    total_shares?: number;
    turnover_rate?: number;
    type?: number;
    volume?: number;
}

