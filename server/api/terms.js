import { defineEventHandler, readBody, createError, getQuery } from 'h3'
import { index, store, show } from '../controllers/termsController.js'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === 'GET') {
    const query = getQuery(event)
    if (query.term) {
      try {
        return await show(query.term) // Retorna o termo se encontrado
      } catch (error) {
        throw createError({ statusCode: 404, message: 'Termo não encontrado' })
      }
    }
    return await index()
  }

  if (method === 'POST') {
    const body = await readBody(event)    

    return await store(event)
  }

  throw createError({ statusCode: 405, message: 'Método não permitido' })
})
