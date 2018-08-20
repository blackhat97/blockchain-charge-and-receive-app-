class Company {
  constructor () {
  }
  existId (companyId) {

  }
  getList () {

  }
}

class Bill {
  constructor () {

  }
}

/**
 * Place an order for a vehicle
 * @param {org.blockchain.cnr_network.Charge} Charge - the Charge transaction
 * @transaction
 */
async function Charge(tx) {

  console.log('charge');
  const factory = getFactory();
  const namespace = 'org.blockchain.cnr_network';

  const charge = factory.newResource(namespace, 'Bill', tx.bill.billId);
  charge.source = factory.newRelationship(namespace, 'Company', tx.bill.source.getIdentifier());
  charge.target = factory.newRelationship(namespace, 'Company', tx.bill.target.getIdentifier());

  charge.items = tx.items;


  charge.payment_date = tx.bill.payment_date;
  charge.confirmStatus = 'NO';

    // save the charge
  const assetRegistry = await getAssetRegistry(charge.getFullyQualifiedType());
  await assetRegistry.add(charge);

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
}

async function newCompany () {

}

async function createBill () {

}

async function updateBill () {

}
