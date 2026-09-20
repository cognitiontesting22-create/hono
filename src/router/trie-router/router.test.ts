import { runTest } from '../common.case.test'
import { TrieRouter } from './router'

describe('TrieRouter', () => {
  runTest({
    newRouter: () => new TrieRouter(),
  })

  it('keeps suffix wildcard handlers in registration order with static routes', () => {
    const router = new TrieRouter<string>()
    router.add('ALL', '/assets*', 'middleware')
    router.add('GET', '/assets/app.js', 'script')
    router.add('GET', '/assets*', 'assets')

    expect(router.match('GET', '/assets/app.js')).toEqual([
      [
        ['middleware', {}],
        ['script', {}],
        ['assets', {}],
      ],
    ])
  })
})
