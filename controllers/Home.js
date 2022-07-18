const PAGE_CONFIG = require('../configs/page')
const NavData = require('../configs/nav')
const LinkData = require('../configs/link')
const ManualData = require('../configs/manual')

const { IMG_BASE_URL } = require('../configs/url')
const { getSliderData } = require('../services/Slider')
const { getRecomCourseData } = require('../services/RecomCourse')
const { getCollectionData } = require('../services/Collection')
const { getStarTeacherData } = require('../services/Teacher')
const { getGoodStudentData } = require('../services/Student')
const { infomation: Infomation } = require('../configs/qr')
const { getCourseCategory } = require('../services/CourseTab')
const { getCourseData } = require('../services/Course')
const { searchData } = require('../libs/utils')


class Home {
  async index(ctx, next) {
    const PAGE_CONF = PAGE_CONFIG.INDEX
    const SliderData = await getSliderData()
    const RecomCourseData = await getRecomCourseData()
    const CollectionData = await Promise.all(await getCollectionData())
    const StarTeacherData = await getStarTeacherData()
    const GoodStudentData = await getGoodStudentData()

    await ctx.render(
      'index',
      {
        PAGE_CONF,
        IMG_BASE_URL,
        NavData,
        SliderData,
        RecomCourseData,
        CollectionData,
        StarTeacherData,
        GoodStudentData,
        LinkData,
        ManualData,
        Infomation,
      }
    )
  }

  async list(ctx, next) {
    const PAGE_CONF = PAGE_CONFIG.LIST
    const keyword = ctx.params.kw
    const CourseTabData = await getCourseCategory()
    const CourseData = await getCourseData()

    await ctx.render(
      'list',
      {
        title: '列表页',
        PAGE_CONF,
        IMG_BASE_URL,
        NavData,
        LinkData,
        ManualData,
        Infomation,
        CourseTabData,
        CourseData: searchData(CourseData, keyword),
        courseDataStr: JSON.stringify(CourseData)
      }
    )
  }

  async error(ctx, next) {
    const PAGE_CONF = PAGE_CONFIG.ERROR

    await ctx.render('error', {
      PAGE_CONF: PAGE_CONF,
      Infomation,
      NavData,
      LinkData,
      ManualData,
    });
  }
}

module.exports = new Home()