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
    return Object.values(await this.data.getAll());
  }
}

class Company {
  constructor (pId) {
    this.pid = pId;
  }
  async init () {
    this.p = new ParticipantManager(NAMESPACE, 'Company');
    await this.p.init();
  }

  existId (companyId) {
  }

  async getList () {
    return await this.p.getAll();
  }

  async getIds () {
    let data = await this.getList();
    window.aaa = data;
    console.log(data);
    return data.maps(elem => elem['$identifier']);
  }

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
  console.log('=======test stop=======');


  console.log('<<<test2>>>');
  console.log(await company.getIds());
  console.log('<<<test2 end>>>');
}

async function newCompany () {

}

async function createBill () {

}

async function updateBill () {

}
