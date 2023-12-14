import pick from 'lodash/pick'

export function filterMiddleware(filterKeys) {
  return function (req, _res, next) {
    req.body = pick(req.body, filterKeys)

    next()
  }
}
