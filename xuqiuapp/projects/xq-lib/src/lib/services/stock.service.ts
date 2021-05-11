import { MinuteQuoteParam } from './../interfaces/minute-quote-param';
import { Config } from './../configs/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpCient: HttpClient) { }

  getAllStockIndexList(symbol: string) {
      return this.httpCient.get(`${Config.host}${Config.stock_index_quote}`, {params: {symbol}})
        .pipe(
          map(res => {
            const stocks = res['data'] && res['data']['items'];
            if(stocks) {
              return stocks.map(stock => {
                return {market_status: stock['market']['status'], ...stock['quote']}
              });
            }
            return stocks;
          })
        );
  }

  calcSvg(e, t, n, a) {
    let r = Math.max.apply(null, e);
    let o = Math.min.apply(null, e);
    let i = e[e.length - 1];
    let c = Math.max(Math.abs(r - i), Math.abs(i - o));
    return c *= 1.2,
    e.map((function(e, r) {
        var o = n / 2 * (i - e) / c + n / 2;
        return Number.isNaN(o) && (o = n / 2),
        {
            x: parseInt(String(r * t / a), 10),
            y: parseInt(String(o), 10)
        }
    }
    ))
  }

  getStockIndexMinuteQuote(quote_param: MinuteQuoteParam): Observable<any> {
    const params = {
      symbol: quote_param.symbol,
      period: '1d'
    }
    return this.httpCient.get(`${Config.host}${Config.stock_index_minute_quote}`, {params}).pipe(
      map((res) => {
        let items;
        const {width, max} = quote_param;
        if(res['data'] && res['data']['items']) {
          items = res['data']['items'].map(item => item.current);
        }
        let svg_values: {x: string, y: string}[] = this.calcSvg(items, width, width/2, max);
        let svg_path_minute = svg_values.map((value, index) => {
          if(index == 0) {
            return `M${value.x} ${value.y}`;
          }
          return `L${value.x} ${value.y}`;
        }).join(' ');
        return {items,svg_path_minute};
      })
    );
  }
}
