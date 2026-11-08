import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CHANNELS } from '@/data/channels'
import ChannelPageClient from './ChannelPageClient'

export function generateStaticParams() {
  return CHANNELS.map(c => ({ id: c.id }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params
  const channel = CHANNELS.find(c => c.id === id)
  if (!channel) return { title: 'Canal no encontrado | MIC' }

  const title = `${channel.name} | MIC`
  const description = channel.desc

  return {
    title,
    description,
    alternates: { canonical: `/catalogo/${id}` },
    openGraph: {
      title,
      description,
      locale: 'es_PE',
      type: 'website',
    },
  }
}

export default async function ChannelPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const channel = CHANNELS.find(c => c.id === id)
  if (!channel) notFound()

  return <ChannelPageClient id={id} />
}
