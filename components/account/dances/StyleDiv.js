import Image from 'next/image'
import { Card } from 'components/styles/BasicFlex'

const StyleDiv = (style) => {
    style = style.style

    return (
        <Card key={style._id}>
            <p>{style.name}</p>

            <Image
                src={style.image}
                alt={`${style.name} ${style.type}`}
                title={`A ${style.name} ${style.type}`}
                width={250}
                height={250}
                priority 
                onError={(e) => {
                    if (e.target.src.includes('no-image')) {
                        e.target.onError = null
                    } else {
                        style.image = '/no-image.jpg'
                        e.target.alt = 'A placeholder image'
                        e.target.srcset = ''
                        e.target.src = '/no-image.jpg'
                    }
                }}
            />

        </Card>
    )
}

export default StyleDiv