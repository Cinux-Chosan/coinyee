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

      if (wallet[coinFrom.toUpperCase()] > 1) {
        // 卖
        // let math =
      }
      if (wallet[coinTo.toUpperCase()] > 1) {
        // 买
      }
    }
    // 先查询市场深度

  }
}