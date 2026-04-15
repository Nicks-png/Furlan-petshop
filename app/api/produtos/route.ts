import { NextRequest, NextResponse } from 'next/server'
import produtos from '@/src/data/produtos'

export function GET(request: NextRequest) {
  const categoria = request.nextUrl.searchParams.get('categoria')
  const result = categoria
    ? produtos.filter((p) => p.categoria === categoria)
    : produtos
  return NextResponse.json(result)
}
