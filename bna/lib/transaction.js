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

  async getAll () {
  }

  async getIds () {
    let data = await this.getAll();
    return data.map(elem => elem['$identifier']);
  }

  async getData (id) {
    let data = await this.getAll();
    let filtered = data.filter(elem => elem['$identifier'] == id);
    if (filtered.length == 0) return false;
    return filtered[0];
  }

  async existsId (pId) {
    return await this.getData(pId) != false;
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
    super(NAMESPACE, 'Bill');
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
    // return await this.getProp('bankName', pId);
  }

  async getBankAccountName (pId) {
    let data = await this.getBankAccount(pId);
    return data['accountName'];
    // return await this.getProp('accountName', pId);
  }

  async getBankAccountNumber (pId) {
    let data = await this.getBankAccount(pId);
    return data['accountNumber'];
    // return await this.getProp('accountNumber', pId);
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
  let sass = await bill.getAll();
  console.log(sass);
  console.log('<<<end test asset>>>');
}

async function newCompany () {

}

async function createBill () {

}

async function updateBill () {

}
