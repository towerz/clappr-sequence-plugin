import {CorePlugin, Events} from 'Clappr'

export default class SequencePlugin extends CorePlugin {
  static get version() { return VERSION }
  get name() { return 'sources' }

  bindEvents() {
    this.listenTo(this.core, Events.CORE_CONTAINERS_CREATED, this.onContainersCreated)
    this.listenTo(this.core, Events.CORE_ACTIVE_CONTAINER_CHANGED, this.onContainerChanged)
  }

  onContainersCreated() {
    let firstValidSource = find(this.core.containers, (container) => container.playback.name !== 'no_op')  || this.core.containers[0]
    if (firstValidSource) {
      this.core.containers.forEach((container) => {
        if (container.playback.name == 'no_op') {
          container.destroy
        } else if (container !== firstValidSource) {
          container.$el.hide()
        } else {
          this.core.activeContainer = container
        }
      })
    }
  }

  onContainerChanged() {
    let container = this.core.mediaControl.container
    if (this._container) {
        this.stopListening(this._container)
    }
    this._container = container
    this.listenTo(container, Events.CONTAINER_ENDED, this.playNextVideo)
  }

  playNextVideo() {
    debugger
    let index = this.core.containers.indexOf(this._container)
    if (index >= 0 && index < this.core.containers.length - 1) {
      let container = this.core.containers[index + 1]
      container.$el.show()
      this._container.$el.hide()
      this.core.activeContainer = this.core.containers[index + 1]
      container.play()
    }
  }
}
