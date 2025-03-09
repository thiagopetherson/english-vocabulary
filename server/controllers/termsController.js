import { promises as fs } from 'fs'
import path from 'path'
import { readBody, createError } from 'h3'

const filePath = path.resolve('public/terms.json')


export const index = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    throw createError({ statusCode: 500, message: 'Erro ao carregar termos' })
  }
}

export const show = async (term) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    const terms = JSON.parse(data)

    // Procura o termo no array, ignorando diferenças de maiúsculas e minúsculas
    const foundTerm = terms.find(t => t.term.toLowerCase() === term.toLowerCase())   

    return foundTerm || false
  } catch (error) {
    throw createError({ statusCode: 500, message: 'Erro ao carregar termo' })
  }
}


export const store = async (event) => {
  try {
    const newTerm = await readBody(event)

    if (!newTerm.term || !newTerm.translation) {
      throw createError({ statusCode: 400, message: 'Termo e tradução são obrigatórios' })
    }

    const data = await fs.readFile(filePath, 'utf-8')
    const terms = JSON.parse(data)

    terms.push(newTerm)
    await fs.writeFile(filePath, JSON.stringify(terms, null, 2), 'utf-8')

    return { message: 'Termo adicionado com sucesso!' }
  } catch (error) {
    throw createError({ statusCode: 500, message: 'Erro ao adicionar termo' })
  }
}

export const destroy = async (term) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    let terms = JSON.parse(data)

    const index = terms.findIndex(t => t.term.toLowerCase() === term.toLowerCase())

    if (index === -1) {
      throw createError({ statusCode: 404, message: 'Termo não encontrado para exclusão' })
    }

    // Remove o termo
    terms.splice(index, 1)

    // Atualiza o arquivo JSON
    await fs.writeFile(filePath, JSON.stringify(terms, null, 2), 'utf-8')

    return { message: 'Termo removido com sucesso!' }
  } catch (error) {
    throw createError({ statusCode: 500, message: 'Erro ao excluir termo' })
  }
}
