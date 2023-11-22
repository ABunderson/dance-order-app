import fs from 'fs'

const formidable = require('formidable')

export const config = {
    api: {
        bodyParser: false
    }
};

const post = async (req, res) => {
    const { newPath } = req.query
    let fixedPath = newPath.split(',').join('/')

    const form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {
        await saveFile(files.file, fixedPath);
        return res.status(201).send("");
    });
};

const saveFile = async (file, fixedPath) => {
    const data = fs.readFileSync(file[0].filepath);
    fs.writeFileSync(fixedPath, data);
    await fs.unlinkSync(file[0].filepath);
    return;
};

export default (req, res) => {
    req.method === "POST"
        ? post(req, res)
        : req.method === "PUT"
            ? console.log("PUT")
            : req.method === "DELETE"
                ? console.log("DELETE")
                : req.method === "GET"
                    ? console.log("GET")
                    : res.status(404).send("");
};
