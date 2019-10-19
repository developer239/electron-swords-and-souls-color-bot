export interface IBlackListKey {
  key: string
  added: number
  ignoreFor: number
}

export const blackList = {
  keysList: [] as IBlackListKey[],
  addKeyToBlackList: function addKeyToBlackList(key: string, ignoreFor = 160) {
    this.keysList.push({
      key,
      added: Date.now(),
      ignoreFor,
    })
  },
  isKeyBlackListed: function isKeyBlackListed(key: string) {
    this.clearKeyBlackList()
    return this.keysList.reduce(
      (carry, blackListed) => carry || blackListed.key === key && Date.now() - blackListed.added < blackListed.ignoreFor, false)
  },
  clearKeyBlackList: function clearKeyBlackList() {
    this.clearList('keysList')
  },
  clearList: function clearList(listName: 'keysList') {
    this[listName] = this[listName].filter(blackListed => Date.now() - blackListed.added < blackListed.ignoreFor)
  },
}
