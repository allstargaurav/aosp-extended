import React, { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { getAllPosts, getSinglePost } from '../../utils/mdx'
import { Adsense } from '@ctrl/react-adsense'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

interface IParams extends ParsedUrlQuery {
  slug: string
}

type Props = {
  frontmatter: {
    [key: string]: any
  }
  code: string
}

export default function Post({ code, frontmatter }: Props) {
  const Component = useMemo(() => getMDXComponent(code), [code])
  const date = new Date(frontmatter.publishedAt)
  const [month, day, year] = [
    date.toLocaleString('default', { month: 'long' }),
    date.getDate(),
    date.getFullYear(),
  ]
  return (
    <div>
      <Adsense
        className='mb-6 adsbygoogle'
        client='ca-pub-5289211378270082'
        slot='1848543721'
        style={{ display: 'block' }}
        format='auto'
        responsive='true'
        adTest='on'
      />
      <div className='px-6 py-6 mb-4 rounded-md shadow-2xl bg-gradient-to-t from-[#30eeb7] to-[#31ee95] text-gray-800 '>
        <h1 className='mb-4 text-4xl font-bold'>{frontmatter.title}</h1>
        <div className='flex space-x-3 text-sm font-medium text-center text-gray-700 justify-items-center'>
          <div className='flex space-x-1 text-center justify-items-center '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            <p>{`${month} ${day},${year}`}</p>
          </div>
          <div className='flex space-x-1 text-center justify-items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <p>{frontmatter.author}</p>
          </div>
        </div>
      </div>
      <div className='bg-[#332e4e] rounded-md shadow-lg'>
        <div className='p-6 prose prose-invert text-white lg:pr-10 max-w-none'>
          <Component />
        </div>
      </div>
      <Adsense
        className='adsbygoogle'
        client='ca-pub-5289211378270082'
        slot='1848543721'
        style={{ display: 'block' }}
        format='auto'
        responsive='true'
        adTest='on'
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as IParams
  const post = await getSinglePost(slug)
  return {
    props: { ...post },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPosts().map(({ slug }) => ({ params: { slug } }))
  return {
    paths,
    fallback: false,
  }
}
