const axios = require('axios');
const mergeOptions = require('merge-options');
const _ = require('lodash');

const HOST = 'app.nbroker.net';
const PORT = '3000';

function addMonth (date, m) {
  let d = new Date(date);
  d.setMonth(d.getMonth()+m);
  let month = d.getMonth() + 1;
  month < 10 ? (month = '0' + month) : (month = month + '');
  let ddate = d.getDate();
  ddate < 10 ? (ddate = '0' + ddate) : (ddate = ddate + '');
  return `${d.getFullYear()}-${month}-${ddate}`;
}
class RestHelper {
  constructor (initData={}) {
    initData = mergeOptions({
      host: HOST,
      port: PORT,
      location: "",
      idProp: ""
    }, initData);

    this.host = initData.host;
    this.port = initData.port;
    this.location = initData.location;
    this.idProp = initData.idProp;
  }

  get url () {
    return `http://${this.host}:${this.port}`;
  }

  async _get (parameter={}, location) {
    let res;
    try {
      location = location || this.location;
      res = await axios.get(this.url+location, parameter).catch(err => err.response.data.error);
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async _post (parameter={}, location) {
    let res;
    try {
      location = location || this.location;
      res = await axios.post(this.url+location, parameter).catch(err => err.response.data.error);
      return res;
    } catch (e) {
      throw e;
    }
  }

  async _getData (id, location) {
    let res;
    location = location || this.location;
    if (typeof id === 'string') {
      try {
        res = await this._get(`${location}/${id}`);
        return res;
      } catch (e) {
        throw e;
      }
    } else {
      try {
        res = await this._get(`${location}`);
        return res;
      } catch (e) {
        throw e;
      }
    }
  }

  async _getDataByProp (propName, id, location) {
    let res;
    location = location || this.location;
    if (typeof id === 'string') {
      try {
        res = await this._get(`${location}`);
        let result;
        _.forEach(res, (value, key) => {
          if (key == propName) result = value;
        });
        return result;
        return res;
      } catch (e) {
        throw e;
      }
    } else {
      try {
        res = await this._get(`${location}/${id}`);
        res = res.map(elem => {
          let result;
          _.forEach(elem, (value, key) => {
            if (key == propName) result = value;
          });
          return result;
        });
        return res;
      } catch (e) {
        throw e;
      }
    }
  }

  async getIds (location, idPropName) {
    let res;
    idPropName = idPropName || this.idProp;
    try {
      location = location || this.location;
      res = await this._getDataByProp(idPropName, null, `${location}`);
      return res;
    } catch (e) {
      throw e;
    }
  }

  async get (id) {
    return await this._getData(id);
  }
}

class Company extends RestHelper {
  constructor () {
    super({
      host: HOST,
      port: PORT,
      location: '/api/Company',
      idProp: 'companyId'
    });
  }

  async AddCompany (params) {
    let res;
    try {
      params = mergeOptions({
        "$class": "org.blockchain.cnr_network.AddCompany",
        "companyName": "",
        "userName": "",
        "bankName": "",
        "accountName": "",
        "accountNumber": "",
        "timestamp": new Date()
      }, params);
      res = await this._post(params, '/api/AddCompany');
      return res;
    } catch (e) {
      throw e;
    }
  }
}

class Charge extends RestHelper {
  constructor () {
    super({
      host: HOST,
      port: PORT,
      location: '/api/Charge',
      idProp: 'transactionId'
    });
  }

  async Charge (params={}) {
    params = mergeOptions({
      "$class": 'org.blockchain.cnr_network.Charge',
      source: "",
      target: "",
      items: [],
      paymentDate: ""
    }, params);
    let res;
    try {
      res = await this._post(params, '/api/Charge');
      return res;
    } catch (e) {
      throw e;
    }
  }
}

class Payment extends RestHelper {
  constructor () {
    super({
      host: HOST,
      port: PORT,
      location: '/api/Payment',
      idProp: 'transactionId'
    });
  }

  async Payment (params) {
    params = mergeOptions({
      "$class": 'org.blockchain.cnr_network.Payment',
      billId: "",
      items: []
    }, params);
    console.log(params);
    let res;
    try {
      res = await this._post(params, '/api/Payment');
      return res;
    } catch (e) {
      throw e;
    }
  }
}

class Confirm extends RestHelper {
  constructor () {
    super({
      host: HOST,
      port: PORT,
      location: '/api/Confirm',
      idProp: 'transactionId'
    });
  }

  async Confirm (params) {
    params = mergeOptions({
      "$class": 'org.blockchain.cnr_network.Confirm',
      billId: "",
      confirmStatus: "YES",
    }, params);
    let res;
    try {
      res = await this._post(params, '/api/Confirm');
      return res;
    } catch (e) {
      throw e;
    }
  }
}

class Bill extends RestHelper {
  constructor () {
    super({
      host: HOST,
      port: PORT,
      location: '/api/Bill',
      idProp: 'billId'
    });
  }
}

let a = new Company();
let b = new Bill();
let c = new Charge();
let d = new Payment();
let e = new Confirm();
a.getIds().then(res => console.log(res));
async function addCompanies () {
  const c = new Company();
  await c.AddCompany({
    companyName: "Apple",
    userName: "Tim cook",
    bankName: "Ap",
    accountName: 'hi',
    accountNumber: '1234'
  });
  await c.AddCompany({
    companyName: "Google",
    userName: "Larry page",
    bankName: "gg",
    accountName: 'hey',
    accountNumber: '133-334'
  });
}
async function charge () {
  const c = new Charge();
  await c.Charge({
    source: "0",
    target: "1",
    items: [{
      "name": "1월 학원비",
      "price": 120000,
      "quantity": 1,
      "remain": 1
    }],
    paymentDate: addMonth(new Date(), 1)
  });
}

async function payment () {
  const c = new Payment();
  console.log(await c.Payment({
    billId: "1",
    items: [{
      "name": "2월 학원비",
      "price": 12000,
      "quantity": 3,
      "remain": 0
    }]
  }));
}

async function confirm (id) {
  const c = new Confirm();
  let a = await c.Confirm({
    billId: id
  });
  console.log(a);
}

async function company () {
  const c = new Company();
}
async function bill () {
  const c = new Bill();
  // console.log(await c.get());
}

async function test () {
  // await addCompanies();
  // await charge();
  await payment();
  // await confirm("1");
  // await company();
  // await bill();
}
test();
