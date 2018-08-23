/* global getFactory getAssetRegistry getParticipantRegistry emit */
const NAMESPACE = 'org.blockchain.cnr_network';
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

  check () {
    if (this.data == null) throw new Error('데이터가 설정되지 않았습니다.');
  }

  getIds (id) {
    this.check();
    let filtered = this.data.filter(elem => elem['$identifier'] == id);
    if (filtered.length == 0) return false;
    return filtered[0];
  }

  getProps (propName) {
    return this.data.map(elem => elem[propName]);
  }

  getProp (propName, propId) {
    let props = this.getProps(propName);
    if (props.length == 0) throw new Error(`${propName}의 ${propId}가 존재하지 않습니다.`);
    let filtered = props.filter(elem => elem['$identifier'] == propId);
    return filtered;
  }
}

class ParticipantManager {
  constructor (namespace, pName/* participant name */) {
    this.ns = namespace;
    this.pname = pName;
  }

  async getAll () {
    let data = await getParticipantRegistry(this.ns + '.' + this.pname);
    return await data.getAll();
  }
}

class AssetManager {
  constructor (namespace, aName/* asset name*/) {
    this.ns = namespace;
    this.aname = aName;
  }

  async getAll () {
    let data = await getAssetRegistry(this.ns + '.' + this.aname);
    return await data.getAll();
  }
}

class Bill {
  constructor (objOrId) {
    if (typeof(objOrId) === 'object') {
      let obj = objOrId;
      obj = Object.assign({}, obj, {
        source: "",
        target: "",
        items: [],
        paymentDate: "",
        confirm: "NO"
      });
    } else if (typeof(objOrId) === 'string') {
      let id = objOrId;
    } else {
      throw new Error(`object 혹은 string 이여야 합니다.`);
    }
  }

  async init () {
    this.a = new AssetManager(NAMESPACE, 'Bill');
  }

  async getList () {
    return await this.a.getAll();
  }

  new (obj) {
  }

  update () {
  }
}

class Company {
  constructor () {
  }
  async init () {
    this.p = new ParticipantManager(NAMESPACE, 'Company');
  }

  async existsId (pId) {
    let ids = await this.getIds();
    return ids.indexOf(pId) > -1;
  }

  /* 모든 Company 정보를 리턴한다 */
  async getList () {
    return await this.p.getAll();
  }

  /* 모든 Company Id를 리턴한다 */
  async getIds () {
    let data = await this.getList();
    return data.map(elem => elem['$identifier']);
  }

  async getData (pId) {
    let data = await this.getList();
    let filtered = data.filter(elem => elem['$identifier'] == pId);
    if (filtered.length == 0) return false;
    return filtered[0];
  }

  async getId (pName) {
    let data = await this.getList();
    let filtered = data.filter(elem => elem['companyName'] == pName);
    if (filtered.length == 0) return false;
    return filtered[0];
  }

  /* 모든 Company 이름을 리턴한다 */
  async getNames () {
    let data = await this.getList();
    return data.map(elem => elem['companyName']);
  }

  async getName (pId) {
    let data = await this.getData(pId);
    return data['companyName'];
  }

  async getUserName (pId) {
    let data = await this.getData(pId);
    return data['userName'];
  }

  async getBankAccount (pId) {
    let data = await this.getData(pId);
    return data['bankAccount'];
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

  /* Company 수를 반환한다 */
  async count () {
    let allList = await this.getList();
    return allList.length;
  }
}

/**
 * Place an order for a vehicle
 * @param {org.blockchain.cnr_network.Charge} Charge - the Charge transaction
 * @transaction
 */
async function Charge(tx) {

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
  await company.init();

  console.log('=======test start=======');
  console.log('<Length> : ' + await company.count());
  console.log('<List> : ');
  console.log(await company.getList());
  console.log('<List type> : ');
  console.log(typeof(await company.getList()));
  console.log('<List type is Array> : ');
  console.log(Array.isArray(await company.getList()));
  console.log('<Get all ids> : ');
  console.log(await company.getIds());
  console.log(`<exists id(${(await company.getIds())[0]})>: `);
  console.log(await company.existsId((await company.getIds())[0]));
  console.log('=======test stop=======');


  console.log('<<<test2>>>');
  let companyIds = await company.getIds();
  console.log(companyIds);
  console.log(await company.getData(companyIds[0]));
  console.log(await company.getName(companyIds[0]));
  console.log(await company.getUserName(companyIds[0]));
  console.log(await company.getBankAccount(companyIds[0]));
  console.log(await company.getBankName(companyIds[0]));
  console.log(await company.getBankAccount(companyIds[0]));
  console.log(await company.getBankAccountName(companyIds[0]));
  console.log(await company.getBankAccountNumber(companyIds[0]));
  console.log('<<<test2 end>>>');

  console.log('<<<test asset>>>');
  const bill = new Bill('SampleAsset');
  await bill.init();
  let sass = await bill.getList();
  console.log(sass);
  console.log('<<<end test asset>>>');
}

async function newCompany () {

}

async function createBill () {

}

async function updateBill () {

}
