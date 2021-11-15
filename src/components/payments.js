import ovo from "../assets/images/ovo.svg";
import dana from "../assets/images/dana.svg";
import shopeepay from "../assets/images/shopeepay.svg";
import linkaja from "../assets/images/linkaja.svg";
import qris from "../assets/images/qris.svg";

const payments = [
  {
    _id: "1",
    name: "Qris",
    channelCode: "ID_QRIS",
    country: ["id"],
    discount: 0,
    tax: 0,
    fee: 0.7,
    image: qris,
    minTx: 1500,
  },
  {
    _id: "2",
    name: "Ovo",
    channelCode: "ID_OVO",
    country: ["id"],
    discount: 0,
    tax: 10,
    fee: 3,
    image: ovo,
  },
  {
    _id: "3",
    name: "Dana",
    channelCode: "ID_DANA",
    country: ["id"],
    discount: 0,
    tax: 10,
    fee: 1.5,
    image: dana,
  },
  {
    _id: "4",
    name: "ShopeePay",
    channelCode: "ID_SHOPEEPAY",
    country: ["id"],
    discount: 0,
    tax: 0,
    fee: 1.5,
    image: shopeepay,
  },
  {
    _id: "5",
    name: "LinkAja",
    channelCode: "ID_LINKAJA",
    country: ["id"],
    discount: 0,
    tax: 10,
    fee: 1.5,
    image: linkaja,
  },
];

export default payments;
