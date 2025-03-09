import { defineEventHandler, readBody, createError, getQuery } from 'h3'
import { index, store, show, destroy } from '../controllers/termsController.js'

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

  if (method === 'DELETE') {
    const query = getQuery(event)
    if (!query.term) {
      throw createError({ statusCode: 400, message: 'Termo é obrigatório para excluir.' })
    }

    return await destroy(query.term)
  }

  throw createError({ statusCode: 405, message: 'Método não permitido' })
})
