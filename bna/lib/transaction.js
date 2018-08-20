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

class Company {
  constructor (companyId) {
    const factory = getFactory();
  }
  existId (companyId) {

  }
  getList () {

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


  const p = await getParticipantRegistry(namespace + '.SamplePerson');
  console.log(p.getAll());
}

async function newCompany () {

}

async function createBill () {

}

async function updateBill () {

}
