import Image from "next/image"


const StyleInfo = ({ style }) => {
    return (
        <div>
            <h1 style={{ textTransform: 'capitalize' }}>{style.name} {style.type}</h1>
            <Image
                src={style.image}
                alt={`A ${style.name} ${style.type}`}
                title={`A ${style.name} ${style.type}`}
                width={500}
                height={500}
                priority
            />
        </div>
    )
}

export default StyleInfo