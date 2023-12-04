const setImage = async (file, path) => {
    const body = new FormData()
    body.append('file', file)
    const response = await fetch(`/api/file/${path}`, {
        method: 'POST',
        body
    })

    return response
}

const reloadImg = file => {
    fetch(file, { cache: 'reload', mode: 'no-cors' })
        .then(() => document.body.querySelectorAll(`img[src='${file}']`).forEach(img => (img.src = file)))
        .catch(e => console.log('error', e));
}

export { setImage, reloadImg }