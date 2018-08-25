const axios = require('axios');
const mergeOptions = require('merge-options');
const _ = require('lodash');

const HOST = 'app.nbroker.net';
const PORT = '3000';

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
      res = await axios.get(this.url+location, parameter);
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async _post (parameter={}, location) {
    let res;
    try {
      location = location || this.location;
      res = await axios.post(this.url+location, parameter);
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
    params = mergeOptions(params, {

    });
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

  async send (params) {
    let cls = 'org.blockchain.cnr_network.Payment';
    params = mergeOptions(params, {
    });
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

  async post (params) {
    let cls = 'org.blockchain.cnr_network.Confirm';
    params = mergeOptions(params, {
    });
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

  async post (params) {
    let cls = 'org.blockchain.cnr_network.Bill';
    params = mergeOptions(params, {
    });
  }
}

let a = new Company();
let b = new Bill();
let c = new Charge();
let d = new Payment();
let e = new Confirm();
a.getIds().then(res => console.log(res));
a.addCompany({
  companyName: "Apple",
  userName: "Tim cook",
  bankName: "Ap",
  accountName: 'hi',
  accountNumber: '1234'
}).then(res => console.log(res)).catch(e => console.log(e.response.data.error));
