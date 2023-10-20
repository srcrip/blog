import type { PageServerLoad } from './$types'
import { getPages } from '../utils'

export const load: PageServerLoad = async (_params) => {
  const  data = await getPages()

  return {
    pages: data
  }
}
