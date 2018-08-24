/* global getFactory getAssetRegistry getParticipantRegistry emit */
const NAMESPACE = 'org.blockchain.cnr_network';
function addMonth (date, m) {
  let d = new Date(date);
  d.setMonth(d.getMonth()+m);
  let month = d.getMonth() + 1;
  month < 10 ? (month = '0' + month) : (month = month + '');
  let ddate = d.getDate();
  ddate < 10 ? (ddate = '0' + ddate) : (ddate = ddate + '');
  return `${d.getFullYear()}-${month}-${ddate}`;
}
class ResourceManager {
  consturctor (namespace, id) {
    this.id = id;
    const factory = getFactory();
    this.data = factory.newResource(namespace, id);
  }

  async add () {
    const assetRegistry = await getAssetRegistry(this.data.getFullyQualifiedType());
    await assetRegistry.add(this.data);
  }

  async update () {
    const assetRegistry = await getAssetRegistry(this.data.getFullyQualifiedType());
    await assetRegistry.update(this.data);
  }
}

class ManagerHelper {
  constructor () {
    this.data = null;
  }

  async getAll () {
  }

  async getIds () {
    let data = await this.getAll();
    return data.map(elem => elem['$identifier']);
  }

  async newId () {
    let ids = await this.getIds();
    let id = 0;
    if (ids.length > 0) {
      ids = ids.sort((a, b) => parseInt(a) < parseInt(b));
      id = parseInt(ids[0]) + 1;
      while (await this.existsId(id)) {
        id = id +1;
      }
    }
    return id+'';
  }

  async getData (id) {
    let data = await this.getAll();
    let filtered = data.filter(elem => elem['$identifier'] == id);
    if (filtered.length == 0) return false;
    return filtered[0];
  }

  async existsId (pId) {
    let data = await this.getData(pId);
    return data != false;
  }

  async getProps (propName) {
    let data = await this.getAll();
    return data.map(elem => elem[propName]);
  }

  async getProp (propName, propId) {
    let data = await this.getData(propId);
    if (data.length == 0) throw new Error(`${propName}의 ${propId}가 존재하지 않습니다.`);
    return data[propName];
  }

  async count () {
    let allList = await this.getAll();
    return allList.length;
  }
}

class ParticipantManager extends ManagerHelper {
  constructor (namespace, pName/* participant name */) {
    super();
    this.ns = namespace;
    this.pname = pName;
  }

  async getAll () {
    let data = await getParticipantRegistry(this.ns + '.' + this.pname);
    return await data.getAll();
  }
}

class AssetManager extends ManagerHelper {
  constructor (namespace, aName/* asset name*/) {
    super();
    this.ns = namespace;
    this.aname = aName;
  }

  async getAll () {
    let data = await getAssetRegistry(this.ns + '.' + this.aname);
    return await data.getAll();
  }
}

class Bill extends AssetManager {
  constructor (objOrId) {
    super(NAMESPACE, 'Bill');
  }

  async new (obj) {
    obj = Object.assign({
      source: "",
      target: "",
      items: [],  
      paymentDate: "",
      confirm: "NO"
    }, obj);
    let company = new Company();
    if (!(await company.existsId(obj.source))) throw new Error(`source id('${obj.source}')가 존재하지 않습니다.`);
    if (!(await company.existsId(obj.target))) throw new Error(`target id('${obj.target}')가 존재하지 않습니다.`);
    if (obj.items.length == 0) throw new Error('items의 갯수가 1이상이어야 합니다.');

    const factory = getFactory();
    let newId = await this.newId();
    let data = await factory.newResource(NAMESPACE, 'Bill', newId);
    data.source = await factory.newRelationship(NAMESPACE, 'Company', obj.source);
    data.target = await factory.newRelationship(NAMESPACE, 'Company', obj.target);
    data.items = [];
    obj.items.forEach(async elem => {
      let item = await factory.newConcept(NAMESPACE, 'Items');
      item.name = elem.name || "";
      item.price = elem.price || 0;
      item.quantity = elem.quantity || 0;
      item.remain = elem.remain || 0;
      data.items.push(item);
    });
    data.paymentDate = obj.paymentDate || addMonth(new Date(), 1);
    data.confirmStatus = obj.confirm;
    const assetRegistry = await getAssetRegistry(data.getFullyQualifiedType());
    await assetRegistry.add(data);
    return newId;
  }

  async update (billId, obj) {
    const factory = getFactory();
    let bill = await this.getData(billId);
    if (typeof(bill) !== 'object') throw new Error(`${billId}에 해당하는 Bill 데이터가 없습니다.`);
    obj = Object.assign({
      items: bill.items,
      paymentDate: bill.paymentDate,
      confirm: bill.confirmStatus
    }, obj);
    bill.items.map(async (elem, i) => {
      let item = await factory.newConcept(NAMESPACE, 'Items');
      item.name = obj.items[i].name || elem.name;
      item.price = obj.items[i].price || elem.name;
      item.quantity = obj.items[i].quantity || elem.quantity;
      item.remain = obj.items[i].remain || elem.remain;
      return item;
    });
    bill.paymentDate = obj.paymentDate;
    bill.confirmStatus = obj.confirm;
    const assetRegistry = await getAssetRegistry(bill.getFullyQualifiedType());
    await assetRegistry.update(bill);
    return billId;
  }

