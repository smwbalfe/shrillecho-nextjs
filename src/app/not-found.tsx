'use client'

import Link from 'next/link'
import { Providers } from '~/lib/config/providers'
import { indexTheme } from '~/lib/theme'

export default function NotFound() {
    return (
        <Providers theme={indexTheme}>
            <div>
                <h2>Not Found</h2>
                <p>Could not find requested resource</p>
                <Link href="/">Return Home</Link>
            </div>
        </Providers>
    )
}