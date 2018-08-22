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

class ParticipantManager {
  constructor (namespace, pName/* participant name */) {
    this.ns = namespace;
    this.pname = pName;
  }
  async init () {
    this.data = await getParticipantRegistry(this.ns + '.' + this.pname);
  }

  async getAll () {
    return await this.data.getAll();
  }
}

class Company {
  constructor (pId) {
  }
  async init () {
    this.p = new ParticipantManager(NAMESPACE, 'Company');
    await this.p.init();
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
    if (!(await this.existsId(pId))) return false;
    let data = await this.getList();
    let filtered = data.filter(elem => elem['$identifier'] == pId);
    if (filtered.length == 0) return false;
    return filtered[0];
  }

  /* 모든 Company 이름을 리턴한다 */
  async getNames () {
    let data = await this.getList();
    return data.map(elem => elem['branchName']);
  }

  async getName (pId) {
    let data = await this.getData(pId);
    return data['branchName'];
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

  const p = new ParticipantManager(namespace, 'SamplePerson');
  await p.init();
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
  console.log(await company.getBankAccount(companyIds[0]));
  console.log(await company.getBankName(companyIds[0]));
  console.log(await company.getBankAccount(companyIds[0]));
  console.log(await company.getBankAccountName(companyIds[0]));
  console.log(await company.getBankAccountNumber(companyIds[0]));
  console.log('<<<test2 end>>>');
}

async function newCompany () {

}

async function createBill () {

}

async function updateBill () {

}