  async getSource (id) {
    let company = await this.getProp('source', id);
    let companyId = company['$identifier'];
    let c = new Company();
    return await c.getData(companyId);
  }

  async getTarget (id) {
    let company = await this.getProp('target', id);
    let companyId = company['$identifier'];
    let c = new Company();
    return await c.getData(companyId);
  }

  async getItems (id) {
    return await this.getProp('items', id);
  }

  async getPaymentDate (id) {
    return await this.getProp('paymentDate', id);
  }

  async getConfirmStatus (id) {
    return await this.getProp('confirmStatus', id);
  }
}

class Company extends ParticipantManager {
  constructor () {
    super(NAMESPACE, 'Company');
  }

  async getId (pName) {
    let data = await this.getList();
    let filtered = data.filter(elem => elem['companyName'] == pName);
    if (filtered.length == 0) return false;
    return filtered[0];
  }

  /* 모든 Company 이름을 리턴한다 */
  async getNames () {
    return this.getProps('companyName');
  }

  async getCompanyName (pId) {
    return await this.getProp('companyName', pId);
  }

  async getUserName (pId) {
    return await this.getProp('userName', pId);
  }

  async getBankAccount (pId) {
    return await this.getProp('bankAccount', pId);
  }

  async getBankName (pId) {
    let data = await this.getBankAccount(pId);
    return data['bankName'];
  }

  async getBankAccountName (pId) {
    let data = await this.getBankAccount(pId);
    return data['accountName'];
  }

  async getBankAccountNumber (pId) {
    let data = await this.getBankAccount(pId);
    return data['accountNumber'];
  }
}

/**
 * Place an order for a vehicle
 * @param {org.blockchain.cnr_network.Charge} Charge - the Charge transaction
 * @transaction
 */
async function Charge(tx) {
  let company = new Company();
  console.log(company.existsId(tx.source));
  console.log(company.existsId(tx.target));
}

/**
 * Place an order for a vehicle
 * @param {org.blockchain.cnr_network.Payment} Payment - the Payment transaction
 * @transaction
 */
async function Payment (tx) {

}


/**
 * Place an order for a vehicle
 * @param {org.blockchain.cnr_network.Confirm} Confirm - the Payment confirm transaction
 * @transaction
 */
async function Confirm (tx) {

}

/**
 * Place an order for a vehicle
 * @param {org.blockchain.cnr_network.Sample} Sample - the Sample transaction
 * @transaction
 */
async function Sample (tx) {
  console.log(tx);
  const factory = getFactory();
  const namespace = 'org.blockchain.cnr_network';
  const ass = factory.newResource(namespace, 'SampleAsset', tx.ass.Id);
  console.log(ass);
  ass.unit = 5;

  // const company = await new Company();

  const company = new Company();

  console.log('=======test start=======');
  console.log('<Length> : ' + await company.count());
  console.log('<List> : ');
  console.log(await company.getAll());
  console.log('<List type> : ');
  console.log(typeof(await company.getAll()));
  console.log('<List type is Array> : ');
  console.log(Array.isArray(await company.getAll()));
  console.log('<Get all ids> : ');
  console.log(await company.getIds());
  console.log(`<exists id(${(await company.getIds())[0]})>: `);
  console.log(await company.existsId((await company.getIds())[0]));
  console.log('=======test stop=======');

  console.log('<<<test2>>>');
  let companyIds = await company.getIds();
  console.log(await company.getProp('companyName', companyIds[0]));
  console.log(await company.getCompanyName(companyIds[0]));
  console.log(await company.getUserName(companyIds[0]));
  console.log(await company.getBankAccount(companyIds[0]));
  
  console.log(await company.getData(companyIds[0]));
  console.log(await company.getUserName(companyIds[0]));
  console.log(await company.getBankName(companyIds[0]));
  console.log(await company.getBankAccount(companyIds[0]));
  console.log(await company.getBankAccountName(companyIds[0]));
  console.log(await company.getBankAccountNumber(companyIds[0]));
  console.log('<<<test2 end>>>');

  console.log('<<<test asset>>>');
  const bill = new Bill('SampleAsset');
  let billIds = await bill.getIds();
  console.log(billIds);
  console.log(await bill.getAll());
  console.log(await bill.getConfirmStatus(billIds[0]));
  console.log(await bill.getSource(billIds[0]));
  console.log(await bill.getTarget(billIds[0]));
  console.log('--------');
  let newId = await bill.new({
    source: '1993',
    target: '3015',
    items: [{
    }],
    confirm: "YES"
  });
  console.log(await bill.update(parseInt(newId)-1 +'', {
  }));
  console.log('<<<end test asset>>>');
}

async function newCompany () {

}

async function createBill () {

}

async function updateBill () {

}
