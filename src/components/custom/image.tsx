// import { useState } from "react"
// import { Skeleton } from "./skeleton"
// import { cn } from "@/lib/utils"

// interface thisProps extends React.ImgHTMLAttributes<HTMLImageElement> {
//     contain?: boolean
//     width?: number | string
//     height?: number | string
//     isZoomed?: boolean
// }
// export default function Image({ contain, width, height, isZoomed, ...imgProps }: thisProps) {
//     const [loading, setLoading] = useState(true)
//     return (
//         <div
//             className={cn("relative overflow-hidden w-max", imgProps.className)}
//             style={{ width: typeof width === 'number' ? width + 'px' : width, height: typeof height === 'number' ? height + 'px' : height }}
//         >
//             <img {...imgProps}
//                 loading="lazy"
//                 onLoad={() => setLoading(false)}
//                 className={cn(imgProps.className, 'relative z-10 object-cover w-full h-full', contain && '!object-contain', isZoomed && 'hover:scale-125 duration-300 [transition-timing-function:cubic-bezier(0.33,1,0.68,1)]', loading && 'opacity-0')}
//             />
//             <Skeleton className={cn(imgProps.className, 'w-full h-full absolute top-0 left-0 rounded-none z-0')} />
//         </div>
//     )
// }

import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function CustomImage({ fill, isZoomed, ...props }: thisProps & React.ImgHTMLAttributes<HTMLImageElement>) {
    const [loading, setLoading] = useState(true)
    return (
        <div className='relative w-max h-max'>
            {fill ?
                <div className={`w-[${props.width}px] h-[${props.height}px] relative overflow-hidden`} style={{ width: props.width, height: props.height }}>
                    <img
                        {...props} width={undefined} height={undefined} alt={props.alt || 'image'}
                        onLoad={() => setLoading(false)}
                        className={cn(`object-contain duration-700 ease-in-out group-hover:opacity-75 w-full h-full
                        ${loading ? 'scale-110 blur-2xl grayscale-0' : 'scale-100 blur-0 grayscale-0'
                            }`, isZoomed && 'hover:scale-125 duration-300 [transition-timing-function:cubic-bezier(0.33,1,0.68,1)]')}
                    />
                </div>
                :
                <img {...props} alt={props.alt || 'image'}
                    onLoad={() => setLoading(false)}
                    className={cn(`object-contain duration-700 ease-in-out group-hover:opacity-75 
                    ${loading ? 'scale-110 blur-2xl grayscale-0' : 'scale-100 blur-0 grayscale-0'
                        }`, isZoomed && 'hover:scale-125 duration-300 [transition-timing-function:cubic-bezier(0.33,1,0.68,1)]')}
                />}

        </div>
    )
}

interface thisProps {
    fill?: boolean,
    isZoomed?: boolean
}