import gopay from "../assets/images/gopay.svg";
import ovo from "../assets/images/ovo.svg";
import dana from "../assets/images/dana.svg";
import shopeepay from "../assets/images/shopeepay.svg";
import linkaja from "../assets/images/linkaja.svg";

const payments = [
  {
    _id: "1",
    name: "GoPay",
    channelCode: "",
    country: ["id"],
    discount: 0,
    max: 50000,
    image: gopay,
  },
  {
    _id: "2",
    name: "Ovo",
    channelCode: "ID_OVO",
    country: ["id"],
    discount: 0,
    image: ovo,
  },
  {
    _id: "3",
    name: "Dana",
    channelCode: "ID_DANA",
    country: ["id"],
    discount: 0,
    image: dana,
  },
  {
    _id: "4",
    name: "ShopeePay",
    channelCode: "ID_SHOPEEPAY",
    country: ["id"],
    discount: 0,
    image: shopeepay,
  },
  {
    _id: "5",
    name: "LinkAja",
    channelCode: "ID_LINKAJA",
    country: ["id"],
    discount: 0,
    image: linkaja,
  },
];

export default payments;
