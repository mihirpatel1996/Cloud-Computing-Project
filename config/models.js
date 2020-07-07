module.exports.models = {
  migrate: 'alter',

  attributes: {
    id: { type: 'number', autoIncrement: true, },
  },

  dataEncryptionKeys: {
    default: 'TD592CSGn+pBm53oGjJ9GpiGTXZI2bdUyg5AeUYz5Ao='
  },

  cascadeOnDestroy: true
};
