 /// <reference path="declare.d.ts"/>

 export default class Coinyee {
  // 挂单
  static baseUrl: string = 'http://www.coinyee.io';

  constructor(protected coinFrom: string, protected coinTo: string) {}
  getJSON(url: string, data = {}, method = 'get') {
    return $.ajax({
        url,
        data,
        dataType: 'json'
      });
  }
  createOrder(price: string, amount: string, type = 'buy') {
    let { coinFrom: coin, coinTo: unit } = this;
    // amount.match(/\.\d{2}()/)
    return this.getJSON('/server/trade/pending', {
      coin,
      unit,
      type,
      price,
      amount
    }, 'post');
  }
  cancelOrder(id: string) {
    let { coinFrom: coin, coinTo: unit } = this;
    return this.getJSON('/server/trade/cancel', {
      coin, unit, id
    });
  }
  getWallet() {
    return this.getJSON('/server/user/wallet');
  }
  getMyOrders(status = 'pending', offset = 0, limit = 100) {
    let { coinFrom: coin, coinTo: unit } = this;
    return this.getJSON('/server/trade/get_list_by_user_status', {
      coin,
      unit,
      status,
      offset,
      limit
    }, 'post');
  }

  // since 为上一条数据中 trades 的最后一条数据的时间戳
  getDepthAndKLine(since?: string,range: number = 86400000, prevTradeTime: number = Date.now()) {
    let { coinFrom, coinTo } = this;
    return this.getJSON('/kline/proxy.php', {
      symbol: `${coinFrom + coinTo}`.toUpperCase(),
      range,
      since, prevTradeTime
    })
  }
}