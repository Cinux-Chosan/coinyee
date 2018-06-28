import Coinyee from './Coinyee';
declare let Promise : any;

export default class CoinyeeStrategy extends Coinyee {
  constructor(coinFrom: string, coinTo: string) {
    super(coinFrom, coinTo);
  }
  async task(): Promise<any> {
    // 查询账户
    let [{ data: wallet }, { data: deepthAndKLine } ] = await Promise.all([this.getWallet(), this.getDeepthAndKLine()]);
    let { coinFrom, coinTo } = this;

    if (wallet) {
      let { depths: { asks, bids }, lines : klines, trades } = deepthAndKLine;
      let remainFrom = wallet[coinFrom.toUpperCase()];
      let remainTo = wallet[coinTo.toUpperCase()];
      if (remainFrom > 1) {
        // 卖
        let price = this.calcPrice();
        this.createOrder()
      }
      if (remainTo > 1) {
        // 买
      }
    }
    // 先查询市场深度

  }
  calcPrice(deepth: object[], type = 'buy') {
    if (type === 'buy') {
      deepth.sort((a, b) => a[0] - b[0]);
      return 
    } else {
      deepth.sort((a, b) => b[0] - a[0]);
    }
  }
}