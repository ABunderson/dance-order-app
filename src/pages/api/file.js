// import formidable from "formidable";
import fs from 'fs'

const formidable = require('formidable')

export const config = {
    api: {
        bodyParser: false
    }
};

const post = async (req, res) => {
    console.log('START OF THE FORM????????????????????????????????????????????????????????????????????????????')

    const form = new formidable.IncomingForm();
    // console.log(form)

    form.parse(req, async function (err, fields, files) {
        console.log(files)
        await saveFile(files.file);
        return res.status(201).send("");
    });
};

const saveFile = async (file) => {
    const data = fs.readFileSync(file[0].filepath);
    fs.writeFileSync(`./public/${'tryImage.jpg'}`, data);
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
