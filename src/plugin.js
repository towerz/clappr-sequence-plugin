import {CorePlugin} from 'Clappr'

export default class SequentialPlayback extends CorePlugin {
  static get version() { return VERSION }
  get name() { return 'sources' }
}
