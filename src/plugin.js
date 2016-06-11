import {CorePlugin} from 'Clappr'

export default class SequencePlugin extends CorePlugin {
  static get version() { return VERSION }
  get name() { return 'sources' }
}
