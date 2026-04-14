'use strict'
require('dotenv').config()

const express = require('express')
const path    = require('path')
const produtos = require('./src/data/produtos')

const app  = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))

// ── Páginas ───────────────────────────────────────────────────────────────────
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'))
})

// ── API ───────────────────────────────────────────────────────────────────────
app.get('/api/produtos', (req, res) => {
  const { categoria } = req.query
  const resultado = categoria
    ? produtos.filter(p => p.categoria === categoria)
    : produtos
  res.json(resultado)
})

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  Furlan Pet Shop`)
  console.log(`  http://localhost:${PORT}\n`)
})
