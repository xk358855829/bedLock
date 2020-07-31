import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import add from '@/components/add'
import mainPage from '@/components/mainPage'
import passWordList from '@/components/passWordList'
import addPass from '@/components/addPass'
import share from '@/components/share'
import calendar from '@/components/calendar'
import history from '@/components/history'
import set from '@/components/set'
import mianHist from '@/components/mianHist'
import check from '@/components/check'
import parameter from '@/components/parameter'
import fingerprint from '@/components/fingerprint'
import addfinger from '@/components/addfinger'
import sent from '@/components/sent'
import nfc from '@/components/nfc'
import addnfc from '@/components/addnfc'
import test from '@/components/test'
import testPage from '@/components/testPage'
import video from '@/components/video'
import kaikong from '@/components/kaikong'



Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    },
    {
      path: '/add',
      name: 'add',
      component: add,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    },
    {
      path: '/check',
      name: 'check',
      component: check,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    },
    {
      path: '/mianHist',
      name: 'mianHist',
      component: mianHist,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    },{
      path: '/parameter',
      name: 'parameter',
      component: parameter,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    },
    {
      path: '/mainPage',
      name: 'mainPage',
      component: mainPage,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    },{
      path: '/passWordList',
      name: 'passWordList',
      component: passWordList,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    },{
      path: '/addPass',
      name: 'addPass',
      component: addPass,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    },{
      path: '/share',
      name: 'share',
      component: share,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    },{
      path: '/calendar',
      name: 'calendar',
      component: calendar
    },{
      path: '/history',
      name: 'history',
      component: history,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    },{
      path: '/fingerprint',
      name: 'fingerprint',
      component: fingerprint,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    },{
      path: '/addfinger',
      name: 'addfinger',
      component: addfinger,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    },{
      path: '/sent',
      name: 'sent',
      component: sent,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    },{
      path: '/nfc',
      name: 'nfc',
      component: nfc,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    },{
      path: '/addnfc',
      name: 'addnfc',
      component: addnfc,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    },{
      path: '/set',
      name: 'set',
      component: set,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    },{
      path: '/test',
      name: 'test',
      component: test,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    },{
      path: '/testPage',
      name: 'testPage',
      component: testPage,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    },{
      path: '/video',
      name: 'video',
      component: video,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    },{
      path: '/kaikong',
      name: 'kaikong',
      component: kaikong,
      meta: {
        title:"共享陪护床"
        // title:"共享钢琴"
      }
    }
  ]
})
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'index',
//       component: index,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     },
//     {
//       path: '/add',
//       name: 'add',
//       component: add,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     },
//     {
//       path: '/check',
//       name: 'check',
//       component: check,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     },
//     {
//       path: '/mianHist',
//       name: 'mianHist',
//       component: mianHist,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     },{
//       path: '/parameter',
//       name: 'parameter',
//       component: parameter,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     },
//     {
//       path: '/mainPage',
//       name: 'mainPage',
//       component: mainPage,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     },{
//       path: '/passWordList',
//       name: 'passWordList',
//       component: passWordList,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     },{
//       path: '/addPass',
//       name: 'addPass',
//       component: addPass,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     },{
//       path: '/share',
//       name: 'share',
//       component: share,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     },{
//       path: '/calendar',
//       name: 'calendar',
//       component: calendar
//     },{
//       path: '/history',
//       name: 'history',
//       component: history,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     },{
//       path: '/fingerprint',
//       name: 'fingerprint',
//       component: fingerprint,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     },{
//       path: '/addfinger',
//       name: 'addfinger',
//       component: addfinger,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     },{
//       path: '/sent',
//       name: 'sent',
//       component: sent,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     },{
//       path: '/nfc',
//       name: 'nfc',
//       component: nfc,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     },{
//       path: '/addnfc',
//       name: 'addnfc',
//       component: addnfc,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     },{
//       path: '/set',
//       name: 'set',
//       component: set,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     },{
//       path: '/test',
//       name: 'test',
//       component: test,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     },{
//       path: '/testPage',
//       name: 'testPage',
//       component: testPage,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     },{
//       path: '/video',
//       name: 'video',
//       component: video,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     },{
//       path: '/kaikong',
//       name: 'kaikong',
//       component: kaikong,
//       meta: {
//         // title:"共享陪护床"
//         title:"共享钢琴"
//       }
//     }
//   ]
// })
