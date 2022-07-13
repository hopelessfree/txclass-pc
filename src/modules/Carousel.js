import $ from "jquery"
import { CAROUSEL } from "../config/config"
import { getEventType, getTarget } from "../utils/tools"

export default class Carousel {
  constructor() {
    this.$carousel = $('.J_carousel')
    this.$sliders = this.$carousel.find('.slider-item')
    this.$indicators = this.$carousel.find('.indicator-item')

    this.curIdx = 0
  }

  init() {
    CAROUSEL.autoplay && this.autuPlay()
    this.bindEvent()
  }

  autuPlay() {
    Carousel.timer = setInterval(() => {
      this.setIndex('next')
    }, CAROUSEL.duration)
  }

  bindEvent() {
    this.$carousel.on('mouseenter', $.proxy(this.mouseInOu, this))
    this.$carousel.on('mouseleave', $.proxy(this.mouseInOu, this))
    this.$carousel.on('click', $.proxy(this.onCarouselClick, this))
  }

  mouseInOu(ev) {
    const tar = getTarget(ev)
    const eventType = getEventType(ev)

    switch (eventType) {
      case 'mouseenter':
        clearInterval(CAROUSEL.timer)
        break;

      case 'mouseleave':
        CAROUSEL.autoplay && this.autuPlay()
        break;

      default:
        break;
    }
  }

  onCarouselClick(ev) {
    const tar = getTarget(ev)
    const className = tar.className

    switch (className) {
      case 'indicator-item':
        this.curIdx = $(tar).index()
        this.setIndex()
        break;

      case 'iconfont icon-arrow-right':
        this.setIndex('next')
        break;

      case 'iconfont icon-arrow-left':
        this.setIndex('prev')
        break;

      default:
        break;
    }
  }

  setIndex(direction) {
    switch (direction) {
      case 'next':
        this.curIdx =
          this.curIdx === this.$sliders.length - 1
            ? 0
            : this.curIdx + 1
        break;

      case 'prev':
        this.curIdx =
          0
            ? this.$sliders.length - 1
            : this.curIdx - 1
        break;

      default:
        break;
    }

    this.sliderAction(this.curIdx)
  }

  sliderAction(index) {
    this.$sliders
      .eq(index)
      .fadeIn(300)
      .siblings()
      .fadeOut()

    this.$indicators
      .eq(index)
      .addClass('current')
      .siblings()
      .removeClass('current')

  }
}