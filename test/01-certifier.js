const Certifier = artifacts.require('Certifier')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect

contract('Certifier', accounts => {
  it('should get an instance of the contract', () => {
    Certifier.deployed().then(instance => {
      certifier = instance
      expect(certifier).not.to.be.empty
    })
  })
  it('should not get an error for the instance', () => {
    expect(certifier).not.to.be.an('error')
  })
  it('should get the owner of the contract', () => {
    let owner = accounts[0]
    certifier.owner().then(realOwner => {
      expect(realOwner).to.eq(owner)
    })
  })
  it('should allow the owner save a name', () => {
    const [owner] = accounts
    certifier.setName('Fulanito').then(response => {
      expect(response.tx).match(/0x\w{64}/)
      expect(response.tx.length).to.eq(66)
    })
  })
  it('should not allow anyone else to save a name', () => {
    const [owner, unauthorized] = accounts
    expect(certifier.setName('Ladron', {from: unauthorized})).to.be.eventually.rejected
  })
  it('should allow anyone to retrieve the name', () => {
    const [owner, person1, person2] = accounts
    certifier.getName({from: person2}).then(name => {
      expect(name).to.eq('Fulanito')
    })
  })
  it('should do a dummy test', () => {
    expect(true).to.be.true
  })
})
