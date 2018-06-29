import Coinyee from './Coinyee';
declare let Promise : any;

export default class CoinyeeStrategy extends Coinyee {
  constructor(coinFrom: string, coinTo: string) {
    super(coinFrom, coinTo);
  }
  async task(): Promise<any> {
    // 查询账户
    let [{ data: wallet }, { data: depthAndKLine } ] = await Promise.all([this.getWallet(), this.getDepthAndKLine()]);
    let { coinFrom, coinTo } = this;

    if (wallet) {
      let { depths: { asks, bids }, lines : klines, trades } = depthAndKLine;
      let remainFrom = wallet[coinFrom.toUpperCase()];
      let remainTo = wallet[coinTo.toUpperCase()];

      if (remainFrom.balance > 1) {
        // 卖
        let price = this.calcPrice(asks, 'sell');
        console.log('sell', price, coinFrom);
        if (price > 0) {
          // this.createOrder(price, coinFrom, 'sell');
        }
      }
      if (remainTo.balance > 1) {
        // 买
        let price = this.calcPrice(asks, 'buy');
        console.log('buy', price, coinTo);
        if (price > 0) {
          let amount = remainTo.balance / (price as number);
          this.createOrder(price as string, String(amount), 'buy');
        }
      }
    }
    // 先查询市场深度

  }
  calcPrice(depth: object[], type: ('buy' | 'sell') = 'buy'): (string | -1) {
    if (type === 'buy') {
      depth.sort((a, b) => b[0] - a[0]);
    } else {
      depth.sort((a, b) => a[0] - b[0]);
    }

    depth = depth.slice(0, 10);  // 取前 10
    console.log(depth);
    let bigBillCount = depth.filter(el => el[1] > 50000).length;  // 数目大于 5万 的订单称为大订单
    if (bigBillCount >= 4) {  // 如果前 10 笔中有 4 笔大订单, 则将价格设置为第一笔大订单的前一单
      let index = depth.findIndex(el => el[1] > 50000);
      return depth[index >= 1 ? index - 1 : 0][0];
    }
    return -1;
  }
}