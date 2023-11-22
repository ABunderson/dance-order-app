import fs from 'fs'

const formidable = require('formidable')

export const config = {
    api: {
        bodyParser: false
    }
};

async function handler(req, res) {
    // switch (req.method) {
    //     case "POST":
    const { newPath } = req.query
    let fixedPath = newPath.split(',').join('/')

    console.log(req.method)
    if (req.method === 'POST') {

        const form = new formidable.IncomingForm();

        // console.log(form)    
        form.parse(req, async function (err, fields, files) {
            console.log(files.file)
            await saveFile(files.file, fixedPath);
            console.log('before return')
            return res.status(201).json({ status: true, 'result': 'Successfully added picture' });
        })

        return res.status(201).json({ status: true, 'result': 'Successfully added picture' });
    }
    res.setHeader('Allow', ['POST'])
    res.status(425).end(`Method ${req.method} is not allowed.`)


    // break;
    // }
    // res.setHeader('Allow', ['POST'])
    // res.status(425).end(`Method ${req.method} is not allowed.`)
}
// const post = async (req, res) => {
//     const { newPath } = req.query
//     let fixedPath = newPath.split(',').join('/')

//     const form = new formidable.IncomingForm();

//     form.parse(req, async function (err, fields, files) {
//         await saveFile(files.file, fixedPath);
//         return res.status(201).send("");
//     });
// };

const saveFile = async (file, fixedPath) => {
    console.log('in save file')
    const data = fs.readFileSync(file[0].filepath);
    fs.writeFileSync(fixedPath, data);
    await fs.unlinkSync(file[0].filepath);
    return
};

export default handler

// export default (req, res) => {
//     req.method === "POST"
//         ? handler(req, res)
//         : req.method === "PUT"
//             ? console.log("PUT")
//             : req.method === "DELETE"
//                 ? console.log("DELETE")
//                 : req.method === "GET"
//                     ? console.log("GET")
//                     : res.status(404).send("");
// };

